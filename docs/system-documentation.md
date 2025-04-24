
# Documentação do Sistema SWCI (Sistema Web de Controle Interno)

## 1. Visão Geral do Sistema

O SWCI é um sistema web desenvolvido para gerenciar contratos, pessoas físicas e jurídicas, com funcionalidades de alertas e geração de documentos. O sistema utiliza autenticação moderna e possui diferentes níveis de acesso baseados em papéis (roles).

## 2. Casos de Uso

### 2.1 Gestão de Usuários

#### UC001 - Gerenciamento de Usuários
- **Ator Principal**: Administrador
- **Pré-condições**: Usuário autenticado com role "admin"
- **Fluxo Principal**:
  1. Administrador acessa a tela de gerenciamento de usuários
  2. Sistema lista todos os usuários cadastrados
  3. Administrador pode criar, editar ou excluir usuários
  4. Sistema valida dados e permissões
- **Fluxo Alternativo**:
  - Se não for administrador, sistema bloqueia acesso
  - Em caso de email duplicado, sistema exibe mensagem apropriada

### 2.2 Gestão de Contratos

#### UC002 - Cadastrar Novo Contrato
- **Ator Principal**: Usuário do Sistema (admin ou gestor)
- **Pré-condições**: Usuário autenticado com permissões adequadas
- **Fluxo Principal**:
  1. Usuário acessa a tela de cadastro de contratos
  2. Sistema apresenta formulário de cadastro
  3. Usuário preenche CNPJ/CPF da parte contratada
  4. Sistema auto-preenche dados cadastrais
  5. Usuário completa demais informações do contrato
  6. Sistema valida e salva o contrato
  7. Sistema gera automaticamente alertas de vencimento
- **Fluxo Alternativo**:
  - Se dados inválidos, sistema exibe mensagens de erro
  - Se contrato duplicado, sistema impede cadastro

#### UC003 - Gerenciar Alertas de Contratos
- **Ator Principal**: Usuário do Sistema
- **Pré-condições**: Contratos cadastrados no sistema
- **Fluxo Principal**:
  1. Sistema monitora datas de vencimento
  2. Sistema exibe alertas de contratos próximos ao vencimento
  3. Usuário visualiza lista de alertas
  4. Usuário pode renovar ou finalizar contratos
- **Fluxo Alternativo**:
  - Usuário pode filtrar alertas por período
  - Usuário pode adiar notificações

### 2.3 Gestão de Pessoas

#### UC004 - Cadastrar Pessoa Jurídica
- **Ator Principal**: Usuário do Sistema
- **Pré-condições**: Usuário autenticado com permissões adequadas
- **Fluxo Principal**:
  1. Usuário acessa cadastro de pessoa jurídica
  2. Preenche dados da empresa
  3. Sistema valida informações
  4. Sistema salva cadastro
- **Fluxo Alternativo**:
  - Sistema valida CNPJ
  - Sistema verifica duplicidade

#### UC005 - Cadastrar Pessoa Física
- **Ator Principal**: Usuário do Sistema
- **Pré-condições**: Usuário autenticado com permissões adequadas
- **Fluxo Principal**:
  1. Usuário acessa cadastro de pessoa física
  2. Preenche dados pessoais
  3. Sistema valida informações
  4. Sistema salva cadastro
- **Fluxo Alternativo**:
  - Sistema valida CPF
  - Sistema verifica duplicidade

## 3. Modelo de Banco de Dados

### 3.1 Diagrama Entidade-Relacionamento

```sql
-- Tabela de Usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'colaborador',
    username VARCHAR(100) NOT NULL DEFAULT '',
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pessoas Jurídicas
CREATE TABLE legal_persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(200) NOT NULL,
    trade_name VARCHAR(200),
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    state_registration VARCHAR(50),
    street VARCHAR(200) NOT NULL,
    number VARCHAR(20) NOT NULL,
    complement VARCHAR(100),
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    legal_rep_name VARCHAR(100) NOT NULL,
    legal_rep_cpf VARCHAR(14) NOT NULL,
    legal_rep_role VARCHAR(100) NOT NULL,
    bank VARCHAR(100),
    agency VARCHAR(20),
    account VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id)
);

-- Tabela de Pessoas Físicas
CREATE TABLE physical_persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(200) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    rg VARCHAR(20),
    birth_date DATE NOT NULL,
    street VARCHAR(200) NOT NULL,
    number VARCHAR(20) NOT NULL,
    complement VARCHAR(100),
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id)
);

-- Tabela de Contratos
CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_number VARCHAR(50) UNIQUE NOT NULL,
    object TEXT NOT NULL,
    contractor_id UUID REFERENCES legal_persons(id),
    contracted_id UUID REFERENCES legal_persons(id),
    legal_rep_id UUID REFERENCES physical_persons(id),
    total_value DECIMAL(15,2) NOT NULL,
    duration INTEGER NOT NULL,
    signature_date DATE NOT NULL,
    publication_date DATE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_adjustment_term INTEGER,
    adjustment_index VARCHAR(50),
    bank VARCHAR(100),
    agency VARCHAR(20),
    account VARCHAR(20),
    payment_term TEXT,
    delay_penalty TEXT,
    termination_penalty TEXT,
    budget_unit VARCHAR(100),
    work_program VARCHAR(100),
    expense_nature VARCHAR(100),
    resource_source VARCHAR(100),
    witness1_id UUID REFERENCES physical_persons(id),
    witness2_id UUID REFERENCES physical_persons(id),
    signature_location VARCHAR(200),
    general_observations TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id)
);

-- Tabela de Alertas de Contratos
CREATE TABLE contract_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(id),
    alert_type VARCHAR(50) NOT NULL,
    alert_date DATE NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id)
);
```

