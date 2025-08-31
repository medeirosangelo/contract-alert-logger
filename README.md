
# SWCI - Sistema Web de Controle Interno

## 🎯 Visão Geral
O SWCI é um sistema web moderno desenvolvido para gerenciar contratos, pessoas físicas e jurídicas, com funcionalidades avançadas de alertas, dashboard analítico e geração de documentos. Desenvolvido como trabalho de conclusão de curso (TCC) no Instituto Federal de Roraima (IFRR).

## ✨ Principais Funcionalidades

### 📊 Dashboard Analítico
- **Visão Geral Estatística**: Cards com métricas importantes
  - Total de contratos ativos
  - Valor total dos contratos
  - Contratos próximos ao vencimento
  - Valor médio por contrato
- **Gráficos Interativos**: Visualização de dados com Recharts
  - Análise de contratos por status
  - Projeção de gastos contratuais
  - Distribuição por tipo de contrato
- **Filtros Dinâmicos**: Análise por período personalizado

### 📋 Gestão Completa de Contratos
- **Cadastro Avançado**: Formulário completo com validação em tempo real
- **Listagem Inteligente**: Tabela com filtros, busca e paginação
- **Visualização Detalhada**: Modal com todas as informações do contrato
- **Geração de Documentos**: Templates personalizáveis com geração de PDF
- **Status Tracking**: Acompanhamento do ciclo de vida dos contratos
- **Renovação Automatizada**: Processo simplificado de renovação

### 🚨 Sistema de Alertas Inteligente
- **Monitoramento Automático**: Verificação contínua de vencimentos
- **Classificação Visual por Cores**:
  - 🟢 **Verde**: Contratos com mais de 120 dias para vencer (seguro)
  - 🟡 **Laranja**: Contratos com até 60 dias para vencer (atenção)
  - 🔴 **Vermelho**: Contratos com 30 dias ou menos (crítico)
- **Ações Rápidas**: Renovação ou finalização direta do painel de alertas
- **Dashboard Dedicado**: Visão centralizada de todos os alertas

### 👥 Gestão de Pessoas

#### 👤 Pessoas Físicas
- **Cadastro Completo**: Informações pessoais, contato e endereço
- **Validação Automática**: CPF validado automaticamente
- **Integração ViaCEP**: Preenchimento automático de endereço
- **Histórico de Contratos**: Visualização de todos os contratos relacionados
- **Busca Avançada**: Filtros por nome, CPF e função

#### 🏢 Pessoas Jurídicas
- **Informações Empresariais**: Razão social, nome fantasia, CNPJ
- **Dados do Representante Legal**: Informações completas do responsável
- **Informações Bancárias**: Dados para pagamentos
- **Validação de CNPJ**: Verificação automática de validade
- **Prevenção de Duplicatas**: Sistema impede cadastros duplicados

### 🔐 Sistema de Autenticação e Autorização
- **Login Seguro**: Autenticação via email/senha com Supabase Auth
- **Controle de Acesso Baseado em Papéis (RBAC)**:
  - **👑 Admin**: Acesso total ao sistema
  - **🔧 Gestor**: Gerenciamento de contratos e pessoas
  - **👀 Colaborador**: Visualização de dados
- **Proteção de Rotas**: Middleware de autenticação em todas as rotas protegidas
- **Sessões Seguras**: JWT tokens com refresh automático
- **Recuperação de Senha**: Sistema de reset via email

### 📄 Sistema de Templates e Documentos
- **Editor de Templates**: Interface para criação/edição de modelos
- **Modelos Predefinidos**: Templates prontos para diferentes tipos de contrato
- **Geração Automática**: Preenchimento de documentos com dados do sistema
- **Export PDF**: Geração de contratos em formato PDF
- **Versionamento**: Controle de versões dos templates

## 🛠️ Stack Tecnológico

### Frontend
```json
{
  "framework": "React 18.3.1 + TypeScript",
  "bundler": "Vite (build tool moderna)",
  "styling": "Tailwind CSS 3.x (utility-first)",
  "components": "shadcn/ui + Radix UI (acessibilidade)",
  "state": "Tanstack Query 5.x (server state)",
  "routing": "React Router DOM 6.x",
  "forms": "React Hook Form + Zod (validação)",
  "charts": "Recharts 2.x (gráficos interativos)",
  "icons": "Lucide React (ícones SVG)",
  "notifications": "Sonner (toast system)",
  "dates": "date-fns 3.x (manipulação de datas)",
  "http": "Axios 1.x (cliente HTTP)"
}
```

