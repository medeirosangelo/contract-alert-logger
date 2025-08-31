
# SWCI - Estrutura Detalhada do Projeto

## Visão Geral
Este documento detalha a estrutura completa do projeto SWCI, explicando a organização de arquivos, pastas e a responsabilidade de cada componente.

## Estrutura de Pastas Principal

```
swci/
├── 📁 public/                    # Assets estáticos servidos diretamente
├── 📁 src/                      # Código fonte da aplicação
├── 📁 supabase/                 # Configurações e funções do Supabase
├── 📁 docs/                     # Documentação do projeto
├── 📄 Arquivos de configuração  # Config files na raiz
└── 📄 README.md                 # Documentação principal
```

## Detalhamento de Cada Pasta

### 📁 public/ - Assets Estáticos
```
public/
├── favicon.ico                  # Ícone do site
├── og-image.svg                # Imagem para compartilhamento
├── placeholder.svg             # Placeholder genérico
└── lovable-uploads/            # Uploads gerenciados pelo Lovable
    └── *.png                   # Imagens carregadas
```

**Responsabilidade**: Arquivos servidos diretamente pelo servidor web sem processamento.

### 📁 src/ - Código Fonte Principal

#### 📁 src/components/ - Componentes React

##### 📁 src/components/ui/ - Componentes Base (shadcn/ui)
```
ui/
├── accordion.tsx               # Componente accordion expansivel
├── alert-dialog.tsx           # Dialogo de alerta modal
├── alert.tsx                  # Componente de alerta inline
├── aspect-ratio.tsx           # Container com proporção fixa
├── avatar.tsx                 # Avatar de usuario
├── badge.tsx                  # Badge/etiqueta
├── breadcrumb.tsx             # Navegação breadcrumb
├── button.tsx                 # Botão base
├── calendar.tsx               # Seletor de data
├── card.tsx                   # Container card
├── carousel.tsx               # Carrossel de imagens
├── chart.tsx                  # Componentes de gráfico
├── checkbox.tsx               # Checkbox input
├── collapsible.tsx            # Container colapsavel
├── command.tsx                # Command palette
├── context-menu.tsx           # Menu contextual
├── dialog.tsx                 # Modal dialog
├── drawer.tsx                 # Drawer lateral
├── dropdown-menu.tsx          # Menu dropdown
├── form.tsx                   # Componentes de formulário
├── hover-card.tsx             # Card no hover
├── input-otp.tsx              # Input para OTP/2FA
├── input.tsx                  # Input de texto base
├── label.tsx                  # Label para inputs
├── masked-input.tsx           # Input com máscara
├── menubar.tsx                # Barra de menu
├── navigation-menu.tsx        # Menu de navegação
├── pagination.tsx             # Componente de paginação
├── popover.tsx                # Popover flutuante
├── progress.tsx               # Barra de progresso
├── radio-group.tsx            # Grupo de radio buttons
├── resizable.tsx              # Containers redimensionáveis
├── scroll-area.tsx            # Área com scroll customizado
├── select.tsx                 # Select dropdown
├── separator.tsx              # Separador visual
├── sheet.tsx                  # Painel lateral
├── skeleton.tsx               # Loading skeleton
├── slider.tsx                 # Slider/range input
├── sonner.tsx                 # Toast notification
├── switch.tsx                 # Switch toggle
├── table.tsx                  # Tabela base
├── tabs.tsx                   # Componente de abas
├── textarea.tsx               # Textarea multiline
├── toast-wrapper.tsx          # Wrapper para toasts
├── toast.tsx                  # Toast notification
├── toaster.tsx                # Container de toasts
├── toggle-group.tsx           # Grupo de toggles
├── toggle.tsx                 # Toggle button
├── tooltip.tsx                # Tooltip
└── use-toast.ts               # Hook para toasts
```

**Responsabilidade**: Componentes de interface básicos, reutilizáveis em toda aplicação. Baseados em Radix UI com estilização Tailwind.