### 3.2 Relacionamentos Principais

1. **Usuários e Entidades**:
   - Cada entidade (contrato, pessoa física, pessoa jurídica) possui um created_by que referencia o usuário que a criou
   - Usuários possuem roles e permissões que controlam seu acesso às funcionalidades

2. **Contratos e Pessoas Jurídicas**:
   - Um contrato possui uma pessoa jurídica contratante (contractor_id)
   - Um contrato possui uma pessoa jurídica contratada (contracted_id)
   - Uma pessoa jurídica pode ter múltiplos contratos

3. **Contratos e Pessoas Físicas**:
   - Um contrato possui um representante legal (legal_rep_id)
   - Um contrato possui duas testemunhas (witness1_id e witness2_id)
   - Uma pessoa física pode estar em múltiplos contratos

4. **Contratos e Alertas**:
   - Um contrato pode ter múltiplos alertas
   - Cada alerta está associado a um único contrato
   - Alertas são gerados automaticamente aos 30, 60 dias antes e no dia do vencimento

## 4. Políticas de Segurança e Row Level Security (RLS)

### 4.1 Políticas para Usuários
- Administradores podem gerenciar todos os usuários
- Usuários podem ver apenas seus próprios dados

### 4.2 Políticas para Pessoas Jurídicas e Físicas
- Administradores e Gestores podem gerenciar todas as pessoas
- Colaboradores podem apenas visualizar pessoas

### 4.3 Políticas para Contratos e Alertas
- Administradores e Gestores podem gerenciar todos os contratos e alertas
- Colaboradores podem apenas visualizar contratos e alertas

## 5. Índices e Otimizações

```sql
-- Índices para melhor performance
CREATE INDEX idx_contracts_end_date ON contracts(end_date);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contract_alerts_alert_date ON contract_alerts(alert_date);
CREATE INDEX idx_contract_alerts_status ON contract_alerts(status);
CREATE INDEX idx_legal_persons_cnpj ON legal_persons(cnpj);
CREATE INDEX idx_physical_persons_cpf ON physical_persons(cpf);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

## 6. Considerações de Segurança

1. **Autenticação**:
   - Implementação via Supabase Auth
   - Autenticação por email/senha
   - Tokens JWT para sessões
   - Refresh tokens automáticos
   - Validação de força de senha

2. **Autorização**:
   - Controle de acesso baseado em roles (admin, gestor, colaborador)
   - Permissões granulares por funcionalidade
   - Validação de permissões em cada rota
   - Proteção de rotas no frontend e backend
   - Row Level Security para controle de acesso aos dados

3. **Validação de Dados**:
   - Validação de CPF/CNPJ
   - Validação de emails únicos
   - Sanitização de inputs
   - Proteção contra SQL Injection via Supabase

4. **Auditoria**:
   - Registro de criação/alteração de registros
   - Rastreamento de usuário criador/modificador
   - Timestamps de criação e atualização
   - Atualização automática de timestamps via triggers

## 7. Requisitos Técnicos

### Frontend
- React 18+ com TypeScript
- Vite como bundler
- Tailwind CSS para estilização
- shadcn/ui para componentes
- Tanstack Query para estado e cache
- React Hook Form para formulários
- Zod para validação
- Axios para requisições HTTP
- Recharts para gráficos

### Backend (Supabase)
- PostgreSQL como banco de dados
- Supabase Auth para autenticação
- Edge Functions para lógica complexa
- RLS (Row Level Security) para segurança
- Realtime para atualizações em tempo real
- Triggers para automação de processos no banco de dados

## 8. Manutenção e Monitoramento

1. **Logs e Monitoramento**:
   - Console logs detalhados
   - Rastreamento de erros
   - Monitoramento de performance

2. **Backup e Recuperação**:
   - Backup automático via Supabase
   - Versionamento de código via Git
   - Procedimentos de recuperação documentados

3. **Atualizações**:
   - Processo de migração documentado
   - Testes antes de deploy
   - Rollback planejado
