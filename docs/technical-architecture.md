
# SWCI - Arquitetura Técnica Detalhada

## Visão Geral da Arquitetura

O SWCI (Sistema Web de Controle Interno) foi desenvolvido seguindo uma arquitetura moderna de Single Page Application (SPA) com backend serverless, utilizando as melhores práticas de desenvolvimento web.

## Stack Tecnológico Completo

### Frontend (React + TypeScript)

#### Core Framework
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "^5.x",
  "@vitejs/plugin-react-swc": "latest"
}
```

#### Build Tools & Development
```json
{
  "vite": "latest",
  "eslint": "latest",
  "postcss": "latest",
  "tailwindcss": "latest"
}
```

#### UI & Styling
```json
{
  "tailwindcss": "latest",
  "tailwindcss-animate": "^1.0.7",
  "tailwind-merge": "^2.5.2",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1"
}
```

#### Componentes UI (shadcn/ui + Radix UI)
```json
{
  "@radix-ui/react-accordion": "^1.2.0",
  "@radix-ui/react-alert-dialog": "^1.1.1",
  "@radix-ui/react-avatar": "^1.1.0",
  "@radix-ui/react-button": "^1.1.0",
  "@radix-ui/react-calendar": "^1.1.0",
  "@radix-ui/react-card": "^1.1.0",
  "@radix-ui/react-checkbox": "^1.1.1",
  "@radix-ui/react-dialog": "^1.1.1",
  "@radix-ui/react-dropdown-menu": "^2.1.1",
  "@radix-ui/react-form": "^0.1.0",
  "@radix-ui/react-input": "^1.1.0",
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-popover": "^1.1.1",
  "@radix-ui/react-select": "^2.1.1",
  "@radix-ui/react-separator": "^1.1.0",
  "@radix-ui/react-sheet": "^1.1.0",
  "@radix-ui/react-switch": "^1.1.0",
  "@radix-ui/react-table": "^1.1.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "@radix-ui/react-textarea": "^1.1.0",
  "@radix-ui/react-toast": "^1.2.1",
  "@radix-ui/react-tooltip": "^1.1.2"
}
```

#### Estado e Data Fetching
```json
{
  "@tanstack/react-query": "^5.56.2"
}
```

#### Formulários e Validação
```json
{
  "react-hook-form": "^7.53.0",
  "@hookform/resolvers": "^3.9.0",
  "zod": "^3.23.8"
}
```

#### Roteamento
```json
{
  "react-router-dom": "^6.26.2"
}
```

#### Utilitários e Helpers
```json
{
  "date-fns": "^3.6.0",
  "lucide-react": "^0.451.0",
  "axios": "^1.7.7",
  "react-input-mask": "^3.0.0-alpha.2"
}
```

#### Gráficos e Visualização
```json
{
  "recharts": "^2.12.7"
}
```

#### Notificações
```json
{
  "sonner": "^1.5.0"
}
```

### Backend (Supabase)

#### Database
- **PostgreSQL 15+**
  - ACID compliance
  - Row Level Security (RLS)
  - Triggers e Functions
  - Extensões habilitadas
  - Backup automático

#### Authentication
- **Supabase Auth**
  - JWT tokens
  - Email/Password authentication
  - Session management
  - Password recovery
  - User roles

#### API Layer
- **Supabase Client**
  - Auto-generated REST APIs
  - Real-time subscriptions
  - File storage
  - Edge Functions

#### Edge Functions (Runtime: Deno)
```typescript
// Localização: supabase/functions/
- create-user/     # Criação de usuários
- delete-user/     # Exclusão de usuários
```

## Estrutura de Diretórios Detalhada

```
swci/
├── public/                          # Assets estáticos
│   ├── favicon.ico
│   ├── og-image.svg
│   └── placeholder.svg
│
├── src/                            # Código fonte principal
│   ├── components/                 # Componentes React
│   │   ├── ui/                    # Componentes base (shadcn/ui)
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── forms/                 # Componentes de formulário
│   │   │   ├── AddressSection.tsx
│   │   │   ├── BankingInfoSection.tsx
│   │   │   ├── CompanyInfoSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── FormHeader.tsx
│   │   │   ├── LegalRepresentativeSection.tsx
│   │   │   └── PersonalInfoSection.tsx
│   │   │
│   │   ├── lists/                 # Componentes de listagem
│   │   │   └── PersonList.tsx
│   │   │
│   │   ├── dashboard/             # Componentes do dashboard
│   │   │   ├── ContractCalendar.tsx
│   │   │   ├── ContractStatusCard.tsx
│   │   │   ├── ContractSummaryCards.tsx
│   │   │   ├── ContractTypeAnalysis.tsx
│   │   │   ├── ContractValueChart.tsx
│   │   │   ├── ServicesAnalysis.tsx
│   │   │   └── SuppliesAnalysis.tsx
│   │   │
│   │   ├── contract/              # Componentes específicos de contratos
│   │   │   ├── AdditionalInfo.tsx
│   │   │   ├── BudgetClassification.tsx
│   │   │   ├── ContractDetails.tsx
│   │   │   ├── ContractIdentification.tsx
│   │   │   ├── ContractViewModal.tsx
│   │   │   ├── ContractorInfo.tsx
│   │   │   ├── PaymentInfo.tsx
│   │   │   ├── PenaltiesInfo.tsx
│   │   │   └── TemplateEditor.tsx
│   │   │
│   │   ├── common/                # Componentes comuns
│   │   │   ├── EmptyState.tsx
│   │   │   └── ErrorDisplay.tsx
│   │   │
│   │   ├── Navigation.tsx         # Navegação lateral
│   │   ├── Header.tsx            # Cabeçalho
│   │   ├── ProtectedRoute.tsx    # Proteção de rotas
│   │   ├── ContractForm.tsx      # Formulário de contrato
│   │   ├── LegalPersonForm.tsx   # Formulário pessoa jurídica
│   │   ├── PhysicalPersonForm.tsx # Formulário pessoa física
│   │   ├── DocumentUpload.tsx    # Upload de documentos
│   │   └── AuthLogsViewer.tsx    # Visualizador de logs
│   │
│   ├── pages/                     # Páginas da aplicação
│   │   ├── Index.tsx             # Página inicial
│   │   ├── Login.tsx             # Login
│   │   ├── Dashboard.tsx         # Dashboard principal
│   │   ├── ContractList.tsx      # Lista de contratos
│   │   ├── ContractRegistration.tsx # Cadastro de contrato
│   │   ├── ContractAlerts.tsx    # Alertas de contratos
│   │   ├── ContractTemplate.tsx  # Templates de contrato
│   │   ├── PhysicalPersonList.tsx # Lista pessoas físicas
│   │   ├── PhysicalPersonDetails.tsx # Detalhes pessoa física
│   │   ├── PhysicalPersonRegistration.tsx # Cadastro pessoa física
│   │   ├── LegalPersonList.tsx   # Lista pessoas jurídicas
│   │   ├── LegalPersonDetails.tsx # Detalhes pessoa jurídica
│   │   ├── LegalPersonRegistration.tsx # Cadastro pessoa jurídica
│   │   ├── UserManagement.tsx    # Gerenciamento de usuários
│   │   ├── UserPermissions.tsx   # Permissões de usuário
│   │   ├── AdminUserCreation.tsx # Criação de usuários admin
│   │   ├── Documentation.tsx     # Documentação
│   │   ├── Support.tsx           # Suporte
│   │   ├── UseCases.tsx          # Casos de uso
│   │   ├── UseCaseDiagram.tsx    # Diagrama casos de uso
│   │   ├── UseCaseActors.tsx     # Atores casos de uso
│   │   └── ClassDiagram.tsx      # Diagrama de classes
│   │
│   ├── hooks/                     # Custom hooks
│   │   ├── useAuth.tsx           # Hook de autenticação
│   │   ├── useDocumentUpload.tsx # Hook upload documentos
│   │   ├── useViaCep.tsx         # Hook integração ViaCEP
│   │   └── use-toast.ts          # Hook de toast
│   │
│   ├── services/                  # Camada de serviços
│   │   ├── api.ts                # Cliente API base
│   │   ├── auth.ts               # Serviços de autenticação
│   │   ├── contracts.ts          # Serviços de contratos
│   │   ├── contractAlerts.ts     # Serviços de alertas
│   │   ├── physicalPersons.ts    # Serviços pessoas físicas
│   │   ├── legalPersons.ts       # Serviços pessoas jurídicas
│   │   ├── users.ts              # Serviços de usuários
│   │   ├── authLogs.ts           # Logs de autenticação
│   │   ├── company.ts            # Serviços de empresa
│   │   ├── documentUpload.ts     # Upload de documentos
│   │   ├── viaCep.ts             # Integração ViaCEP
│   │   └── types.ts              # Tipos TypeScript
│   │
│   ├── integrations/              # Integrações externas
│   │   └── supabase/             # Integração Supabase
│   │       ├── client.ts         # Cliente Supabase
│   │       └── types.ts          # Tipos gerados
│   │
│   ├── utils/                     # Utilitários
│   │   ├── contractUtils.ts      # Utilitários de contrato
│   │   └── documentValidation.ts # Validação de documentos
│   │
│   ├── lib/                       # Configurações de bibliotecas
│   │   └── utils.ts              # Utilitários gerais
│   │
│   ├── App.tsx                    # Componente raiz da aplicação
│   ├── main.tsx                   # Ponto de entrada
│   ├── index.css                  # Estilos globais
│   ├── App.css                    # Estilos do App
│   └── vite-env.d.ts             # Declarações de tipos Vite
│
├── supabase/                      # Configuração Supabase
│   ├── functions/                 # Edge Functions
│   │   ├── _shared/              # Código compartilhado
│   │   │   └── cors.ts           # Configuração CORS
│   │   ├── create-user/          # Função criar usuário
│   │   │   └── index.ts
│   │   └── delete-user/          # Função deletar usuário
│   │       └── index.ts
│   ├── migrations/               # Migrations do banco
│   └── config.toml               # Configuração do projeto
│
├── docs/                          # Documentação
│   ├── tcc-documentation.md      # Documentação do TCC
│   ├── technical-architecture.md # Arquitetura técnica
│   └── system-documentation.md   # Documentação do sistema
│
├── package.json                   # Dependências e scripts
├── package-lock.json             # Lock de dependências
├── tsconfig.json                 # Configuração TypeScript
├── tsconfig.app.json             # Config TypeScript para app
├── tsconfig.node.json            # Config TypeScript para Node
├── vite.config.ts                # Configuração Vite
├── tailwind.config.ts            # Configuração Tailwind
├── postcss.config.js             # Configuração PostCSS
├── eslint.config.js              # Configuração ESLint
├── components.json               # Configuração shadcn/ui
└── README.md                     # Documentação básica
```

## Padrões de Desenvolvimento

### 1. Component-Driven Development
Todos os componentes seguem o padrão de desenvolvimento orientado a componentes:
- Componentes pequenos e focados
- Props tipadas com TypeScript
- Composição sobre herança
- Reutilização máxima

### 2. Custom Hooks
Lógica complexa encapsulada em hooks personalizados:
- `useAuth`: Gerenciamento de autenticação
- `useDocumentUpload`: Upload de documentos
- `useViaCep`: Integração com API de CEP

### 3. Service Layer
Abstração das chamadas de API em serviços dedicados:
- Centralização da lógica de API
- Tratamento de erros padronizado
- Types seguros para requests/responses

### 4. Type-First Development
TypeScript utilizado em toda a aplicação:
- Interfaces bem definidas
- Type safety em tempo de compilação
- IntelliSense aprimorado
- Refatoração segura

## Fluxo de Dados

### 1. Estado Global
```typescript
// Gerenciado via Tanstack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### 2. Estado Local
```typescript
// React hooks para estado de componente
const [formData, setFormData] = useState(initialData);
const [isLoading, setIsLoading] = useState(false);
```

