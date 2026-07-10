# 🚀 Comandos Rápidos - Next.js SaaS + RBAC

Guia rápido de comandos para desenvolvimento e operações no servidor.

## 📦 Desenvolvimento Local

### Instalação Inicial
```bash
# Instalar todas as dependências
pnpm install

# Subir o banco de dados (Docker)
docker-compose up -d

# Executar migrações
pnpm --filter api db:migrate

# Gerar Prisma Client
pnpm --filter api db:generate

# Popular banco com dados de teste (opcional)
pnpm --filter api prisma db seed
```

### Desenvolvimento
```bash
# Iniciar todos os serviços (API + Web)
pnpm dev

# Apenas API
pnpm --filter api dev

# Apenas Web
pnpm --filter web dev

# Prisma Studio (visualizar dados)
pnpm --filter api db:studio
```

### Build & Testes
```bash
# Build de todos os projetos
pnpm build

# Lint
pnpm lint

# Type check
pnpm check-types

# Build específico
pnpm --filter api build
pnpm --filter web build
```

### Banco de Dados
```bash
# Criar nova migração
pnpm --filter api prisma migrate dev --name nome_da_migracao

# Aplicar migrações
pnpm --filter api prisma migrate deploy

# Resetar banco de dados
pnpm --filter api prisma migrate reset

# Prisma Studio
pnpm --filter api prisma studio

# Formatar schema.prisma
pnpm --filter api prisma format
```

---

## 🖥️ Servidor VPS (Produção)

### Conexão SSH
```bash
# Conectar ao servidor
ssh root@seu-servidor

# Conectar com chave específica
ssh -i ~/.ssh/id_rsa root@seu-servidor
```

### Gerenciamento da API
```bash
# Status do serviço
systemctl status next-saas-api

# Iniciar
systemctl start next-saas-api

# Parar
systemctl stop next-saas-api

# Reiniciar
systemctl restart next-saas-api

# Logs em tempo real
journalctl -u next-saas-api -f

# Últimas 100 linhas de log
journalctl -u next-saas-api -n 100

# Logs de hoje
journalctl -u next-saas-api --since today

# Filtrar por erro
journalctl -u next-saas-api | grep -i error
```

### Deploy Manual
```bash
# Navegar até o projeto
cd /opt/next-saas-rbac

# Atualizar código
git pull origin main

# Instalar dependências (se houver novas)
pnpm --filter api install --frozen-lockfile

# Executar migrações
pnpm --filter api prisma migrate deploy

# Gerar Prisma Client
pnpm --filter api prisma generate

# Build
pnpm --filter api build

# Reiniciar serviço
systemctl restart next-saas-api

# Reiniciar nginx (se necessário)
systemctl restart nginx

# Verificar status
systemctl status next-saas-api
```

### Nginx
```bash
# Testar configuração
nginx -t

# Recarregar (sem downtime)
nginx -s reload

# Reiniciar
systemctl restart nginx

# Status
systemctl status nginx

# Logs de acesso
tail -f /var/log/nginx/next-saas-api.access.log

# Logs de erro
tail -f /var/log/nginx/next-saas-api.error.log
```

### Monitoramento
```bash
# Uso de CPU e memória
htop

# Espaço em disco
df -h

# Memória
free -h

# Processos Node.js
ps aux | grep node

# Porta 3333
netstat -tulpn | grep 3333
# ou
ss -tulpn | grep 3333

# Top 10 processos por CPU
ps aux | sort -nrk 3,3 | head -n 10

# Top 10 processos por Memória
ps aux | sort -nrk 4,4 | head -n 10
```

### SSL/HTTPS
```bash
# Renovar certificados
certbot renew

# Forçar renovação
certbot renew --force-renewal

# Listar certificados
certbot certificates

# Testar renovação (dry-run)
certbot renew --dry-run
```

### Firewall
```bash
# Status
ufw status verbose

# Permitir porta
ufw allow 8080/tcp

# Bloquear porta
ufw deny 8080/tcp

# Deletar regra
ufw delete allow 8080/tcp

# Resetar firewall
ufw reset
```

### Banco de Dados
```bash
# Abrir Prisma Studio no servidor (usar SSH tunnel)
# No seu computador local:
ssh -L 5555:localhost:5555 root@seu-servidor

# No servidor:
cd /opt/next-saas-rbac
pnpm --filter api prisma studio

# Acessar: http://localhost:5555
```

---

## 🔧 Troubleshooting

### API não inicia
```bash
# Ver logs detalhados
journalctl -u next-saas-api -n 100 --no-pager

# Verificar se está rodando
systemctl status next-saas-api

# Verificar porta
lsof -i :3333

# Matar processo na porta
kill -9 $(lsof -t -i:3333)

# Reiniciar
systemctl restart next-saas-api
```

