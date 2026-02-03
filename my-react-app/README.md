# Aplicação Web Fullstack com Next.js

Aplicação web Fullstack construída com Next.js que implementa um catálogo de produtos com área de usuário. O projeto demonstra diferentes estratégias de renderização (SSG, ISR, CSR) e boas práticas de desenvolvimento, incluindo arquitetura por funcionalidades, testes automatizados e acessibilidade completa.

## Sobre o Projeto

Este projeto foi desenvolvido como parte de um projeto de certificação, implementando uma aplicação web completa com Next.js seguindo boas práticas de:

- Arquitetura por funcionalidades
- Componentização progressiva
- Gestão explícita de estado
- Testes automatizados
- Acessibilidade básica (WCAG 2.1 AA)
- Estratégias modernas de renderização

### Funcionalidades

- **Catálogo de Produtos**: Listagem e visualização detalhada de produtos
- **Área do Usuário**: Autenticação simulada e gerenciamento de perfil
- **API Interna**: Endpoints REST para acesso aos dados
- **Acessibilidade**: Recursos completos de acessibilidade incluindo navegação por teclado, skip links e ARIA labels
- **Lazy Loading**: Carregamento sob demanda de componentes não críticos usando `next/dynamic` e `Suspense`
- **Testes**: Cobertura de testes para componentes, serviços e APIs

## Tecnologias Utilizadas

- **Next.js 16.1.6** - Framework React com App Router
- **React 19.2.3** - Biblioteca UI
- **TypeScript 5** - Tipagem estática
- **Jest 30.2.0** - Framework de testes
- **@testing-library/react 16.3.2** - Testes de componentes
- **@testing-library/jest-dom 6.9.1** - Matchers adicionais para Jest
- **ESLint 9** - Linter de código
- **Prettier 3.8.1** - Formatador de código
- **React Compiler** - Otimizações automáticas de React

## Pré-requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior (ou yarn/pnpm)
- Git (para clonar o repositório)

## Instalação

1. Clone o repositório (se aplicável):

   ```bash
   git clone [url-do-repositório]
   cd my-react-app
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador para ver a aplicação.

## Getting Started

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000). As páginas são atualizadas automaticamente quando você edita os arquivos.

### Build de Produção

Para criar um build de produção:

```bash
npm run build
```

Para iniciar o servidor de produção:

```bash
npm run start
```

## Scripts Disponíveis

### Desenvolvimento

- **`npm run dev`** - Inicia o servidor de desenvolvimento na porta 3000 (ou próxima disponível)
- **`npm run build`** - Cria um build de produção otimizado
- **`npm run start`** - Inicia o servidor de produção (requer build prévio com `npm run build`)

### Qualidade de Código

- **`npm run lint`** - Verifica erros de lint em todo o código usando ESLint
- **`npm run format`** - Formata todo o código automaticamente com Prettier
- **`npm run format:check`** - Verifica se o código está formatado corretamente (útil para CI/CD)

### Testes

- **`npm test`** - Executa todos os testes uma vez
- **`npm run test:watch`** - Executa testes em modo watch (reativo a mudanças)
- **`npm run test:coverage`** - Gera relatório de cobertura de testes

## Estrutura do Projeto

O projeto segue uma organização orientada a funcionalidades:

```
src/
├── app/                    # Rotas e páginas (Next.js App Router)
│   ├── account/           # Página de conta do usuário (CSR)
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── api/               # API Routes internas
│   │   └── catalog/
│   │       └── items/
│   │           ├── [id]/
│   │           │   └── route.ts
│   │           └── route.ts
│   ├── catalog/           # Páginas do catálogo
│   │   ├── [id]/          # Página de detalhes (ISR)
│   │   │   ├── page.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── not-found.module.css
│   │   └── page.tsx       # Lista de produtos (SSG)
│   ├── layout.tsx         # Layout raiz da aplicação
│   ├── page.tsx           # Página inicial
│   ├── globals.css        # Estilos globais
│   └── favicon.ico
├── features/              # Funcionalidades específicas
│   ├── catalog/           # Funcionalidade de catálogo
│   │   ├── components/    # Componentes do catálogo
│   │   ├── data/          # Dados mockados
│   │   └── types/         # Tipos TypeScript
│   └── user/              # Funcionalidade de usuário
│       ├── components/    # Componentes de usuário
│       ├── context/       # Context API e reducer
│       └── providers/     # Providers React
├── shared/                # Componentes reutilizáveis
│   └── components/        # Componentes compartilhados
│       ├── BackButton/
│       ├── ErrorMessage/
│       ├── LoadingSpinner/
│       ├── LoadingState/
│       ├── PageHeader/
│       └── SkipLink/
├── services/              # Lógica de negócio e APIs
│   ├── catalog.service.ts
│   └── api.types.ts
└── tests/                 # Testes organizados por domínio
    ├── api/               # Testes de API
    ├── data/              # Testes de dados
    ├── features/          # Testes de funcionalidades
    └── shared/            # Testes de componentes compartilhados
