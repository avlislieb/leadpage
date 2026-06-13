# Leão do E-commerce

Landing page institucional da comunidade premium **Leão do E-commerce** — plataforma voltada a vendedores de Mercado Livre, Shopee e TikTok Shop que buscam produtos validados, mentoria, aulas práticas e suporte logístico completo.

---

## Objetivo do sistema

Apresentar a proposta de valor da comunidade, exibir o catálogo de produtos com margens de lucro, listar aulas disponíveis, detalhar o fluxo logístico (full-commerce) e direcionar o visitante para a entrada na comunidade via WhatsApp.

---

## Arquitetura

```
Browser / Crawler
       │
       ▼
  Nitro Server (SSR)
       │  TanStack Start middleware chain
       ▼
  __root.tsx  ──── QueryClientProvider
       │             └── AnalyticsTracker (GA4)
       ▼
  routes/index.tsx  ──── Landing page completa (SPA hidratada)
```

- **SSR com hidratação**: o servidor renderiza o HTML inicial via Nitro; o React assume no cliente.
- **Roteamento**: arquivo-based (TanStack Router). Cada arquivo em `src/routes/` vira uma rota.
- **Estado global**: não há store global. Os dados (produtos, aulas, depoimentos) são constantes declaradas no próprio `index.tsx`.
- **Server Functions**: padrão `createServerFn` disponível para futuras integrações server-side (ver `src/lib/api/example.functions.ts`).

---

## Tecnologias utilizadas

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework full-stack | TanStack Start | 1.167.x |
| Roteamento | TanStack Router | 1.168.x |
| Data fetching | TanStack React Query | 5.83.x |
| UI | React | 19.2.0 |
| Estilização | Tailwind CSS v4 | 4.2.1 |
| Componentes | shadcn/ui (Radix UI) | — |
| Ícones | Lucide React | 0.575.x |
| Formulários | React Hook Form + Zod | 7.x / 3.x |
| Analytics | Google Analytics 4 (gtag.js) | — |
| Build | Vite | 7.3.x |
| Servidor SSR | Nitro | 3.0.x |
| Linguagem | TypeScript | 5.8.x |
| Gerenciador de pacotes | Bun | — |

---

## Dependências

### Produção

```json
"@tanstack/react-start": "^1.167.50"
"@tanstack/react-router": "^1.168.25"
"@tanstack/react-query": "^5.83.0"
"react": "^19.2.0"
"tailwindcss": "^4.2.1"
"@tailwindcss/vite": "^4.2.1"
"lucide-react": "^0.575.0"
"react-hook-form": "^7.71.2"
"zod": "^3.24.2"
"@hookform/resolvers": "^5.2.2"
"clsx": "^2.1.1"
"tailwind-merge": "^3.5.0"
"class-variance-authority": "^0.7.1"
"sonner": "^2.0.7"
"recharts": "^2.15.4"
"embla-carousel-react": "^8.6.0"
"date-fns": "^4.1.0"
"vaul": "^1.1.2"
"cmdk": "^1.1.1"
"input-otp": "^1.4.2"
"react-day-picker": "^9.14.0"
"react-resizable-panels": "^4.6.5"
```

> Adicionalmente: 26 primitivos Radix UI (`@radix-ui/react-*`).

### Desenvolvimento

```json
"vite": "^7.3.1"
"typescript": "^5.8.3"
"nitro": "3.0.260603-beta"
"eslint": "^9.32.0"
"prettier": "^3.7.3"
"@lovable.dev/vite-tanstack-config": "2.3.2"
"typescript-eslint": "^8.56.1"
```

---

## Scripts

Definidos em `package.json`:

| Comando | Descrição |
|---------|-----------|
| `bun run dev` | Inicia o servidor de desenvolvimento (Vite + HMR) |
| `bun run build` | Build de produção |
| `bun run build:dev` | Build em modo desenvolvimento |
| `bun run preview` | Serve o build de produção localmente |
| `bun run lint` | Executa o ESLint |
| `bun run format` | Formata o código com Prettier |

---

## Variáveis de ambiente

Não existe arquivo `.env.example` no repositório. A única variável relevante é referenciada internamente:

| Variável | Arquivo | Descrição |
|----------|---------|-----------|
| `VITE_GA_MEASUREMENT_ID` | `src/lib/analytics.config.ts` | Measurement ID do Google Analytics 4. Atualmente hardcoded como `"G-VTEJRWVMY0"`. Para ambientes distintos, substitua o valor nesse arquivo ou extraia para uma variável de ambiente prefixada com `VITE_`. |

> **Nota**: variáveis prefixadas com `VITE_` são expostas ao bundle do cliente pelo Vite.

---

## Banco de dados e ORM

Não há banco de dados nem ORM integrado. Todos os dados exibidos (produtos, aulas, depoimentos, estatísticas) são constantes estáticas declaradas em `src/routes/index.tsx`.

---

## Docker

Não há `Dockerfile` nem `docker-compose.yml` no repositório.

---

## Endpoints da API

Não há API REST ou GraphQL exposta. O projeto possui apenas uma **Server Function** de exemplo:

```ts
// src/lib/api/example.functions.ts
export const getGreeting = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string().min(1) }))
  .handler(async ({ data }) => {
    return { greeting: `Hello, ${data.name}!`, mode: config.nodeEnv };
  });
```