### Limpar build
```bash
cd /opt/next-saas-rbac

# Remover dist
rm -rf apps/api/dist

# Remover node_modules
rm -rf node_modules apps/api/node_modules

# Reinstalar
pnpm install

# Build novamente
pnpm --filter api build
```

### Resetar permissões
```bash
# Ajustar owner
chown -R root:root /opt/next-saas-rbac

# Permissões padrão
chmod -R 755 /opt/next-saas-rbac

# Permissões do arquivo de serviço (contém variáveis sensíveis)
chmod 640 /etc/systemd/system/next-saas-api.service
```

### Verificar variáveis de ambiente
```bash
# Ver variáveis configuradas no Systemd Service
systemctl show next-saas-api --property=Environment

# Editar variáveis de ambiente do serviço
systemctl edit --full next-saas-api

# Após editar, recarregar
systemctl daemon-reload
systemctl restart next-saas-api

# Ver arquivo de serviço completo
cat /etc/systemd/system/next-saas-api.service

# Verificar se uma variável específica está carregada (dentro do container)
systemctl show next-saas-api | grep DATABASE_URL
```

### Testar SMTP
```bash
# Telnet para porta 587
telnet smtp.seuservidor.com 587

# Curl
curl -v telnet://smtp.seuservidor.com:587
```

---

## 📊 Git & GitHub

### Workflow
```bash
# Ver status
git status

# Ver branches
git branch -a

# Ver último commit
git log -1

# Ver histórico do arquivo
git log --follow apps/api/src/http/server.ts

# Forçar pull (cuidado!)
git fetch origin
git reset --hard origin/main
```

### GitHub Actions
```bash
# Ver workflows
gh workflow list

# Ver runs
gh run list

# Ver logs do último run
gh run view --log

# Re-executar workflow
gh run rerun <run-id>
```

---

## 🎯 Comandos Úteis

### Gerar Secrets
```bash
# JWT Secret
openssl rand -base64 32

# UUID
uuidgen

# Senha aleatória
openssl rand -base64 16
```

### Backup
```bash
# Backup do banco (Neon faz automaticamente, mas para backup manual)
# Via pg_dump (se tiver acesso direto)
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Backup do código
cd /opt
tar -czf next-saas-rbac-backup-$(date +%Y%m%d).tar.gz next-saas-rbac/

# Backup do Systemd Service (contém variáveis de ambiente)
cp /etc/systemd/system/next-saas-api.service /root/backups/next-saas-api.service-$(date +%Y%m%d).backup
chmod 600 /root/backups/next-saas-api.service-*.backup
```

### Sistema
```bash
# Informações do sistema
uname -a

# Versão do Ubuntu
lsb_release -a

# Uptime
uptime

# Verificar serviços ativos
systemctl list-units --type=service --state=running

# Versão do Node
node -v

# Versão do PNPM
pnpm -v

# Versão do Nginx
nginx -v
```

---

## 🔐 Segurança

### Atualizar sistema
```bash
# Atualizar lista de pacotes
apt update

# Atualizar pacotes
apt upgrade -y

# Atualizar tudo (incluindo kernel)
apt dist-upgrade -y

# Remover pacotes não usados
apt autoremove -y
```

### Fail2Ban
```bash
# Status
fail2ban-client status

# Status do jail SSH
fail2ban-client status sshd

# Desbanir IP
fail2ban-client set sshd unbanip 123.456.789.0
```

### Verificar tentativas de SSH
```bash
# Últimas tentativas de login
lastlog

# Tentativas falhas
grep "Failed password" /var/log/auth.log | tail -20

# IPs bloqueados
iptables -L -n | grep DROP
```

---

## 📖 Referências Rápidas

- **Portas:**
  - 3333 - API (localhost)
  - 3000 - Web (localhost)
  - 5432 - PostgreSQL (localhost)
  - 80 - HTTP
  - 443 - HTTPS
  - 587 - SMTP (TLS)

- **Caminhos importantes:**
  - Projeto: `/opt/next-saas-rbac`
  - Nginx config: `/etc/nginx/sites-available/next-saas-api`
  - Systemd service: `/etc/systemd/system/next-saas-api.service`
  - Logs nginx: `/var/log/nginx/`
  - SSL certs: `/etc/letsencrypt/live/`

- **URLs:**
  - API Docs (dev): http://localhost:3333/docs
  - API Docs (prod): https://api.seudominio.com/docs
  - Web (dev): http://localhost:3000
  - Web (prod): https://app.seudominio.com

---

**💡 Dica:** Adicione este arquivo aos seus favoritos para acesso rápido aos comandos mais usados!
