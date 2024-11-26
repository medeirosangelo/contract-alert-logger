# Documentação do Sistema SWCI (Sistema Web de Controle Interno)

## 1. Visão Geral do Sistema

O SWCI é um sistema web desenvolvido para gerenciar contratos, pessoas físicas e jurídicas, com funcionalidades de alertas e geração de documentos.

## 2. Casos de Uso

### 2.1 Gestão de Contratos

#### UC001 - Cadastrar Novo Contrato
- **Ator Principal**: Usuário do Sistema
- **Pré-condições**: Usuário autenticado no sistema
- **Fluxo Principal**:
  1. Usuário acessa a tela de cadastro de contratos
  2. Sistema apresenta formulário de cadastro
  3. Usuário preenche CNPJ/CPF da parte contratada
  4. Sistema auto-preenche dados cadastrais
  5. Usuário completa demais informações do contrato
  6. Usuário clica em "Gerar Contrato"
  7. Sistema gera PDF do contrato
  8. Usuário salva o contrato
- **Fluxo Alternativo**:
  - Se CNPJ/CPF não encontrado, sistema permite preenchimento manual
  - Se dados incompletos, sistema exibe mensagem de erro

#### UC002 - Gerenciar Alertas de Contratos
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

### 2.2 Gestão de Pessoas

#### UC003 - Cadastrar Pessoa Jurídica
- **Ator Principal**: Usuário do Sistema
- **Pré-condições**: Usuário autenticado
- **Fluxo Principal**:
  1. Usuário acessa cadastro de pessoa jurídica
  2. Preenche dados da empresa
  3. Sistema valida informações
  4. Sistema salva cadastro
- **Fluxo Alternativo**:
  - Sistema valida CNPJ
  - Sistema verifica duplicidade

#### UC004 - Cadastrar Pessoa Física
- **Ator Principal**: Usuário do Sistema
- **Pré-condições**: Usuário autenticado
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
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pessoas Jurídicas
CREATE TABLE legal_persons (
    id SERIAL PRIMARY KEY,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pessoas Físicas
CREATE TABLE physical_persons (
    id SERIAL PRIMARY KEY,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Contratos
CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    contract_number VARCHAR(50) UNIQUE NOT NULL,
    object TEXT NOT NULL,
    contractor_id INTEGER REFERENCES legal_persons(id),
    contracted_id INTEGER REFERENCES legal_persons(id),
    legal_rep_id INTEGER REFERENCES physical_persons(id),
    total_value DECIMAL(15,2) NOT NULL,
    duration INTEGER NOT NULL, -- em meses
    signature_date DATE NOT NULL,
    publication_date DATE,
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
    witness1_id INTEGER REFERENCES physical_persons(id),
    witness2_id INTEGER REFERENCES physical_persons(id),
    signature_location VARCHAR(200),
    general_observations TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Alertas de Contratos
CREATE TABLE contract_alerts (
    id SERIAL PRIMARY KEY,
    contract_id INTEGER REFERENCES contracts(id),
    alert_type VARCHAR(50) NOT NULL,
    alert_date DATE NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.2 Relacionamentos Principais

1. **Contratos e Pessoas Jurídicas**:
   - Um contrato possui uma pessoa jurídica contratante
   - Um contrato possui uma pessoa jurídica contratada
   - Uma pessoa jurídica pode ter múltiplos contratos

2. **Contratos e Pessoas Físicas**:
   - Um contrato possui um representante legal
   - Um contrato possui duas testemunhas
   - Uma pessoa física pode estar em múltiplos contratos

3. **Contratos e Alertas**:
   - Um contrato pode ter múltiplos alertas
   - Cada alerta está associado a um único contrato

## 4. Índices Recomendados

```sql
-- Índices para melhor performance
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contract_alerts_status ON contract_alerts(status);
CREATE INDEX idx_contract_alerts_date ON contract_alerts(alert_date);
CREATE INDEX idx_legal_persons_cnpj ON legal_persons(cnpj);
CREATE INDEX idx_physical_persons_cpf ON physical_persons(cpf);
```

## 5. Considerações de Segurança

1. **Autenticação**:
   - Implementação de JWT para autenticação
   - Senhas armazenadas com hash bcrypt
   - Sessões com tempo de expiração

2. **Autorização**:
   - Controle de acesso baseado em roles
   - Validação de permissões por rota
   - Logs de ações críticas

3. **Validação de Dados**:
   - Validação de CPF/CNPJ
   - Sanitização de inputs
   - Proteção contra SQL Injection

## 6. Requisitos Técnicos

### Frontend
- React com TypeScript
- Tailwind CSS para estilização
- shadcn/ui para componentes
- Tanstack Query para gerenciamento de estado
- Axios para requisições HTTP

### Backend
- Django REST Framework
- PostgreSQL como banco de dados
- JWT para autenticação
- Celery para tarefas assíncronas
- WebSocket para atualizações em tempo real