### Backend
```json
{
  "baas": "Supabase (Backend-as-a-Service)",
  "database": "PostgreSQL (banco relacional)",
  "auth": "Supabase Auth (JWT tokens)",
  "storage": "Supabase Storage (arquivos)",
  "realtime": "Supabase Realtime (atualizações)",
  "functions": "Supabase Edge Functions (Deno runtime)",
  "security": "Row Level Security (RLS)"
}
```

### Desenvolvimento
```json
{
  "language": "TypeScript 5.x (tipagem estática)",
  "linting": "ESLint (qualidade de código)",
  "formatting": "Prettier (formatação)",
  "css": "PostCSS (processamento)",
  "git": "Git + GitHub (versionamento)"
}
```

## 📁 Estrutura do Projeto

```
swci/
├── 📁 src/                      # Código fonte
│   ├── 📁 components/           # Componentes React
│   │   ├── 📁 ui/              # Componentes base (shadcn/ui)
│   │   ├── 📁 forms/           # Seções de formulário
│   │   ├── 📁 dashboard/       # Componentes do dashboard
│   │   ├── 📁 contract/        # Componentes de contrato
│   │   └── 📁 common/          # Componentes reutilizáveis
│   ├── 📁 pages/               # Páginas da aplicação
│   ├── 📁 hooks/               # Custom hooks
│   ├── 📁 services/            # Camada de API
│   ├── 📁 utils/               # Utilitários gerais
│   └── 📁 integrations/        # Integrações externas
├── 📁 supabase/                # Configuração backend
│   ├── 📁 functions/           # Edge Functions
│   └── 📁 migrations/          # Migrations do banco
├── 📁 docs/                    # Documentação técnica
└── 📄 Arquivos de config       # Configurações do projeto
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase (para backend)

### Passos para Execução

1. **Clone o repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd swci
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure as variáveis do Supabase
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

4. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
```
http://localhost:8080
```

## 🗄️ Banco de Dados

### Schema Principal
```sql
-- Principais tabelas
users                    # Usuários do sistema
user_roles              # Papéis e permissões
physical_persons        # Pessoas físicas
legal_persons           # Pessoas jurídicas  
contracts               # Contratos
contract_alerts         # Alertas de vencimento
```

### Recursos Implementados
- ✅ **Row Level Security (RLS)**: Segurança em nível de linha
- ✅ **Triggers Automáticos**: Atualizações automáticas de timestamps
- ✅ **Políticas de Acesso**: Controle granular de permissões
- ✅ **Índices Otimizados**: Performance em consultas
- ✅ **Constraints**: Integridade referencial garantida
- ✅ **Functions**: Lógica complexa no banco

## 🔐 Segurança Implementada

### Autenticação
- 🔒 **JWT Tokens**: Autenticação stateless segura
- 🔄 **Refresh Automático**: Renovação transparente de tokens
- 🛡️ **Proteção de Rotas**: Middleware em todas as rotas protegidas
- 🔑 **Recuperação de Senha**: Sistema seguro de reset

### Autorização  
- 👥 **RBAC**: Controle baseado em papéis (Admin, Gestor, Colaborador)
- 🔒 **RLS**: Row Level Security no PostgreSQL
- ✅ **Validação de Permissões**: Verificação em cada operação
- 📋 **Políticas Granulares**: Controle específico por funcionalidade

### Validação de Dados
- ✅ **Validação Client-side**: Zod para validação em tempo real
- 🛡️ **Validação Server-side**: PostgreSQL constraints e triggers
- 🧹 **Sanitização**: Limpeza de inputs maliciosos
- 📄 **Validação de Documentos**: CPF/CNPJ validados automaticamente

## 📊 Performance e Otimização

### Frontend
- ⚡ **Code Splitting**: Carregamento sob demanda
- 🧠 **Memoização**: Otimização de re-renderizações
- 📦 **Bundle Optimization**: Tree shaking automático
- 💾 **Cache Inteligente**: Tanstack Query para cache de dados
- 🖼️ **Lazy Loading**: Carregamento de imagens sob demanda

### Backend
- 🚀 **Índices Estratégicos**: Consultas otimizadas
- 🔄 **Connection Pooling**: Gerenciamento eficiente de conexões
- 📊 **Query Optimization**: Consultas SQL otimizadas
- 💾 **Cache de Dados**: Cache de consultas frequentes

### Rede
- 🗜️ **Compressão**: Gzip para redução de payload
- 📡 **HTTP/2**: Protocolo moderno para performance
- 🌐 **CDN**: Assets servidos via CDN
- 📦 **Minificação**: Arquivos compactados para produção

## 🎨 Design System

### Cores e Tema
```css
/* Paleta principal baseada em tons terrosos */
--primary: #8B4513 (marrom)
--secondary: #DEB887 (bege)
--warm-100: #FAF6F1 (fundo claro)
--warm-900: #513E11 (marrom escuro)
```

### Componentes
- 🎨 **Design Consistente**: Sistema baseado em tokens
- ♿ **Acessibilidade**: Componentes Radix UI com ARIA
- 📱 **Responsividade**: Mobile-first design
- 🎯 **Feedback Visual**: Estados de loading, erro e sucesso
- 🌈 **Modo Escuro**: Suporte futuro planejado

## 📚 Documentação

### Documentos Disponíveis
- 📖 [**TCC Documentation**](docs/tcc-documentation.md): Documentação acadêmica completa
- 🏗️ [**Technical Architecture**](docs/technical-architecture.md): Arquitetura técnica detalhada  
- 📋 [**System Documentation**](docs/system-documentation.md): Documentação do sistema
- 📁 [**Project Structure**](docs/project-structure.md): Estrutura detalhada do projeto

### Recursos de Documentação
- 📝 **Casos de Uso**: Diagramas UML integrados
- 🎯 **User Stories**: Funcionalidades do ponto de vista do usuário
- 📊 **Diagramas**: Arquitetura e fluxos de dados
- 🔧 **API Reference**: Documentação das APIs

## 🧪 Qualidade e Testes

### Ferramentas de Qualidade
- ✅ **TypeScript**: 100% type coverage
- 🔍 **ESLint**: Regras rigorosas de qualidade
- 💅 **Prettier**: Formatação consistente
- 🐺 **Husky**: Git hooks para qualidade

### Validação
- ⚡ **Validação em Tempo Real**: Feedback imediato
- 🎯 **Mensagens Específicas**: Erros contextualizados
- 📋 **Validação de Formulários**: Zod + React Hook Form
- 📄 **Validação de Documentos**: CPF/CNPJ automática

## 🚀 Deploy e DevOps

### Deploy Automático
- 🌐 **Frontend**: Deploy via Lovable
- ☁️ **Backend**: Supabase hosting
- ⚡ **Edge Functions**: Deploy automático
- 🔄 **CI/CD**: Integração contínua configurada

### Monitoramento
- 📊 **Metrics**: Métricas de performance e uso
- 🐛 **Error Tracking**: Rastreamento de erros
- 📈 **Analytics**: Análise de comportamento do usuário
- ⏰ **Uptime**: Monitoramento de disponibilidade

## 🔮 Roadmap Futuro

### Próximas Funcionalidades
- 🔄 **WebSockets**: Atualizações em tempo real
- 📱 **Mobile App**: Aplicativo React Native
- 🤖 **IA Integration**: Análise preditiva de contratos
- 📊 **Relatórios Avançados**: Business Intelligence
- 🔒 **Assinatura Digital**: Integração com certificados
- 📧 **Notificações Email**: Sistema de alertas por email
- 🌐 **API Pública**: Integração com sistemas externos
- 📋 **Workflow**: Sistema de aprovações

### Melhorias Técnicas
- 🧪 **Testes Automatizados**: Cobertura completa
- 🐳 **Docker**: Containerização da aplicação
- 🚀 **Micro-frontends**: Arquitetura escalável
- 📊 **GraphQL**: API mais eficiente
- 🌙 **PWA**: Progressive Web App
- 🔧 **Server-side Rendering**: Performance otimizada

## 🤝 Contribuição

### Como Contribuir
1. **Fork** o repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Padrões de Código
- 📝 **Commits**: Conventional Commits
- 🏗️ **Arquitetura**: Component-driven development
- 🎨 **Estilo**: Prettier + ESLint
- 📚 **Documentação**: JSDoc para funções complexas

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍🎓 Autor

**Ângelo Gabriel Medeiros**
- 🎓 **Instituição**: Instituto Federal de Roraima (IFRR)
- 👨‍🏫 **Orientador**: Prof. Me. Pierre da Costa Viana Júnior
- 📅 **Ano**: 2025

## 🙏 Agradecimentos

- Instituto Federal de Roraima (IFRR)
- Prof. Me. Pierre da Costa Viana Júnior (Orientador)
- Comunidade React e TypeScript
- Equipe do Supabase
- Contribuidores do projeto shadcn/ui

---

<div align="center">

**SWCI - Transformando a gestão de contratos através da tecnologia** 🚀

[📖 Documentação](docs/) • [🐛 Issues](../../issues) • [💡 Features](../../discussions) • [📧 Contato](mailto:angelo.medeiros@example.com)

</div>
