# 📊 Diagramas para Publicação no LinkedIn

## 🎨 Como Usar

Você pode converter estes diagramas Mermaid em imagens usando:
- https://mermaid.live (online, gratuito)
- Extensão VS Code "Markdown Preview Mermaid Support"
- https://kroki.io (API para converter)

---

## 1. Stack Tecnológica (Para Thumbnail/Capa)

```mermaid
graph TB
    subgraph "Frontend"
        A[Next.js 19]
        B[React 19]
        C[Tailwind CSS]
        D[shadcn/ui]
    end
    
    subgraph "Backend"
        E[Fastify 5]
        F[Prisma 7]
        G[JWT Auth]
        H[Swagger]
    end
    
    subgraph "Infraestrutura"
        I[PostgreSQL]
        J[Nginx]
        K[Ubuntu VPS]
        L[GitHub Actions]
    end
    
    subgraph "Ferramentas"
        M[TypeScript]
        N[TurboRepo]
        O[CASL RBAC]
        P[Zod]
    end
    
    A --> E
    E --> F
    F --> I
    L --> K
    
    style A fill:#0070f3
    style B fill:#61dafb
    style E fill:#000000
    style F fill:#2d3748
    style I fill:#336791
    style M fill:#3178c6
```

---

## 2. Arquitetura do Sistema (Visão Geral) - ATUALIZADO

```mermaid
graph TB
    U[👤 Usuário] --> N[Nginx<br/>Reverse Proxy<br/>VPS Ubuntu 22.04]
    
    N --> WEB[Next.js Frontend<br/>Port 3000<br/>Systemd Service]
    N --> API[Fastify API<br/>Port 3333<br/>Systemd Service]
    
    API --> DB[(Neon<br/>PostgreSQL)]
    API --> S[SMTP<br/>Email Service]
    
    GH[GitHub Repository] --> GA[GitHub Actions<br/>CI/CD]
    GA -->|SSH Deploy| VPS[VPS Server]
    VPS --> WEB
    VPS --> API
    
    style N fill:#009639,color:#fff
    style WEB fill:#0070f3,color:#fff
    style API fill:#000,color:#fff
    style DB fill:#336791,color:#fff
    style GA fill:#2088ff,color:#fff
    style VPS fill:#E95420,color:#fff
```

---

## 2b. Arquitetura de Deploy (Detalhada) - NOVO

```mermaid
graph TB
    subgraph "VPS Ubuntu 22.04"
        N[Nginx :80/:443]
        
        subgraph "Systemd Services"
            API[next-saas-api<br/>Node.js :3333]
            WEB[next-saas-web<br/>Node.js :3000]
        end
        
        SSL[Let's Encrypt<br/>Auto SSL]
    end
    
    subgraph "External Services"
        DB[(Neon PostgreSQL)]
        SMTP[SMTP Server]
        GH[GitHub]
    end
    
    subgraph "CI/CD Pipeline"
        GA[GitHub Actions]
        DETECT{Detect<br/>Changes}
    end
    
    N --> WEB
    N --> API
    SSL --> N
    
    API --> DB
    API --> SMTP
    
    GH --> GA
    GA --> DETECT
    DETECT -->|apps/api| API
    DETECT -->|apps/web| WEB
    DETECT -->|packages| API
    DETECT -->|packages| WEB
    
    style N fill:#009639,color:#fff
    style API fill:#000,color:#fff
    style WEB fill:#0070f3,color:#fff
    style DB fill:#336791,color:#fff
    style GA fill:#2088ff,color:#fff
```

---

## 3. Fluxo RBAC Simplificado

```mermaid
graph TD
    U[Usuário] -->|Login| A[Autenticação JWT]
    A -->|Token| O[Organização]
    O -->|Possui| R{Role}
    
    R -->|ADMIN| P1[✅ Todas Permissões]
    R -->|MEMBER| P2[✅ Criar/Ver Projetos<br/>❌ Gerenciar Membros]
    R -->|BILLING| P3[✅ Ver Billing<br/>❌ Projetos/Membros]
    
    P1 --> AC[Ação Permitida]
    P2 --> AC
    P3 --> AC
    
    style U fill:#4ade80
    style A fill:#fbbf24
    style R fill:#f97316
    style P1 fill:#10b981
    style P2 fill:#3b82f6
    style P3 fill:#8b5cf6
```