Server Functions do TanStack Start são invocadas diretamente no cliente como chamadas TypeScript — não requerem fetch manual.

---

## Estrutura de pastas

```
leadpage/
├── public/
│   └── robots.txt
├── src/
│   ├── assets/                  # Imagens da landing page (JPG)
│   │   ├── hero-jungle.jpg
│   │   ├── product-*.jpg        # 4 produtos do catálogo
│   │   └── lesson-*.jpg         # 4 thumbnails de aulas
│   ├── components/
│   │   ├── AnalyticsTracker.tsx # Inicialização e rastreamento GA4
│   │   └── ui/                  # 47 componentes shadcn/ui (Radix UI)
│   ├── hooks/
│   │   └── use-mobile.tsx       # Hook de breakpoint responsivo
│   ├── lib/
│   │   ├── analytics.ts         # Helpers GA4 (initGA, trackPageView, trackEvent)
│   │   ├── analytics.config.ts  # Measurement ID do GA4
│   │   ├── config.server.ts     # Configurações server-only (process.env)
│   │   ├── error-capture.ts     # Captura de erros fora do boundary SSR
│   │   ├── error-page.ts        # HTML de fallback para erros 500
│   │   ├── lovable-error-reporting.ts
│   │   ├── utils.ts             # cn() — clsx + tailwind-merge
│   │   └── api/
│   │       └── example.functions.ts  # Exemplo de Server Function
│   ├── routes/
│   │   ├── __root.tsx           # Layout raiz: QueryClientProvider + AnalyticsTracker
│   │   ├── index.tsx            # Rota "/" — landing page completa
│   │   └── README.md            # Convenções de roteamento
│   ├── router.tsx               # Criação do router + QueryClient
│   ├── routeTree.gen.ts         # Gerado automaticamente — não editar
│   ├── server.ts                # Entry SSR com wrapper de erro
│   ├── start.ts                 # Inicialização do TanStack Start + middleware
│   └── styles.css               # Tailwind v4 + tema + animações customizadas
├── bunfig.toml                  # Configurações do Bun
├── bun.lock                     # Lockfile
├── components.json              # Configuração do shadcn/ui
├── eslint.config.js
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Fluxo de execução

```
1. Requisição HTTP chega ao servidor Nitro
2. TanStack Start executa o middleware errorMiddleware (start.ts)
3. SSR renderiza __root.tsx → RootShell (HTML/body) → RootComponent
4. RootComponent instancia QueryClientProvider e monta <AnalyticsTracker />
5. A rota correspondente é resolvida — "/" renderiza <Index /> (index.tsx)
6. HTML final é enviado ao browser
7. React hidrata no cliente
8. AnalyticsTracker chama initGA() → injeta script gtag.js dinamicamente
9. Mudanças de rota disparam trackPageView() automaticamente
```

---

## Instalação e desenvolvimento

### Pré-requisitos

- [Bun](https://bun.sh) ≥ 1.0 **ou** Node.js ≥ 18 com npm

### Com Bun (recomendado)

```bash
# 1. Instalar dependências
bun install

# 2. Iniciar servidor de desenvolvimento
bun run dev
```

### Com npm (alternativo)

```bash
npm install
npm run dev
```

O servidor sobe em `http://localhost:3000` com Hot Module Replacement ativo.

---

## Build e deploy

### Build de produção

```bash
bun run build
# ou
npm run build
```

Os artefatos são gerados em `.output/` (Nitro) e `.vinxi/` (TanStack/Vite). O target de deploy padrão é **Cloudflare** (configurado via `@lovable.dev/vite-tanstack-config`).

### Preview local do build

```bash
bun run preview
```

### Qualidade de código

```bash
bun run lint      # Verificação ESLint
bun run format    # Formatação Prettier
```

---

## Seções da landing page

| Seção | Âncora | Descrição |
|-------|--------|-----------|
| Navegação | — | Fixed top, links internos + botão "Entrar" |
| Hero | — | Imagem full-screen, headline, CTAs |
| Estatísticas | `#sobre` | Contadores animados (IntersectionObserver) |
| Quem Somos | — | Descrição da comunidade |
| Como Funciona | — | 4 passos (Escolha → Anuncie → Venda → Escale) |
| Catálogo | `#catalogo` | Produtos com filtro por categoria, preço de compra/venda e margem |
| Aulas | `#aulas` | Scroll horizontal de 4 aulas em vídeo |
| Comunidade | — | Benefícios da comunidade + link WhatsApp |
| Logística | `#logistica` | Fluxo full-commerce em 5 etapas |
| Depoimentos | — | 3 testemunhos com resultados reais |
| CTA Final | `#cta` | Chamada para ação de entrada na comunidade |
| Footer | — | Links de plataforma, redes sociais e legal |

---

## Convenções de código

- **Path alias**: `@/*` → `src/*`
- **Componentes**: PascalCase; funções utilitárias: camelCase
- **Classes CSS**: sempre via `cn()` (`src/lib/utils.ts`) para composição com Tailwind
- **Novos componentes UI**: `bunx shadcn@latest add <nome>`
- **Roteamento**: criar arquivos em `src/routes/` — o `routeTree.gen.ts` é regenerado automaticamente
- **Server Functions**: usar `createServerFn` de `@tanstack/react-start` para lógica server-side
