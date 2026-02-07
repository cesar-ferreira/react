# Aplicação Web Fullstack com Next.js

Aplicação web desenvolvida com Next.js que implementa um catálogo de produtos com área de usuário. O projeto demonstra diferentes estratégias de renderização (SSG, ISR, CSR) e boas práticas de desenvolvimento.

## Sobre o Projeto

Este projeto foi desenvolvido como parte de um projeto de certificação, implementando uma aplicação web completa com Next.js seguindo boas práticas de:

- Arquitetura por funcionalidades
- Componentização progressiva
- Gestão explícita de estado
- Testes automatizados
- Acessibilidade (WCAG 2.1 AA)
- Estratégias modernas de renderização

### Funcionalidades

- **Catálogo de Produtos**: Listagem e visualização detalhada de produtos
- **Autenticação Simulada**: Login com seleção de usuário e senha
- **Área do Usuário**: Gerenciamento de perfil com edição de dados
- **API Interna**: Endpoints REST para acesso aos dados
- **Acessibilidade**: Recursos completos incluindo navegação por teclado, skip links e ARIA labels
- **Lazy Loading**: Carregamento sob demanda de componentes não críticos
- **Testes**: Cobertura de testes para componentes, serviços e APIs

## Tecnologias Utilizadas

- **Next.js 16.1.6** - Framework React com App Router
- **React 19.2.3** - Biblioteca UI
- **TypeScript 5** - Tipagem estática
- **Jest 30.2.0** - Framework de testes
- **@testing-library/react 16.3.2** - Testes de componentes
- **ESLint 9** - Linter de código
- **Prettier 3.8.1** - Formatador de código

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js 18.x ou superior
- npm 9.x ou superior (ou yarn/pnpm)

## Instalação

1. Extraia o arquivo ZIP do projeto em uma pasta de sua escolha

2. Abra o terminal e navegue até a pasta do projeto:

   ```bash
   cd caminho/para/pasta/do/projeto
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

   Isso vai instalar todas as dependências necessárias. Pode levar alguns minutos na primeira vez.

## Como Rodar

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000). As páginas são atualizadas automaticamente quando você edita os arquivos.

Para parar o servidor, pressione `Ctrl + C` no terminal.

## Scripts Disponíveis

### Desenvolvimento

- **`npm run dev`** - Inicia o servidor de desenvolvimento na porta 3000

### Qualidade de Código

- **`npm run lint`** - Verifica erros de lint em todo o código usando ESLint
- **`npm run format`** - Formata todo o código automaticamente com Prettier
- **`npm run format:check`** - Verifica se o código está formatado corretamente

### Testes

- **`npm test`** - Executa todos os testes uma vez
- **`npm run test:watch`** - Executa testes em modo watch (reativo a mudanças)
- **`npm run test:coverage`** - Gera relatório de cobertura de testes

### Build

- **`npm run build`** - Cria um build de produção (útil para verificar se há erros)

## Estrutura do Projeto

O projeto segue uma organização orientada a funcionalidades:

```
src/
├── app/                    # Rotas e páginas (Next.js App Router)
│   ├── account/           # Página de conta do usuário (CSR)
│   ├── api/               # API Routes internas
│   │   └── catalog/
│   ├── catalog/           # Páginas do catálogo
│   │   ├── [id]/          # Página de detalhes (ISR)
│   │   └── page.tsx       # Lista de produtos (SSG)
│   ├── layout.tsx         # Layout raiz da aplicação
│   ├── page.tsx           # Página inicial (login)
│   └── globals.css        # Estilos globais
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
├── services/              # Lógica de negócio e APIs
└── tests/                 # Testes organizados por domínio
    ├── api/               # Testes de API
    ├── data/              # Testes de dados
    ├── features/          # Testes de funcionalidades
    └── shared/            # Testes de componentes compartilhados