##### 📁 src/components/forms/ - Componentes de Formulário
```
forms/
├── AddressSection.tsx          # Seção de endereço
├── BankingInfoSection.tsx      # Informações bancárias
├── CompanyInfoSection.tsx      # Informações da empresa
├── ContactSection.tsx          # Informações de contato
├── FormHeader.tsx              # Cabeçalho de formulário
├── LegalRepresentativeSection.tsx # Representante legal
└── PersonalInfoSection.tsx     # Informações pessoais
```

**Responsabilidade**: Seções reutilizáveis de formulários complexos, com validação e formatação específicas.

##### 📁 src/components/lists/ - Componentes de Listagem
```
lists/
└── PersonList.tsx              # Lista genérica de pessoas
```

**Responsabilidade**: Componentes para exibição de listas com filtros, paginação e ações.

##### 📁 src/components/dashboard/ - Componentes do Dashboard
```
dashboard/
├── ContractCalendar.tsx        # Calendário de contratos
├── ContractStatusCard.tsx      # Card de status
├── ContractSummaryCards.tsx    # Cards de resumo
├── ContractTypeAnalysis.tsx    # Análise por tipo
├── ContractValueChart.tsx      # Gráfico de valores
├── ServicesAnalysis.tsx        # Análise de serviços
└── SuppliesAnalysis.tsx        # Análise de suprimentos
```

**Responsabilidade**: Componentes específicos para visualização de dados no dashboard principal.

##### 📁 src/components/contract/ - Componentes de Contrato
```
contract/
├── AdditionalInfo.tsx          # Informações adicionais
├── BudgetClassification.tsx    # Classificação orçamentária
├── ContractDetails.tsx         # Detalhes do contrato
├── ContractIdentification.tsx  # Identificação do contrato
├── ContractViewModal.tsx       # Modal de visualização
├── ContractorInfo.tsx          # Info do contratante
├── PaymentInfo.tsx             # Informações de pagamento
├── PenaltiesInfo.tsx           # Informações de penalidades
└── TemplateEditor.tsx          # Editor de templates
```

**Responsabilidade**: Componentes específicos para gestão e visualização de contratos.

##### 📁 src/components/common/ - Componentes Comuns
```
common/
├── EmptyState.tsx              # Estado vazio
└── ErrorDisplay.tsx            # Exibição de erros
```

**Responsabilidade**: Componentes utilitários usados em múltiplas partes da aplicação.

##### Componentes de Nível Superior
```
components/
├── Navigation.tsx              # Navegação lateral principal
├── Header.tsx                  # Cabeçalho da aplicação
├── ProtectedRoute.tsx          # HOC para proteção de rotas
├── ContractForm.tsx            # Formulário completo de contrato
├── LegalPersonForm.tsx         # Formulário pessoa jurídica
├── PhysicalPersonForm.tsx      # Formulário pessoa física
├── DocumentUpload.tsx          # Componente de upload
└── AuthLogsViewer.tsx          # Visualizador de logs
```

#### 📁 src/pages/ - Páginas da Aplicação
```
pages/
├── Index.tsx                   # Página inicial (Dashboard)
├── Login.tsx                   # Página de login
├── Dashboard.tsx               # Dashboard principal
├── ContractList.tsx            # Lista de contratos
├── ContractRegistration.tsx    # Cadastro de contrato
├── ContractAlerts.tsx          # Alertas de contratos
├── ContractTemplate.tsx        # Templates de contrato
├── PhysicalPersonList.tsx      # Lista pessoas físicas
├── PhysicalPersonDetails.tsx   # Detalhes pessoa física
├── PhysicalPersonRegistration.tsx # Cadastro pessoa física
├── LegalPersonList.tsx         # Lista pessoas jurídicas
├── LegalPersonDetails.tsx      # Detalhes pessoa jurídica
├── LegalPersonRegistration.tsx # Cadastro pessoa jurídica
├── UserManagement.tsx          # Gerenciamento usuários
├── UserPermissions.tsx         # Permissões de usuário
├── AdminUserCreation.tsx       # Criação usuários admin
├── Documentation.tsx           # Documentação do sistema
├── Support.tsx                 # Página de suporte
├── UseCases.tsx                # Casos de uso UML
├── UseCaseDiagram.tsx          # Diagrama casos de uso
├── UseCaseActors.tsx           # Atores casos de uso
└── ClassDiagram.tsx            # Diagrama de classes
```