---

## 4. Fluxo de Convite por Email

```mermaid
sequenceDiagram
    participant Admin
    participant API
    participant DB
    participant Email
    participant NewUser
    
    Admin->>API: Envia convite (email, role)
    API->>DB: Cria invite com token único
    API->>Email: Envia email com link
    Email->>NewUser: Recebe convite
    NewUser->>API: Clica no link
    API->>DB: Valida token
    DB->>API: Token válido
    API->>NewUser: Aceita convite
    NewUser->>API: Associa à organização
    API->>DB: Cria membership
    DB->>NewUser: ✅ Acesso concedido
```

---

## 5. Pipeline CI/CD (Inteligente) - ATUALIZADO

```mermaid
graph TB
    A[git push origin main] --> B[GitHub Repository]
    B --> C{GitHub Actions<br/>Path Filter}
    
    C -->|apps/api/**| D1[Build API]
    C -->|apps/web/**| D2[Build Web]
    C -->|packages/**| D3[Build Both]
    
    D1 --> E1[SSH to VPS]
    D2 --> E2[SSH to VPS]
    D3 --> E3[SSH to VPS]
    
    E1 --> F1[git pull<br/>pnpm install]
    E2 --> F2[git pull<br/>pnpm install]
    E3 --> F3[git pull<br/>pnpm install]
    
    F1 --> G1[Prisma Migrate<br/>Build API]
    F2 --> G2[Build Web]
    F3 --> G3[Prisma Migrate<br/>Build API + Web]
    
    G1 --> H1[systemctl restart<br/>next-saas-api]
    G2 --> H2[systemctl restart<br/>next-saas-web]
    G3 --> H3[systemctl restart<br/>both services]
    
    H1 --> I[✅ Deploy Completo]
    H2 --> I
    H3 --> I
    
    style A fill:#f0f0f0
    style C fill:#2088ff,color:#fff
    style I fill:#28a745,color:#fff
    style D3 fill:#fbbf24
    style G3 fill:#fbbf24
    style H3 fill:#fbbf24
```

---

## 5b. Fluxo de Deploy Otimizado - NOVO

```mermaid
flowchart LR
    subgraph "Mudanças no Código"
        A1[apps/api/]
        A2[apps/web/]
        A3[packages/]
    end
    
    subgraph "Detecção"
        B{Path Filter}
    end
    
    subgraph "Deploy Seletivo"
        C1[Deploy API Only]
        C2[Deploy Web Only]
        C3[Deploy Full Stack]
    end
    
    subgraph "Resultado"
        D1[⚡ 2min]
        D2[⚡ 1.5min]
        D3[⚡ 3min]
    end
    
    A1 --> B
    A2 --> B
    A3 --> B
    
    B -->|Only API| C1
    B -->|Only Web| C2
    B -->|Packages| C3
    
    C1 --> D1
    C2 --> D2
    C3 --> D3
    
    style B fill:#2088ff,color:#fff
    style C1 fill:#000,color:#fff
    style C2 fill:#0070f3,color:#fff
    style C3 fill:#10b981,color:#fff
    style D1 fill:#22c55e,color:#fff
    style D2 fill:#22c55e,color:#fff
    style D3 fill:#22c55e,color:#fff
```

---

## 6. Estrutura Multi-Tenant

```mermaid
graph TB
    subgraph "Usuário João"
        U1[João]
    end
    
    subgraph "Organização A"
        R1[ADMIN]
        P1[Projetos A]
        M1[Membros A]
    end
    
    subgraph "Organização B"
        R2[MEMBER]
        P2[Projetos B]
        M2[Membros B]
    end
    
    subgraph "Organização C"
        R3[BILLING]
        P3[Projetos C]
        M3[Membros C]
    end
    
    U1 -->|Todas Permissões| R1
    U1 -->|Apenas Projetos| R2
    U1 -->|Apenas Billing| R3
    
    R1 --> P1
    R1 --> M1
    R2 --> P2
    R3 -.Sem Acesso.-> P3
    R3 -.Sem Acesso.-> M3
    
    style U1 fill:#4ade80
    style R1 fill:#10b981
    style R2 fill:#3b82f6
    style R3 fill:#8b5cf6
```