```

## Arquitetura

### Estratégias de Renderização

O projeto utiliza diferentes estratégias de renderização conforme a necessidade de cada página:

#### SSG (Static Site Generation) - Página `/catalog`

- Conteúdo estático gerado no build time
- Ideal para conteúdo que não muda frequentemente
- Melhor performance e SEO
- Implementação: `src/app/catalog/page.tsx`

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

### Lazy Loading

O projeto implementa lazy loading usando `next/dynamic` e `Suspense` para otimizar o carregamento inicial:

- **ProfileDisplay e ProfileForm** - Carregados sob demanda na página `/account`
- **ItemDescription** - Carregado sob demanda na página de detalhes

Isso reduz o tamanho do bundle JavaScript inicial e melhora a performance de carregamento.

### Gerenciamento de Estado

- **Context API** combinada com **useReducer** para gerenciamento de estado global
- Separação entre estado, ações e componentes de interface
- Persistência em memória durante a sessão do usuário
- Implementação: `src/features/user/context/`

## Rotas e Páginas

### Páginas

- **`/`** - Página de login
  - Renderização: SSG
  - Funcionalidade: Autenticação simulada com seleção de usuário e senha (senha padrão: "123456")
  - Após login bem-sucedido, redireciona para `/catalog`
  - Componentes: `LoginForm`

- **`/catalog`** - Lista de produtos do catálogo
  - Renderização: SSG
  - Funcionalidade: Exibe grid responsivo com todos os produtos
  - Protegida por autenticação (redireciona para login se não autenticado)
  - Componentes: `PageHeader`, `CatalogGrid`, `CatalogCard`
  - Header global visível com navegação

- **`/catalog/[id]`** - Detalhes de um produto específico
  - Renderização: ISR
  - Revalidação: A cada 1 hora
  - Funcionalidade: Exibe informações detalhadas do produto
  - Protegida por autenticação
  - Componentes: `BackButton`, `ItemHeader`, `ItemImage`, `ItemDescription` (lazy loaded)
  - Tratamento de erro: Página 404 customizada para produtos não encontrados

- **`/account`** - Área do usuário
  - Renderização: CSR
  - Funcionalidade: Visualização e edição de perfil do usuário logado
  - Protegida por autenticação
  - Componentes: `ProfileDisplay` (lazy loaded), `ProfileForm` (lazy loaded)
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
- **Header** - Cabeçalho global com navegação e informações do usuário
- **LoadingSpinner** - Spinner de carregamento acessível com diferentes tamanhos
- **ErrorMessage** - Exibição de mensagens de erro com roles ARIA apropriados
- **PageHeader** - Cabeçalho reutilizável para páginas
- **BackButton** - Botão de navegação de retorno
- **ProtectedRoute** - Componente para proteger rotas que requerem autenticação

### Componentes de Catálogo (`src/features/catalog/components/`)

- **CatalogCard** - Card individual de produto no grid
- **CatalogGrid** - Grid responsivo de produtos
- **ItemHeader** - Cabeçalho da página de detalhes do produto
- **ItemImage** - Imagem principal do produto (otimizada)
- **ItemDescription** - Descrição detalhada e informações adicionais

### Componentes de Usuário (`src/features/user/components/`)

- **LoginForm** - Formulário de login simulado com seleção de usuário e campo de senha
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

O relatório de cobertura será gerado na pasta `coverage/`. Você pode abrir `coverage/index.html` no navegador para ver o relatório visual.

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

- **Skip Links**: Link para pular para o conteúdo principal, visível ao navegar com teclado
- **Navegação por Teclado**: Todos os elementos interativos são acessíveis via teclado
- **ARIA Labels**: Atributos ARIA apropriados em componentes interativos (botões, links, formulários)
- **Estados de Foco**: Indicadores visuais claros para elementos focados
- **Mensagens de Erro**: Feedback acessível com `role="alert"` e `aria-live`
- **Estados de Carregamento**: Feedback textual acessível durante operações
- **Semântica HTML**: Uso adequado de elementos semânticos (nav, main, article, section)
- **Formulários**: Labels associados, campos obrigatórios marcados, validação acessível
- **Header Global**: Navegação principal com aria-label apropriado

### Exemplos de Implementação

- SkipLink permite pular navegação e ir direto ao conteúdo principal
- Todos os botões e links têm estados de foco visíveis
- Formulários têm labels associados e mensagens de erro acessíveis
- Componentes de carregamento usam `aria-live` para anunciar mudanças
- Imagens têm textos alternativos descritivos

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