**Responsabilidade**: Páginas completas da aplicação, cada uma representando uma rota específica.

#### 📁 src/hooks/ - Custom Hooks
```
hooks/
├── useAuth.tsx                 # Autenticação e autorização
├── useDocumentUpload.tsx       # Upload de documentos
├── useViaCep.tsx               # Integração API ViaCEP
└── use-toast.ts                # Sistema de notificações
```

**Responsabilidade**: Lógica reutilizável encapsulada em hooks personalizados.

#### 📁 src/services/ - Camada de Serviços
```
services/
├── api.ts                      # Cliente HTTP base (Axios)
├── auth.ts                     # Serviços de autenticação
├── contracts.ts                # API de contratos
├── contractAlerts.ts           # API de alertas
├── physicalPersons.ts          # API pessoas físicas
├── legalPersons.ts             # API pessoas jurídicas
├── users.ts                    # API de usuários
├── authLogs.ts                 # Logs de autenticação
├── company.ts                  # API da empresa
├── documentUpload.ts           # Serviços de upload
├── viaCep.ts                   # Integração ViaCEP
└── types.ts                    # Tipos TypeScript compartilhados
```

**Responsabilidade**: Abstração das chamadas de API e lógica de negócio relacionada a dados.

#### 📁 src/integrations/ - Integrações Externas
```
integrations/
└── supabase/
    ├── client.ts               # Cliente Supabase configurado
    └── types.ts                # Tipos gerados pelo Supabase
```

**Responsabilidade**: Configuração e tipos para integrações com serviços externos.

#### 📁 src/utils/ - Utilitários
```
utils/
├── contractUtils.ts            # Utilitários para contratos
└── documentValidation.ts       # Validação de documentos (CPF/CNPJ)
```

**Responsabilidade**: Funções utilitárias e helpers gerais.

#### 📁 src/lib/ - Configurações de Bibliotecas
```
lib/
└── utils.ts                    # Utilitários gerais (cn, formatters, etc)
```

**Responsabilidade**: Configurações e utilitários para bibliotecas externas.

#### Arquivos Principais do src/
```
src/
├── App.tsx                     # Componente raiz da aplicação
├── main.tsx                    # Ponto de entrada (ReactDOM.render)
├── index.css                   # Estilos globais + Tailwind
├── App.css                     # Estilos específicos do App
└── vite-env.d.ts               # Declarações TypeScript para Vite
```

### 📁 supabase/ - Backend Configuration

#### 📁 supabase/functions/ - Edge Functions
```
functions/
├── _shared/
│   └── cors.ts                 # Configuração CORS compartilhada
├── create-user/
│   └── index.ts                # Função para criar usuários
└── delete-user/
    └── index.ts                # Função para deletar usuários
```

**Responsabilidade**: Funções serverless executadas no edge do Supabase.

#### 📁 supabase/migrations/ - Migrations do Banco
```
migrations/
├── 20250830164437_*.sql        # Migration inicial do schema
├── 20250830164527_*.sql        # Migration de RLS e dados
└── 20250830164633_*.sql        # Migration de usuários e triggers
```

**Responsabilidade**: Versionamento e evolução do schema do banco de dados.

#### Configuração Supabase
```
supabase/
└── config.toml                 # Configuração do projeto Supabase
```