### 3. Cache Strategy
```typescript
// Cache inteligente com Tanstack Query
const { data, isLoading, error } = useQuery({
  queryKey: ['contracts'],
  queryFn: fetchContracts,
  staleTime: 5 * 60 * 1000, // 5 minutos
});
```

## Segurança Implementada

### 1. Autenticação
- JWT tokens com expiração automática
- Refresh tokens transparentes
- Logout automático em caso de token inválido

### 2. Autorização
- Role-Based Access Control (RBAC)
- Proteção de rotas baseada em permissões
- Validação de acesso em nível de componente

### 3. Validação de Dados
- Validação client-side com Zod
- Sanitização de inputs
- Validação de documentos (CPF/CNPJ)

### 4. Row Level Security (RLS)
```sql
-- Exemplo de policy
CREATE POLICY "Users can only see their own data"
ON contracts FOR SELECT
USING (auth.uid() = created_by);
```

## Performance e Otimização

### 1. Build Optimizations
- Tree shaking automático (Vite)
- Code splitting por rota
- Minificação de assets
- Compressão gzip

### 2. Runtime Optimizations
- Lazy loading de componentes
- Memoização com React.memo
- Virtual scrolling para listas grandes
- Debounce em campos de busca

### 3. Network Optimizations
- Cache HTTP inteligente
- Compressão de requests
- Batch de requisições similares
- Retry automático com backoff

