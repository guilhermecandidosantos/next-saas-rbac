<div align="center">
  <h1>🚀 Next.js SaaS + RBAC</h1>
  <p>Uma plataforma SaaS multi-tenant completa com Controle de Acesso Baseado em Funções avançado</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
  ![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
  ![Fastify](https://img.shields.io/badge/Fastify-5.8-000000?style=for-the-badge&logo=fastify)
  ![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748?style=for-the-badge&logo=prisma)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
  
  ![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel)
  ![Ubuntu](https://img.shields.io/badge/Ubuntu-VPS-E95420?style=for-the-badge&logo=ubuntu)
  ![Nginx](https://img.shields.io/badge/Nginx-Proxy-009639?style=for-the-badge&logo=nginx)
  ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=github-actions)
</div>

---

## 📖 Sobre o Projeto

Este projeto é uma **aplicação SaaS pronta para produção** desenvolvida durante o curso **"Criando SaaS com Next.js e RBAC"** da [Rocketseat](https://www.rocketseat.com.br/). Demonstra uma arquitetura multi-tenant completa de ponta a ponta com controle de acesso baseado em funções sofisticado, construída do zero usando tecnologias web modernas.

### 🎯 Principais Funcionalidades

- 🏢 **Arquitetura Multi-tenant** - Gerenciamento completo de organizações e projetos
- 🔐 **RBAC Avançado** - Permissões granulares com CASL
- 🔑 **Múltiplos Métodos de Autenticação** - E-mail/senha e OAuth do GitHub
- 👥 **Gerenciamento de Equipes** - Convide membros, gerencie funções e controle acessos
- 💰 **Sistema de Cobrança** - Rastreamento de uso e cálculo de custos
- 📊 **Stack Moderna** - Next.js, Fastify, Prisma e mais
- 🎨 **Interface Linda** - Construída com shadcn/ui e Tailwind CSS
- 📱 **Design Responsivo** - Funciona perfeitamente em todos os dispositivos
- 🚀 **CI/CD Automatizado** - Deploy via GitHub Actions em VPS próprio
- 📧 **Sistema de E-mails** - Recuperação de senha e notificações via SMTP

---

## 📚 Documentação

- 📖 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guia completo de deploy (VPS, Vercel, Neon)
- ⚡ **[COMMANDS.md](COMMANDS.md)** - Comandos rápidos para desenvolvimento e operações
- 🔧 **[.env.example](.env.example)** - Template de variáveis de ambiente

---

## 🏗️ Estrutura do Projeto

Este é um **monorepo** gerenciado por **TurboRepo** e **pnpm workspaces**, contendo:

```
.
├── apps/
│   ├── api/          # Aplicação backend em Fastify
│   └── web/          # Aplicação frontend em Next.js
├── packages/
│   ├── auth/         # Lógica compartilhada de RBAC (CASL)
│   └── env/          # Validação de variáveis de ambiente
└── config/
    ├── eslint-config/    # Configurações compartilhadas do ESLint
    ├── prettier/         # Configurações compartilhadas do Prettier
    └── typescript-config/# Configurações compartilhadas do TypeScript
```

---

## 🛠️ Stack Tecnológica

### Frontend (`apps/web`)
- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca de interface
- **[TypeScript](https://www.typescriptlang.org/)** - Segurança de tipos
- **[Tailwind CSS 4](https://tailwindcss.com/)** - CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de componentes de alta qualidade
- **[TanStack Query](https://tanstack.com/query)** - Busca e cache de dados
- **[Zod](https://zod.dev/)** - Validação de schemas
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Suporte a modo escuro
- **[Lucide Icons](https://lucide.dev/)** - Ícones lindos

### Backend (`apps/api`)
- **[Fastify 5](https://fastify.dev/)** - Framework web de alta performance
- **[Prisma 7](https://www.prisma.io/)** - ORM moderno
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Fastify JWT](https://github.com/fastify/fastify-jwt)** - Autenticação
- **[Swagger/OpenAPI](https://swagger.io/)** - Documentação da API
- **[Zod](https://zod.dev/)** - Validação em runtime
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Hash de senhas
- **[Nodemailer](https://nodemailer.com/)** - Envio de e-mails

### Pacotes Compartilhados
- **[@casl/ability](https://casl.js.org/)** - Autorização e RBAC
- **[TurboRepo](https://turbo.build/repo)** - Sistema de build para monorepo
- **[PNPM](https://pnpm.io/)** - Gerenciador de pacotes rápido e eficiente

### DevOps & Ferramentas
- **[Docker](https://www.docker.com/)** - Containerização (PostgreSQL)
- **[TSX](https://github.com/esbuild-kit/tsx)** - Execução TypeScript
- **[TSup](https://tsup.egoist.dev/)** - Empacotamento de biblioteca TypeScript

### Deploy & Infraestrutura
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automatizado
- **[Nginx](https://nginx.org/)** - Reverse proxy e servidor web
- **[Systemd](https://systemd.io/)** - Gerenciamento de serviços Linux
- **[Vercel](https://vercel.com/)** - Hospedagem do frontend
- **[VPS Ubuntu](https://ubuntu.com/)** - Servidor para API
- **[Neon](https://neon.tech/)** - Banco de dados PostgreSQL serverless
- **[Let's Encrypt](https://letsencrypt.org/)** - Certificados SSL gratuitos

---

## 📋 Funcionalidades e Capacidades

### 🔐 Autenticação

- ✅ Autenticação com e-mail e senha
- ✅ Integração com OAuth do GitHub
- ✅ Recuperação de senha via e-mail
- ✅ Criação de conta com validação
- ✅ Sessões baseadas em token JWT

### 🏢 Organizações

- ✅ Criar novas organizações
- ✅ Listar organizações do usuário
- ✅ Atualizar detalhes da organização
- ✅ Excluir organizações
- ✅ Transferir propriedade da organização
- ✅ Entrada automática baseada em domínio
- ✅ Avatar/marca da organização

### 📨 Convites

- ✅ Convidar membros por e-mail
- ✅ Aceitar convites pendentes
- ✅ Revogar convites pendentes
- ✅ Atribuição de função no convite
- ✅ Notificações por e-mail

### 👥 Membros

- ✅ Listar membros da organização
- ✅ Atualizar funções dos membros
- ✅ Remover membros
- ✅ Ver detalhes dos membros
- ✅ Capacidade de auto-remoção

### 📊 Projetos

- ✅ Criar projetos dentro de organizações
- ✅ Listar projetos da organização
- ✅ Atualizar detalhes do projeto
- ✅ Excluir projetos
- ✅ Descrições e URLs do projeto
- ✅ Avatars de projetos

### 💰 Cobrança

- ✅ Calcular custos da organização
- ✅ Detalhamento de custos ($20/projeto + $10/membro)
- ✅ Excluir função de cobrança da contagem de membros
- ✅ Exportar detalhes de cobrança

---

## 🔒 Sistema RBAC

### Funções

| Função | Descrição |
|--------|-----------|
| **Owner (Proprietário)** | Criador da organização com controle total (age como Administrador) |
| **Administrator (Administrador)** | Capacidades completas de gerenciamento |
| **Member (Membro)** | Usuário padrão com permissões limitadas |
| **Billing (Financeiro)** | Acesso apenas a informações de cobrança (um por organização) |

### Matriz de Permissões

|                              | Owner/Admin | Membro | Financeiro |
| ---------------------------- | ----------- | ------ | ---------- |
| Atualizar organização        | ✅          | ❌     | ❌         |
| Excluir organização          | ✅          | ❌     | ❌         |
| Transferir propriedade       | ✅ (owner)  | ❌     | ❌         |
| Convidar membros             | ✅          | ❌     | ❌         |
| Revogar convites             | ✅          | ❌     | ❌         |
| Atualizar função de membros  | ✅          | ❌     | ❌         |
| Remover membros              | ✅          | ⚠️*    | ❌         |
| Listar membros               | ✅          | ✅     | ✅         |
| Criar projetos               | ✅          | ✅     | ❌         |
| Listar projetos              | ✅          | ✅     | ✅         |
| Atualizar projetos           | ✅          | ⚠️**   | ❌         |
| Excluir projetos             | ✅          | ⚠️**   | ❌         |
| Ver cobrança                 | ✅          | ❌     | ✅         |
| Exportar cobrança            | ✅          | ❌     | ✅         |

> **Legenda:**  
> ✅ = Permitido  
> ❌ = Não permitido  
> ⚠️ = Permitido condicionalmente

**Condições:**
- `*` Membros podem apenas se remover da organização
- `**` Membros podem apenas atualizar/excluir projetos que criaram

---

## 🚀 Como Começar

### Pré-requisitos

- **Node.js** >= 18
- **PNPM** 9.0.0
- **Docker** (para PostgreSQL)
- **Git**

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd next-saas-rbac
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Inicie o banco de dados**
   ```bash
   docker-compose up -d
   ```

4. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` no diretório raiz:
   
   > 💡 **Nota:** Em desenvolvimento local, use arquivo `.env`. Em produção (VPS), as variáveis são configuradas diretamente no [Systemd Service](#-deploy-em-vps-ubuntu-2204-viaconfigura%C3%A7%C3%A3o-atual).
   
   ```env
   # Database
   DATABASE_URL="postgresql://docker:docker@localhost:5432/next-saas"
   
   # API
   JWT_SECRET="seu-jwt-secret-aqui"
   API_URL="http://localhost:3333"
   
   # Web
   NEXT_PUBLIC_API_URL="http://localhost:3333"
   
   # GitHub OAuth
   GITHUB_CLIENT_ID="seu-github-client-id"
   GITHUB_CLIENT_SECRET="seu-github-client-secret"
   GITHUB_REDIRECT_URI="http://localhost:3000/api/auth/callback"
   
   # Email (opcional para desenvolvimento)
   HOST_EMAIL=""
   PORT_EMAIL=""
   USER_EMAIL=""
   PASSWORD_EMAIL=""
   ```

5. **Execute as migrações do banco de dados**
   ```bash
   pnpm --filter api db:migrate
   ```

6. **Inicie os servidores de desenvolvimento**
   ```bash
   pnpm dev
   ```

As aplicações estarão disponíveis em:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3333
- **Documentação da API**: http://localhost:3333/docs

---

## 📦 Scripts Disponíveis

### Nível Raiz

```bash
pnpm dev              # Inicia todas as aplicações em modo de desenvolvimento
pnpm build            # Builda todas as aplicações
pnpm lint             # Executa lint em todas as aplicações
pnpm check-types      # Verifica tipos em todas as aplicações
```

### Backend (`apps/api`)

```bash
pnpm dev              # Inicia a API em modo watch
pnpm build            # Build para produção
pnpm start            # Inicia o servidor de produção
pnpm db:migrate       # Executa as migrações do banco de dados
pnpm db:generate      # Gera o Prisma Client
pnpm db:studio        # Abre o Prisma Studio
```

### Frontend (`apps/web`)

```bash
pnpm dev              # Inicia o servidor dev do Next.js
pnpm build            # Build para produção
pnpm start            # Inicia o servidor de produção
```

---

## 🗄️ Schema do Banco de Dados

A aplicação usa **PostgreSQL** com as seguintes entidades principais:

- **Users** - Contas de usuário com credenciais
- **Accounts** - Conexões com provedores OAuth
- **Tokens** - Tokens de recuperação de senha
- **Organizations** - Organizações tenant
- **Members** - Membros da organização
- **Invites** - Convites pendentes de membros
- **Projects** - Projetos da organização

Todos os relacionamentos são configurados adequadamente com exclusões em cascata e restrições de chave estrangeira.

---

## 📚 Documentação da API

A API está completamente documentada usando **Swagger/OpenAPI**. Assim que o backend estiver rodando, visite:

```
http://localhost:3333/docs
```

Isso fornece uma interface interativa para explorar e testar todos os endpoints disponíveis.

---

## 🎨 Componentes da UI

O frontend usa componentes do **shadcn/ui**, que incluem:

- Formulários e inputs com validação
- Tabelas de dados
- Modais e diálogos
- Dropdowns e menus select
- Notificações toast
- Suporte a modo escuro
- Navegação responsiva
- E muito mais...

---

## 🔐 Fluxo de Autenticação

### Email/Senha
1. Usuário se registra com email, nome e senha
2. Senha é criptografada usando bcryptjs
3. Token JWT é gerado no login
4. Token é armazenado em cookies para gerenciamento de sessão

### OAuth do GitHub
1. Usuário clica em "Entrar com GitHub"
2. Redirecionado para autorização do GitHub
3. Callback recebe o código de autorização
4. Backend troca o código por token de acesso
5. Perfil do usuário é obtido do GitHub
6. Conta é criada/vinculada e JWT é emitido

---

## 🚢 Deploy

> 📖 **Documentação Completa:** Para instruções detalhadas passo a passo, troubleshooting e configurações avançadas, consulte o [**DEPLOYMENT.md**](DEPLOYMENT.md)

### Backend (VPS)

A API está hospedada em um servidor VPS próprio com deploy automatizado via **GitHub Actions**.

> **⚠️ Por que não Render?**  
> Inicialmente o projeto foi configurado para deploy no Render, porém o plano gratuito bloqueia a porta SMTP (25, 465, 587), impedindo o envio de e-mails para recuperação de senha. Por isso, optou-se por hospedar em VPS próprio.

#### Configuração do VPS

**Requisitos:**
- Ubuntu/Debian Linux
- Node.js 18+ (via NVM)
- PNPM
- Nginx (reverse proxy)
- PM2 ou systemd (gerenciamento de processos)

**1. Setup Inicial do Servidor**

```bash
# Instalar Node.js via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 24
nvm use 24

# Instalar PNPM
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Clonar o repositório
cd /opt
git clone <seu-repositorio> next-saas-rbac
cd next-saas-rbac

# Instalar dependências
pnpm install
```

**2. Build e Migrações**

```bash
pnpm --filter api db:migrate
pnpm --filter api db:generate
pnpm --filter api build
```

**3. Configurar Systemd Service com Variáveis de Ambiente**

Crie `/etc/systemd/system/next-saas-api.service`:

> 💡 **Nota:** As variáveis de ambiente estão configuradas diretamente no Systemd Service, eliminando a necessidade de um arquivo `.env`. Esta abordagem oferece maior segurança e isolamento.

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

**Dicas de Segurança para Variáveis de Ambiente no Systemd:**

- ✅ Arquivo de serviço tem permissões restritas (640 por padrão)
- ✅ Apenas root pode ler as variáveis
- ✅ Variáveis não ficam expostas no filesystem
- ✅ Use `systemctl edit next-saas-api` para editar com segurança
- ⚠️ Nunca commite o arquivo `.service` com dados reais no Git
- 💡 Para editar: `systemctl edit --full next-saas-api`

```bash
# Habilitar e iniciar o serviço
systemctl daemon-reload
systemctl enable next-saas-api
systemctl start next-saas-api
systemctl status next-saas-api
```

**4. Configurar Nginx**

Crie `/etc/nginx/sites-available/next-saas-api`:

```nginx
server {
    listen 80;
    server_name api.seudominio.com;

    location / {
        proxy_pass http://localhost:3333;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Ativar o site e reiniciar nginx
ln -s /etc/nginx/sites-available/next-saas-api /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Configurar SSL com Let's Encrypt (opcional mas recomendado)
apt install certbot python3-certbot-nginx
certbot --nginx -d api.seudominio.com
```

**5. Configurar Firewall (Segurança)**

```bash
# Instalar e configurar UFW (Uncomplicated Firewall)
apt install ufw

# Permitir SSH (IMPORTANTE: fazer antes de habilitar o firewall!)
ufw allow 22/tcp

# Permitir HTTP e HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Permitir SMTP (para envio de emails)
ufw allow 587/tcp
ufw allow 465/tcp

# Habilitar firewall
ufw enable

# Verificar status
ufw status verbose
```

**Dicas de Segurança:**

- ✅ Sempre use HTTPS em produção (Let's Encrypt gratuito)
- ✅ Configure firewall para bloquear portas não utilizadas
- ✅ Mantenha o sistema atualizado: `apt update && apt upgrade`
- ✅ Use chaves SSH ao invés de senhas
- ✅ Configure fail2ban para prevenir ataques de força bruta
- ✅ Nunca commite arquivos com credenciais (`.env`, `.service` files) no repositório
- ✅ Proteja o arquivo Systemd Service: `chmod 640 /etc/systemd/system/next-saas-api.service`
- ✅ Use senhas fortes para banco de dados e serviços
- ✅ Monitore logs regularmente

---

#### CI/CD com GitHub Actions

O projeto possui workflow automatizado em `.github/workflows/deploy_api.yml` que:

1. Detecta mudanças em `apps/api/**` ou `packages/**`
2. Conecta via SSH no servidor VPS
3. Atualiza o código (`git pull`)
4. Instala dependências
5. Executa migrações do Prisma
6. Faz o build da aplicação
7. Reinicia os serviços (API + Nginx)

**Secrets necessários no GitHub:**

Configure em `Settings > Secrets and variables > Actions`:

- `HOST`: IP ou domínio do servidor
- `USERNAME`: usuário SSH (geralmente `root`)
- `KEY`: chave privada SSH (conteúdo do arquivo `id_rsa`)
- `PORT`: porta SSH (geralmente `22`)

**Para gerar a chave SSH:**

```bash
# No seu computador local
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Copiar a chave pública para o servidor
ssh-copy-id -i ~/.ssh/id_rsa.pub user@seu-servidor

# Adicionar a chave privada como secret no GitHub
cat ~/.ssh/id_rsa
```

#### Deploy Manual (se necessário)

```bash
# SSH no servidor
ssh user@seu-servidor

# Navegar até o projeto
cd /opt/next-saas-rbac

# Atualizar código
git pull origin main

# Build e restart
pnpm --filter api install --frozen-lockfile
pnpm --filter api prisma migrate deploy
pnpm --filter api prisma generate
pnpm --filter api build
systemctl restart next-saas-api
```

---

### Backend (Render - Alternativa)

> **⚠️ Limitação:** O plano gratuito do Render bloqueia portas SMTP. Use apenas se não precisar de envio de e-mails ou se optar por um plano pago.

1. Crie um novo Web Service no Render
2. Conecte seu repositório
3. Configure o diretório raiz: `apps/api`
4. Comando de build: `pnpm install --frozen-lockfile && pnpm prisma generate && pnpm build`
5. Comando de start: `pnpm prisma migrate deploy && node dist/http/server.js`
6. Adicione as variáveis de ambiente
7. Faça o deploy

---

### Frontend (Vercel)

1. Importe o projeto para a Vercel
2. Defina o diretório raiz como `apps/web`
3. Configure as variáveis de ambiente:
   ```env
   NEXT_PUBLIC_API_URL=https://api.seudominio.com
   GITHUB_CLIENT_ID=seu-github-client-id
   GITHUB_CLIENT_SECRET=seu-github-client-secret
   GITHUB_REDIRECT_URI=https://seuapp.com/api/auth/callback
   ```
4. Faça o deploy

---

### Banco de Dados (Neon)

1. Crie um novo projeto no Neon
2. Copie a string de conexão
3. Atualize `DATABASE_URL` nas suas variáveis de ambiente
4. Execute as migrações (automaticamente no deploy ou manualmente)

---

## 🔍 Monitoramento e Troubleshooting (VPS)

### Visualizar Logs da API

```bash
# Logs em tempo real
journalctl -u next-saas-api -f

# Últimas 100 linhas
journalctl -u next-saas-api -n 100

# Logs de hoje
journalctl -u next-saas-api --since today

# Logs com filtro de erro
journalctl -u next-saas-api | grep -i error
```

### Verificar Status dos Serviços

```bash
# Status da API
systemctl status next-saas-api

# Status do Nginx
systemctl status nginx

# Verificar se a API está respondendo
curl http://localhost:3333/docs
```

### Comandos Úteis

```bash
# Reiniciar API
systemctl restart next-saas-api

# Reiniciar Nginx
systemctl restart nginx

# Ver processos Node.js rodando
ps aux | grep node

# Verificar porta 3333
netstat -tulpn | grep 3333
# ou
ss -tulpn | grep 3333

# Espaço em disco
df -h

# Uso de memória
free -h

# Processos consumindo recursos
top
# ou
htop
```

### Problemas Comuns

**API não inicia:**
```bash
# Verificar logs para identificar o erro
journalctl -u next-saas-api -n 50

# Verificar se o build foi concluído
ls -la /opt/next-saas-rbac/apps/api/dist/

# Verificar permissões
chown -R root:root /opt/next-saas-rbac
```

**Erro de conexão com banco:**
```bash
# Testar conexão com o banco
cd /opt/next-saas-rbac
pnpm --filter @saas/api prisma studio
```

**Nginx não encaminha requisições:**
```bash
# Testar configuração do Nginx
nginx -t

# Ver logs do Nginx
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

**Emails não estão sendo enviados:**
```bash
# Verificar se a porta SMTP está acessível
telnet smtp.seuservidor.com 587

# Verificar variáveis de ambiente do serviço
systemctl show next-saas-api | grep MAIL

# Ver logs do serviço para erros SMTP
journalctl -u next-saas-api | grep -i mail
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso da Rocketseat.

---

## 🙏 Agradecimentos

- **[Rocketseat](https://www.rocketseat.com.br/)** - Pelo excelente curso e orientação
- A comunidade open-source pelas ferramentas e bibliotecas incríveis

---

<div align="center">
  <p>Feito com ❤️ durante o curso SaaS da Rocketseat</p>
</div>