---

## 7. Autenticação e Autorização

```mermaid
flowchart TD
    A[Request] --> B{Autenticado?}
    B -->|Não| C[❌ 401 Unauthorized]
    B -->|Sim| D[Verifica JWT]
    D --> E{Token Válido?}
    E -->|Não| C
    E -->|Sim| F[Extrai User ID]
    F --> G[Carrega Permissions]
    G --> H{Tem Permissão?}
    H -->|Não| I[❌ 403 Forbidden]
    H -->|Sim| J[✅ Executa Ação]
    
    style A fill:#e0e0e0
    style C fill:#ef4444
    style I fill:#f97316
    style J fill:#10b981
```

---

## 8. Monorepo Structure

```mermaid
graph TB
    ROOT[next-saas-rbac]
    
    ROOT --> APPS[apps/]
    ROOT --> PKG[packages/]
    ROOT --> CFG[config/]
    
    APPS --> WEB[web/<br/>Next.js]
    APPS --> API[api/<br/>Fastify]
    
    PKG --> AUTH[auth/<br/>RBAC Logic]
    PKG --> ENV[env/<br/>Validation]
    
    CFG --> ESL[eslint-config/]
    CFG --> TS[typescript-config/]
    CFG --> PRET[prettier/]
    
    WEB -.usa.-> AUTH
    API -.usa.-> AUTH
    WEB -.usa.-> ENV
    API -.usa.-> ENV
    
    style ROOT fill:#fbbf24
    style APPS fill:#3b82f6
    style PKG fill:#10b981
    style CFG fill:#8b5cf6
```

---

## 9. Features Principais (Visual Atrativo)

```mermaid
mindmap
  root((Next SaaS<br/>RBAC))
    Autenticação
      OAuth GitHub
      JWT Tokens
      Recuperação Senha
      Email SMTP
    Multi-Tenant
      Organizações
      Membros
      Convites
      Roles Múltiplos
    RBAC
      3 Roles
      15+ Permissões
      Condições
      Frontend + Backend
    DevOps
      CI CD
      GitHub Actions
      VPS Ubuntu
      Nginx SSL
    Stack Moderna
      Next.js 19
      React 19
      Fastify 5
      Prisma 7
```

---

## 10. Evolução da Arquitetura de Deploy - ATUALIZADO

```mermaid
graph TB
    subgraph "Arquitetura Anterior"
        A1[Frontend<br/>Vercel]
        A2[Backend<br/>VPS]
        A3[Database<br/>Neon]
        
        A1 -.Internet.-> A2
        A2 --> A3
    end
    
    subgraph "Arquitetura Atual - VPS Completo"
        B1[VPS Ubuntu 22.04]
        
        B2[Nginx<br/>Reverse Proxy]
        B3[Frontend<br/>Systemd]
        B4[Backend<br/>Systemd]
        B5[Database<br/>Neon]
        
        B1 --> B2
        B2 --> B3
        B2 --> B4
        B4 --> B5
    end
    
    subgraph "Vantagens"
        C1[✅ Controle Total]
        C2[✅ Custo Otimizado]
        C3[✅ Latência Reduzida]
        C4[✅ CI/CD Inteligente]
        C5[✅ SMTP Configurado]
    end
    
    A1 -.Migração.-> B1
    A2 -.Consolidação.-> B1
    
    B1 -.Benefícios.-> C1
    B1 -.Benefícios.-> C2
    B1 -.Benefícios.-> C3
    B1 -.Benefícios.-> C4
    B1 -.Benefícios.-> C5
    
    style A1 fill:#999,color:#fff
    style A2 fill:#999,color:#fff
    style B1 fill:#E95420,color:#fff
    style B2 fill:#009639,color:#fff
    style B3 fill:#0070f3,color:#fff
    style B4 fill:#000,color:#fff
    style C1 fill:#10b981,color:#fff
    style C2 fill:#10b981,color:#fff
    style C3 fill:#10b981,color:#fff
    style C4 fill:#10b981,color:#fff
    style C5 fill:#10b981,color:#fff
```

---