### 📁 docs/ - Documentação
```
docs/
├── tcc-documentation.md        # Documentação completa do TCC
├── technical-architecture.md   # Arquitetura técnica detalhada
├── system-documentation.md     # Documentação do sistema
└── project-structure.md        # Este arquivo
```

**Responsabilidade**: Documentação técnica e acadêmica do projeto.

## Arquivos de Configuração na Raiz

```
📄 package.json                 # Dependências e scripts NPM
📄 package-lock.json           # Lock de versões das dependências
📄 tsconfig.json               # Configuração principal TypeScript
📄 tsconfig.app.json           # Config TypeScript para aplicação
📄 tsconfig.node.json          # Config TypeScript para Node.js
📄 vite.config.ts              # Configuração do Vite (bundler)
📄 tailwind.config.ts          # Configuração do Tailwind CSS
📄 postcss.config.js           # Configuração do PostCSS
📄 eslint.config.js            # Configuração do ESLint (linting)
📄 components.json             # Configuração do shadcn/ui
📄 README.md                   # Documentação básica do projeto
📄 .gitignore                  # Arquivos ignorados pelo Git
📄 bun.lockb                   # Lock file alternativo (Bun)
```

## Fluxo de Dados na Aplicação

### 1. Entrada do Usuário
```
User Input → Page Component → Form Component → Hook → Service → API
```

### 2. Resposta da API
```
API Response → Service → Hook → Component State → UI Update
```

### 3. Gerenciamento de Estado
```
Tanstack Query (Server State) + React State (UI State)
```

## Convenções de Nomenclatura

### Arquivos e Componentes
- **Componentes React**: PascalCase (`ContractForm.tsx`)
- **Hooks**: camelCase com prefixo "use" (`useAuth.tsx`)
- **Serviços**: camelCase (`contracts.ts`)
- **Utilitários**: camelCase (`contractUtils.ts`)
- **Páginas**: PascalCase (`ContractList.tsx`)

### Variáveis e Funções
- **Variáveis**: camelCase (`contractData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Funções**: camelCase (`fetchContracts`)
- **Tipos TypeScript**: PascalCase (`ContractData`)

### CSS Classes
- **Tailwind**: kebab-case (`bg-primary-500`)
- **Custom CSS**: kebab-case (`contract-form`)

## Padrões de Importação

### Ordem de Imports
```typescript
// 1. React e bibliotecas externas
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Componentes UI
import { Button } from '@/components/ui/button';

// 3. Componentes internos
import ContractForm from '@/components/ContractForm';

// 4. Hooks
import { useAuth } from '@/hooks/useAuth';

// 5. Serviços
import { fetchContracts } from '@/services/contracts';

// 6. Utilitários
import { cn } from '@/lib/utils';

// 7. Tipos
import type { Contract } from '@/services/types';
```

## Responsabilidades por Camada

### 🎨 Presentation Layer (Components/Pages)
- Renderização da interface
- Interação com usuário
- Binding de dados
- Navegação

### 🔧 Business Logic Layer (Hooks/Services)
- Regras de negócio
- Transformação de dados
- Cache e estado
- Validações

### 🗄️ Data Layer (Services/API)
- Comunicação com backend
- Serialização/Deserialização
- Tratamento de erros de rede
- Retry logic

### 🛠️ Utility Layer (Utils/Lib)
- Funções puras
- Formatação
- Validações genéricas
- Helpers

## Considerações de Performance

### Code Splitting
- Lazy loading de páginas
- Dynamic imports para componentes pesados
- Separação por rotas

### Bundle Optimization
- Tree shaking automático
- Minificação de assets
- Compressão gzip
- Cache estratégico

### Runtime Performance
- Memoização de componentes caros
- Virtual scrolling para listas grandes
- Debounce em buscas
- Lazy loading de imagens

Esta estrutura garante escalabilidade, manutenibilidade e facilita a colaboração entre desenvolvedores, seguindo as melhores práticas do ecossistema React/TypeScript moderno.
