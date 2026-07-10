# 🚀 Guia de Deploy Completo

Este documento fornece instruções detalhadas para fazer deploy da aplicação Next.js SaaS + RBAC.

## 📋 Índice

- [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Deploy do Backend (VPS)](#deploy-do-backend-vps)
- [Deploy do Frontend (Vercel)](#deploy-do-frontend-vercel)
- [Configuração do Banco de Dados (Neon)](#configuração-do-banco-de-dados-neon)
- [CI/CD com GitHub Actions](#cicd-com-github-actions)
- [Monitoramento](#monitoramento)
- [Troubleshooting](#troubleshooting)

---

## Visão Geral da Arquitetura

```
┌─────────────────┐
│   Usuários      │
└────────┬────────┘
         │
    ┌────▼────┐
    │ Vercel  │ (Frontend - Next.js)
    └────┬────┘
         │
    ┌────▼────────────────┐
    │ VPS Ubuntu + Nginx  │ (Backend - Fastify)
    │   - GitHub Actions  │
    │   - Systemd         │
    └────┬────────────────┘
         │
    ┌────▼────┐
    │  Neon   │ (PostgreSQL)
    └─────────┘
```

### Por que VPS ao invés de Render?

**Problema encontrado:** O plano gratuito do Render bloqueia as portas SMTP (25, 465, 587), impedindo o envio de e-mails para recuperação de senha.

**Solução:** Deploy em VPS próprio com controle total sobre portas e configurações.

---

## Pré-requisitos

- [ ] Servidor VPS com Ubuntu 20.04+ (mínimo 1GB RAM)
- [ ] Domínio próprio com DNS configurado
- [ ] Conta no GitHub (para CI/CD)
- [ ] Conta na Vercel (para frontend)
- [ ] Conta no Neon (para banco de dados)
- [ ] Servidor SMTP configurado ou conta em serviço de email

---

## Deploy do Backend (VPS)

### Passo 1: Preparar o Servidor

```bash
# Conectar ao servidor
ssh root@seu-servidor

# Atualizar sistema
apt update && apt upgrade -y

# Instalar dependências básicas
apt install -y curl git build-essential

# Instalar Node.js via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 24
nvm use 24
nvm alias default 24

# Instalar PNPM
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc

# Instalar Nginx
apt install -y nginx

# Instalar Certbot (para SSL)
apt install -y certbot python3-certbot-nginx
```

### Passo 2: Clonar e Configurar o Projeto

```bash
# Criar diretório
mkdir -p /opt
cd /opt

# Clonar repositório
git clone https://github.com/seu-usuario/next-saas-rbac.git
cd next-saas-rbac

# Instalar dependências
pnpm install

# Executar migrações
pnpm --filter api prisma migrate deploy
pnpm --filter api prisma generate

# Build da API
pnpm --filter api build

# Verificar se o build funcionou
ls -la apps/api/dist/
```

> 💡 **Nota sobre Variáveis de Ambiente:** Neste projeto, as variáveis de ambiente são configuradas diretamente no Systemd Service (próximo passo), eliminando a necessidade de um arquivo `.env`. Esta abordagem oferece maior segurança e isolamento.

### Passo 3: Configurar Systemd com Variáveis de Ambiente

```bash
nano /etc/systemd/system/next-saas-api.service
```

**Conteúdo:**

```ini
[Unit]
Description=Next SaaS API
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/next-saas-rbac

# Variáveis de Ambiente
Environment="NODE_ENV=production"
Environment="DATABASE_URL=postgresql://usuario:senha@db.neon.tech/dbname?sslmode=require"
Environment="JWT_SECRET=seu-jwt-secret-super-seguro-aqui"
Environment="API_URL=https://api.seudominio.com"
Environment="GITHUB_CLIENT_ID=seu-github-client-id"
Environment="GITHUB_CLIENT_SECRET=seu-github-client-secret"
Environment="GITHUB_REDIRECT_URI=https://app.seudominio.com/api/auth/callback"
Environment="HOST_EMAIL=smtp.seuservidor.com"
Environment="PORT_EMAIL=587"
Environment="USER_EMAIL=noreply@seudominio.com"
Environment="PASSWORD_EMAIL=senha-do-email"

ExecStart=/root/.nvm/versions/node/v24.18.0/bin/node /opt/next-saas-rbac/apps/api/dist/http/server.js
Restart=always
RestartSec=10

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=next-saas-api

[Install]
WantedBy=multi-user.target
```

**🔒 Vantagens de Usar Systemd para Variáveis de Ambiente:**

- ✅ **Segurança:** Arquivo de serviço tem permissões restritas (640 por padrão)
- ✅ **Isolamento:** Apenas o serviço e o root podem acessar as variáveis
- ✅ **Gestão Centralizada:** Tudo em um só lugar junto com a configuração do serviço
- ✅ **Sem Arquivos Soltos:** Não há arquivos `.env` expostos no filesystem
- ✅ **Auditoria:** Mudanças são rastreadas pelo systemd

**Comandos úteis:**

```bash
# Editar o serviço com segurança
systemctl edit --full next-saas-api

# Ver variáveis de ambiente do serviço (requer root)
systemctl show next-saas-api --property=Environment

# Recarregar após editar
systemctl daemon-reload
systemctl restart next-saas-api
```

```bash
# Recarregar systemd
systemctl daemon-reload

# Habilitar serviço
systemctl enable next-saas-api

# Iniciar serviço
systemctl start next-saas-api

# Verificar status
systemctl status next-saas-api

# Ver logs
journalctl -u next-saas-api -f
```

### Passo 4: Configurar Nginx

```bash
nano /etc/nginx/sites-available/next-saas-api
```

**Conteúdo:**

```nginx
server {
    listen 80;
    server_name api.seudominio.com;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req zone=api_limit burst=20 nodelay;

    location / {
        proxy_pass http://localhost:3333;
        proxy_http_version 1.1;
        
        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        proxy_cache_bypass $http_upgrade;
    }

    # Logs específicos
    access_log /var/log/nginx/next-saas-api.access.log;
    error_log /var/log/nginx/next-saas-api.error.log;
}
```

```bash
# Ativar configuração
ln -s /etc/nginx/sites-available/next-saas-api /etc/nginx/sites-enabled/

# Testar configuração
nginx -t

# Reiniciar Nginx
systemctl restart nginx

# Configurar SSL (HTTPS)
certbot --nginx -d api.seudominio.com

# Testar renovação automática
certbot renew --dry-run
```

### Passo 5: Configurar Firewall

```bash
# Instalar UFW
apt install -y ufw

# Configurar regras
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 587/tcp   # SMTP
ufw allow 465/tcp   # SMTPS

# Habilitar firewall
ufw enable

# Verificar status
ufw status verbose
```

### Passo 6: Configurar Fail2Ban (Segurança Extra)

```bash
# Instalar fail2ban
apt install -y fail2ban

# Criar configuração personalizada
nano /etc/fail2ban/jail.local
```

**Conteúdo:**

```ini
[sshd]
enabled = true
port = 22
maxretry = 3
bantime = 3600

[nginx-http-auth]
enabled = true
```

```bash
# Reiniciar fail2ban
systemctl restart fail2ban

# Verificar status
fail2ban-client status
```

---

## Deploy do Frontend (Vercel)

### Via Dashboard da Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Importe seu repositório do GitHub
4. Configure:
   - **Root Directory:** `apps/web`
   - **Framework Preset:** Next.js
   - **Build Command:** `pnpm build`
   - **Output Directory:** `.next`

### Variáveis de Ambiente na Vercel

```env
NEXT_PUBLIC_API_URL=https://api.seudominio.com
GITHUB_CLIENT_ID=seu-github-client-id
GITHUB_CLIENT_SECRET=seu-github-client-secret
GITHUB_REDIRECT_URI=https://app.seudominio.com/api/auth/callback
```

5. Clique em **"Deploy"**

### Via Vercel CLI (Opcional)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
cd apps/web
vercel --prod
```

---

## Configuração do Banco de Dados (Neon)

1. Acesse [neon.tech](https://neon.tech)
2. Crie um novo projeto
3. Escolha a região mais próxima
4. Copie a **Connection String**
5. Adicione a variável `DATABASE_URL` no Systemd Service (`/etc/systemd/system/next-saas-api.service`)
6. As migrações serão executadas automaticamente no deploy

---

## CI/CD com GitHub Actions

### Configurar Secrets no GitHub

1. Vá em **Settings > Secrets and variables > Actions**
2. Adicione os seguintes secrets:

| Secret | Valor | Descrição |
|--------|-------|-----------|
| `HOST` | `123.45.67.89` | IP do servidor VPS |
| `USERNAME` | `root` | Usuário SSH |
| `PORT` | `22` | Porta SSH |
| `KEY` | (conteúdo da chave privada) | Chave SSH privada |

### Gerar Chave SSH

```bash
# No seu computador local
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy" -f ~/.ssh/github_actions

# Copiar chave pública para o servidor
ssh-copy-id -i ~/.ssh/github_actions.pub root@seu-servidor

# Exibir chave privada (copiar para o Secret do GitHub)
cat ~/.ssh/github_actions
```

### Workflow Existente

O projeto já possui o workflow em `.github/workflows/deploy_api.yml` que:

- ✅ Detecta mudanças em `apps/api/**` ou `packages/**`
- ✅ Conecta via SSH no servidor
- ✅ Executa `git pull`
- ✅ Instala dependências
- ✅ Executa migrações
- ✅ Faz build
- ✅ Reinicia os serviços

### Testar o Workflow

```bash
# Fazer uma mudança qualquer na API
echo "// Test deploy" >> apps/api/src/http/server.ts

# Commit e push
git add .
git commit -m "test: trigger deploy workflow"
git push origin main

# Acompanhar no GitHub: Actions tab
```

---

## Monitoramento

### Logs da Aplicação

```bash
# Logs em tempo real
journalctl -u next-saas-api -f

# Últimas 100 linhas
journalctl -u next-saas-api -n 100

# Logs de hoje
journalctl -u next-saas-api --since today

# Filtrar por erro
journalctl -u next-saas-api | grep -i error
```

### Logs do Nginx

```bash
# Access log
tail -f /var/log/nginx/next-saas-api.access.log

# Error log
tail -f /var/log/nginx/next-saas-api.error.log
```

### Monitoramento de Recursos

```bash
# CPU e Memória
htop

# Espaço em disco
df -h

# Uso de memória
free -h

# Processos Node.js
ps aux | grep node

# Conexões de rede
netstat -tulpn | grep 3333
```

### Setup de Monitoramento Avançado (Opcional)

Instalar **PM2** para monitoramento:

```bash
npm install -g pm2

# Iniciar com PM2 (alternativa ao systemd)
pm2 start apps/api/dist/http/server.js --name next-saas-api

# Monitoramento
pm2 monit

# Logs
pm2 logs

# Dashboard web
pm2 web
```

---

## Troubleshooting

### API não inicia

```bash
# Verificar logs
journalctl -u next-saas-api -n 50

# Verificar se a porta está em uso
lsof -i :3333

# Matar processo na porta
kill -9 $(lsof -t -i:3333)

# Reiniciar serviço
systemctl restart next-saas-api
```

### Erro de build

```bash
# Limpar node_modules
cd /opt/next-saas-rbac
rm -rf node_modules
rm -rf apps/api/node_modules

# Reinstalar
pnpm install

# Build novamente
pnpm --filter api build
```

### Erro de conexão com banco

```bash
# Testar conexão
cd /opt/next-saas-rbac
pnpm --filter api prisma studio

# Verificar variável DATABASE_URL
systemctl show next-saas-api | grep DATABASE_URL

# Executar migrações novamente
pnpm --filter api prisma migrate deploy
```

### Nginx não responde

```bash
# Testar configuração
nginx -t

# Ver logs de erro
tail -f /var/log/nginx/error.log

# Reiniciar
systemctl restart nginx
```

### SSL/HTTPS não funciona

```bash
# Renovar certificado
certbot renew

# Forçar renovação
certbot renew --force-renewal

# Ver certificados instalados
certbot certificates
```

### Email não envia

```bash
# Testar conexão SMTP
telnet smtp.seuservidor.com 587

# Verificar variáveis MAIL_*
systemctl show next-saas-api | grep MAIL

# Ver logs da aplicação
journalctl -u next-saas-api | grep -i mail
```

### Deploy via GitHub Actions falha

```bash
# Verificar se o servidor está acessível
ssh root@seu-servidor

# Verificar se as chaves SSH estão corretas
# No servidor:
cat ~/.ssh/authorized_keys

# Verificar se o repositório está acessível
cd /opt/next-saas-rbac
git pull origin main

# Verificar permissões
ls -la /opt/next-saas-rbac
```

---

## Checklist de Deploy

### Pré-Deploy
- [ ] Servidor VPS provisionado
- [ ] Domínio configurado (DNS apontando para VPS)
- [ ] Banco de dados criado no Neon
- [ ] Secrets configurados no GitHub
- [ ] Variáveis de ambiente definidas

### Deploy Inicial
- [ ] Node.js e PNPM instalados
- [ ] Projeto clonado em `/opt/next-saas-rbac`
- [ ] Systemd service criado com todas as variáveis de ambiente
- [ ] Migrações executadas
- [ ] Build concluído com sucesso
- [ ] Systemd service ativo (`systemctl status next-saas-api`)
- [ ] Nginx configurado
- [ ] SSL (HTTPS) ativo
- [ ] Firewall configurado

### Pós-Deploy
- [ ] API acessível via HTTPS
- [ ] Frontend deployed na Vercel
- [ ] OAuth do GitHub funcionando
- [ ] Envio de email funcionando
- [ ] Logs sendo gerados corretamente
- [ ] GitHub Actions funcionando
- [ ] Backups configurados (banco de dados)

---

## Recursos Adicionais

- [Documentação Nginx](https://nginx.org/en/docs/)
- [Documentação Systemd](https://www.freedesktop.org/software/systemd/man/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Docs](https://vercel.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Certbot Docs](https://certbot.eff.org/docs/)

---

## Suporte

Para dúvidas ou problemas:
1. Verifique os logs: `journalctl -u next-saas-api -f`
2. Consulte a seção de Troubleshooting
3. Verifique as issues no GitHub do projeto

---

**Última atualização:** 2026-07-10