## Monitoramento e Logs

### 1. Error Tracking
```typescript
// Console logs estratégicos
console.log('Contract created successfully:', contractId);
console.error('Failed to create contract:', error);
```

### 2. Performance Monitoring
- Métricas de carregamento de página
- Tempo de resposta de APIs
- Usage analytics

### 3. User Activity Logs
- Logs de autenticação
- Auditoria de ações críticas
- Tracking de uso de funcionalidades

## Testes e Qualidade

### 1. Type Checking
- TypeScript strict mode habilitado
- Cobertura de tipos em 100%
- Validação em tempo de build

### 2. Code Quality
- ESLint com regras rigorosas
- Prettier para formatação consistente
- Git hooks para validação pre-commit

### 3. Validação de Formulários
- Validação em tempo real
- Mensagens de erro específicas
- Feedback visual imediato

## Deploy e CI/CD

### 1. Frontend Deploy
- Deploy automático via Lovable
- Build otimizado para produção
- CDN para assets estáticos

### 2. Backend Deploy
- Supabase hosting
- Edge Functions automáticas
- Migrations automáticas

### 3. Monitoring
- Uptime monitoring
- Error rate tracking
- Performance metrics

## Considerações Futuras

### 1. Tecnologias não Implementadas
- **WebSockets**: Não implementados (comunicação em tempo real limitada)
- **Service Workers**: PWA não configurado
- **Web Push**: Notificações push não implementadas
- **WebRTC**: Comunicação peer-to-peer não utilizada

### 2. Potenciais Melhorias
- Implementação de WebSockets para real-time
- PWA com offline support
- Micro frontends architecture
- GraphQL como alternativa ao REST
- Server-side rendering (SSR)

Esta arquitetura proporciona uma base sólida, escalável e maintível para o SWCI, seguindo as melhores práticas de desenvolvimento web moderno.