## 11. Stack de Infraestrutura Completa - NOVO

```mermaid
graph TB
    subgraph "Layer 1: DNS & SSL"
        DNS[DNS Provider]
        SSL[Let's Encrypt]
    end
    
    subgraph "Layer 2: Web Server"
        NGINX[Nginx<br/>Reverse Proxy<br/>+ Load Balancer]
    end
    
    subgraph "Layer 3: Application"
        WEB[Next.js 19<br/>Frontend<br/>Port 3000]
        API[Fastify 5<br/>Backend<br/>Port 3333]
    end
    
    subgraph "Layer 4: Process Management"
        SYS1[Systemd<br/>next-saas-web]
        SYS2[Systemd<br/>next-saas-api]
    end
    
    subgraph "Layer 5: Data & External"
        DB[(PostgreSQL<br/>Neon)]
        SMTP[SMTP Server]
        GH[GitHub Repo]
    end
    
    subgraph "Layer 6: CI/CD"
        GA[GitHub Actions]
        PATH{Path Filter}
    end
    
    DNS --> NGINX
    SSL --> NGINX
    NGINX --> WEB
    NGINX --> API
    
    WEB -.managed by.-> SYS1
    API -.managed by.-> SYS2
    
    API --> DB
    API --> SMTP
    
    GH --> GA
    GA --> PATH
    PATH -.deploy.-> WEB
    PATH -.deploy.-> API
    
    style NGINX fill:#009639,color:#fff
    style WEB fill:#0070f3,color:#fff
    style API fill:#000,color:#fff
    style SYS1 fill:#E95420,color:#fff
    style SYS2 fill:#E95420,color:#fff
    style GA fill:#2088ff,color:#fff
    style DB fill:#336791,color:#fff
```

---

## 💡 Dicas para Criar Imagens Profissionais

### Opção 1: Converter Mermaid para PNG
1. Acesse https://mermaid.live
2. Cole o código do diagrama
3. Ajuste cores e estilo
4. Exporte como PNG (alta resolução)

### Opção 2: Screenshot do VS Code
1. Abra o arquivo README.md
2. Use extensão "Markdown Preview Mermaid Support"
3. Tire screenshot limpo (Ctrl+Shift+P → "Screenshot")
4. Edite no Figma/Canva para adicionar bordas

### Opção 3: Criar Thumbnail Customizado
Use Canva ou Figma:
- Fundo gradiente (azul → roxo)
- Logos das tecnologias principais
- Título grande "Next.js SaaS RBAC"
- Subtítulo com principais features
- Seu nome/foto no canto

### Opção 4: Carrossel de 5 Imagens
1. **Capa:** Logo + stack tecnológica
2. **Arquitetura:** Diagrama 2 (sistema completo)
3. **RBAC:** Diagrama 3 (fluxo de permissões)
4. **CI/CD:** Diagrama 5 (pipeline)
5. **Código:** Screenshot de código TypeScript com highlight

---

## 🎨 Paleta de Cores Sugerida

Para manter consistência visual:

```
Next.js:     #0070f3
React:       #61dafb
TypeScript:  #3178c6
Node.js:     #339933
PostgreSQL:  #336791
Fastify:     #000000
Vercel:      #000000
Success:     #10b981
Warning:     #f59e0b
Error:       #ef4444
```

---

## 📱 Formato Ideal para LinkedIn

- **Imagem única:** 1200x627px (ratio 1.91:1)
- **Carrossel:** 1080x1080px por imagem (quadrado)
- **Vídeo:** 1920x1080px, máximo 10 minutos
- **Arquivo:** PNG para qualidade, JPG para tamanho menor

---

## 🚀 Ferramentas Úteis

- **Mermaid Live:** https://mermaid.live
- **Excalidraw:** https://excalidraw.com (diagramas manuais)
- **Canva:** https://canva.com (design profissional)
- **Carbon:** https://carbon.now.sh (screenshots de código)
- **Figma:** https://figma.com (design avançado)

---

**Escolha 1-2 diagramas principais e converta para imagens profissionais!**

Os mais impactantes para LinkedIn são:
1. Diagrama 2 (Arquitetura)
2. Diagrama 3 (RBAC)
3. Diagrama 5 (CI/CD)
