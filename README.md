<div align="center">
  <h1>🚀 Next.js SaaS + RBAC</h1>
  <p>Uma plataforma SaaS multi-tenant completa com Controle de Acesso Baseado em Funções avançado</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
  ![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
  ![Fastify](https://img.shields.io/badge/Fastify-5.8-000000?style=for-the-badge&logo=fastify)
  ![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748?style=for-the-badge&logo=prisma)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
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
   MAIL_HOST=""
   MAIL_PORT=""
   MAIL_USER=""
   MAIL_PASS=""
   ```

5. **Execute as migrações do banco de dados**
   ```bash
   pnpm --filter @saas/api db:migrate
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

### Backend (Render)
1. Crie um novo Web Service no Render
2. Conecte seu repositório
3. Defina o comando de build: `pnpm install --frozen-lockfile; pnpm run build`
4. Defina o comando de start: `pnpm prisma migrate deploy; pnpm prisma generate; pnpm run start`
5. Adicione as variáveis de ambiente
6. Faça o deploy

### Frontend (Vercel)
1. Importe o projeto para a Vercel
2. Defina o diretório raiz como `apps/web`
3. Adicione as variáveis de ambiente
4. Faça o deploy

### Banco de Dados (Neon)
1. Crie um novo projeto no Neon
2. Copie a string de conexão
3. Atualize `DATABASE_URL` nas suas variáveis de ambiente
4. Execute as migrações

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