```

## Arquitetura

### Estratégias de Renderização

O projeto utiliza diferentes estratégias de renderização conforme a necessidade de cada página:

#### SSG (Static Site Generation) - Páginas `/` e `/catalog`

- Conteúdo estático gerado no build time
- Ideal para conteúdo que não muda frequentemente
- Melhor performance e SEO
- Implementação:
  - `src/app/page.tsx` - Página Home com preview de produtos
  - `src/app/catalog/page.tsx` - Página completa do catálogo

#### ISR (Incremental Static Regeneration) - Página `/catalog/[id]`

- Regeneração estática incremental
- Revalida a cada 1 hora (3600 segundos)
- Permite atualizações sem rebuild completo
- Implementação: `src/app/catalog/[id]/page.tsx` com `revalidate = 3600`

#### CSR (Client-Side Rendering) - Página `/account`

- Renderização no cliente
- Dados dependem de contexto de sessão local
- Ideal para conteúdo dinâmico baseado em estado do usuário
- Implementação: `src/app/account/page.tsx` com `"use client"`

### Lazy Loading e Code Splitting

O projeto implementa lazy loading usando `next/dynamic` e `Suspense` do React para otimizar o carregamento inicial:

- **ProfileDisplay e ProfileForm** - Carregados sob demanda na página `/account`
  - Reduz o bundle inicial da página de conta
  - Carregamento apenas quando o usuário está autenticado
  - Implementação: `src/app/account/page.tsx`

- **ItemDescription** - Carregado sob demanda na página de detalhes
  - Permite renderização inicial rápida do header e imagem
  - Descrição carregada após conteúdo crítico
  - Implementação: `src/app/catalog/[id]/page.tsx`

**Benefícios:**

- Redução do tamanho do bundle JavaScript inicial
- Melhor performance de carregamento
- Fallbacks acessíveis durante o carregamento (`LoadingSpinner`)

### Gerenciamento de Estado

- **Context API** combinada com **useReducer** para gerenciamento de estado global
- Separação entre estado, ações e componentes de interface
- Persistência em memória durante a sessão do usuário
- Implementação: `src/features/user/context/`

### Estrutura de Diretórios

Organização orientada a funcionalidades:

- **`app/`** - Rotas e páginas (Next.js App Router)
- **`features/`** - Regras de negócio e componentes específicos de cada funcionalidade
- **`shared/`** - Componentes reutilizáveis entre funcionalidades
- **`services/`** - Comunicação com APIs internas e lógica de negócio
- **`tests/`** - Testes unitários organizados por domínio

## Rotas e Páginas

### Páginas Públicas

- **`/`** - Página inicial (Home) com listagem de produtos em destaque
  - Renderização: SSG (Static Site Generation)
  - Funcionalidade: Exibe preview de 6 produtos em destaque, links para catálogo completo e área do usuário
  - Componentes: `PageHeader`, `CatalogGrid`

- **`/catalog`** - Lista de produtos do catálogo
  - Renderização: SSG (Static Site Generation)
  - Funcionalidade: Exibe grid responsivo com todos os produtos
  - Componentes: `PageHeader`, `CatalogGrid`, `CatalogCard`

- **`/catalog/[id]`** - Detalhes de um produto específico
  - Renderização: ISR (Incremental Static Regeneration)
  - Revalidação: A cada 1 hora
  - Funcionalidade: Exibe informações detalhadas do produto
  - Componentes: `BackButton`, `ItemHeader`, `ItemImage`, `ItemDescription` (lazy loaded)
  - Tratamento de erro: Página 404 customizada para produtos não encontrados

- **`/account`** - Área do usuário
  - Renderização: CSR (Client-Side Rendering)
  - Funcionalidade: Login simulado, visualização e edição de perfil
  - Componentes: `LoginForm`, `ProfileDisplay` (lazy loaded), `ProfileForm` (lazy loaded)
  - Estado: Gerenciado via Context API

### API Routes

- **`GET /api/catalog/items`** - Retorna lista completa de produtos
  - Status: 200 (sucesso), 500 (erro interno)
  - Resposta: `{ data: CatalogItem[], status: "success" }`

- **`GET /api/catalog/items/[id]`** - Retorna detalhes de um produto
  - Status: 200 (sucesso), 400 (bad request), 404 (not found), 500 (erro interno)
  - Resposta: `{ data: CatalogItem, status: "success" }` ou `{ error: string, message: string, statusCode: number }`

## Componentes Principais

### Componentes Compartilhados (`src/shared/components/`)

- **SkipLink** - Link para pular para o conteúdo principal (acessibilidade)
- **LoadingSpinner** - Spinner de carregamento acessível com diferentes tamanhos
- **ErrorMessage** - Exibição de mensagens de erro com roles ARIA apropriados
- **LoadingState** - Estado de carregamento para páginas/seções
- **PageHeader** - Cabeçalho reutilizável para páginas
- **BackButton** - Botão de navegação de retorno

### Componentes de Catálogo (`src/features/catalog/components/`)

- **CatalogCard** - Card individual de produto no grid
- **CatalogGrid** - Grid responsivo de produtos
- **ItemHeader** - Cabeçalho da página de detalhes do produto
- **ItemImage** - Imagem principal do produto (otimizada)
- **ItemDescription** - Descrição detalhada e informações adicionais

### Componentes de Usuário (`src/features/user/components/`)

- **LoginForm** - Formulário de login simulado com seleção de usuário
- **ProfileDisplay** - Exibição dos dados do usuário logado
- **ProfileForm** - Formulário de edição de perfil com validação

## Testes

### Executando Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

### Estrutura de Testes

Os testes estão organizados por domínio, espelhando a estrutura do código:

- **`tests/api/`** - Testes de integração para API Routes
- **`tests/data/`** - Testes de integridade dos dados mockados
- **`tests/features/`** - Testes de componentes e lógica de funcionalidades
- **`tests/shared/`** - Testes de componentes compartilhados

### Cobertura

O projeto possui testes para:

- Componentes React (renderização, interações, acessibilidade)
- Serviços e lógica de negócio
- API Routes (endpoints, status HTTP, tratamento de erros)
- Reducers e gerenciamento de estado

## Acessibilidade

O projeto implementa recursos de acessibilidade seguindo WCAG 2.1 Nível AA:

### Recursos Implementados

- **Skip Links**: Navegação rápida para conteúdo principal
- **Navegação por Teclado**: Todos os elementos interativos são acessíveis via teclado
- **ARIA Labels**: Atributos ARIA apropriados em componentes interativos
- **Estados de Foco**: Indicadores visuais claros para elementos focados
- **Mensagens de Erro**: Feedback acessível com `role="alert"` e `aria-live`
- **Estados de Carregamento**: Feedback textual acessível durante operações
- **Semântica HTML**: Uso adequado de elementos semânticos (nav, main, article, section)
- **Formulários**: Labels associados, campos obrigatórios marcados, validação acessível

### Melhorias de Acessibilidade

- Contraste de cores adequado
- Tamanho de texto redimensionável
- Navegação por screen readers
- Estados de erro e carregamento acessíveis
- Estrutura de landmarks para navegação

## Desenvolvimento

### Convenções de Código

- **Nomenclatura**: Componentes em PascalCase, arquivos seguem o nome do componente
- **TypeScript**: Modo strict habilitado, tipagem explícita
- **CSS Modules**: Um arquivo `.module.css` por componente
- **Testes**: Arquivos de teste com sufixo `.test.tsx` ou `.test.ts`
- **Estrutura**: Um componente por arquivo, organização por funcionalidade

### Adicionando Novos Componentes

1. Criar pasta em `features/[funcionalidade]/components/` ou `shared/components/`
2. Criar arquivo `.tsx` com o componente
3. Criar arquivo `.module.css` para estilos
4. Adicionar testes em `tests/features/` ou `tests/shared/`
5. Seguir padrões de acessibilidade (labels, ARIA, navegação por teclado)

### Configurações Importantes

- **React Compiler**: Habilitado em `next.config.ts` para otimizações automáticas
- **CSS Modules**: Configurado para escopo isolado por componente
- **TypeScript**: Strict mode habilitado para máxima segurança de tipos
- **Path Aliases**: `@/*` aponta para `./src/*` (configurado em `tsconfig.json`)
- **Imagens Remotas**: Configurado para permitir imagens do Unsplash

## Deploy

### Build de Produção

Para criar um build de produção otimizado:

```bash
npm run build
```

O build será gerado na pasta `.next/`. Para testar localmente:

```bash
npm run start
```

### Deploy na Vercel

A forma mais fácil de fazer deploy é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

1. Conecte seu repositório GitHub à Vercel
2. Configure o projeto (detecção automática do Next.js)
3. O deploy será feito automaticamente a cada push

Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

### Deploy em Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:

- **Netlify**: Suporte nativo para Next.js
- **AWS Amplify**: Configuração via console ou CLI
- **Docker**: Containerize a aplicação com Dockerfile
- **Servidor próprio**: Execute `npm run build` e `npm run start`

## Learn More

Para aprender mais sobre Next.js, consulte os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - aprenda sobre recursos e API do Next.js
- [Learn Next.js](https://nextjs.org/learn) - um tutorial interativo do Next.js

Você pode verificar o [repositório GitHub do Next.js](https://github.com/vercel/next.js) - seu feedback e contribuições são bem-vindos!

## Estrutura de Dados

### CatalogItem

```typescript
interface CatalogItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  createdAt: string;
  rating?: number;
  stock?: number;
}
```

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}
```

## Licença

Este projeto foi desenvolvido como parte de um projeto de certificação.
