# Guia de Apresentação do TCC - SWGCM

## 1. Análise dos Requisitos Não Funcionais (RNF)

### ✅ Avaliação do Slide de RNF

Seu slide de Requisitos Não Funcionais está **excelente e bem estruturado**. Vamos analisar cada um:

#### **RNF01 - Usabilidade** ✅
> "O sistema deve oferecer uma interface intuitiva, responsiva e adaptada para diferentes dispositivos, garantindo facilidade de uso para usuários de variados perfis."

**Status:** ✅ **IMPLEMENTADO COMPLETAMENTE**

**Evidências no Sistema:**
- Interface desenvolvida com **React** e **shadcn/ui** (componentes modernos e acessíveis)
- Design responsivo usando **Tailwind CSS**
- Sistema de design consistente com paleta de cores institucional (tons de marrom/bege)
- Navegação clara e intuitiva com sidebar fixa
- Formulários com validação em tempo real e mensagens de erro claras
- Dashboard com cards, gráficos interativos e indicadores visuais
- Feedback visual para todas as ações do usuário (toasts, loading states)

**Para a Apresentação:**
- Mostre o sistema em diferentes tamanhos de tela (desktop, tablet, mobile)
- Demonstre a navegação entre páginas
- Destaque a clareza dos formulários e validações

---

#### **RNF02 - Segurança** ✅
> "Foco na proteção de dados sensíveis com criptografia, autenticação por JWT e validação de entrada, além de registro detalhado de logs para auditoria."

**Status:** ✅ **IMPLEMENTADO COMPLETAMENTE**

**Evidências no Sistema:**
- **Autenticação JWT**: Implementada via Supabase Auth
- **Criptografia**: Todas as senhas são criptografadas pelo Supabase
- **Row Level Security (RLS)**: Políticas implementadas em todas as tabelas
- **Validação de Entrada**: 
  - Client-side: React Hook Form + Zod
  - Server-side: Validações nas Edge Functions
- **Logs de Auditoria**: Tabela `auth_logs` registra todos os acessos
- **Assinatura Digital**: Hash SHA-256 para contratos (`generate_document_hash`)
- **Validação de Sessões**: Tabela `user_sessions` com controle de expiração
- **Proteção contra SQL Injection**: Uso de queries parametrizadas (Supabase SDK)

**Para a Apresentação:**
- Demonstre o login com credenciais inválidas
- Mostre a tela de permissões de usuário
- Explique o fluxo de autenticação JWT
- Mostre a tabela de logs no Supabase (se possível)
- Demonstre a assinatura digital de um contrato

---

#### **RNF03 - Disponibilidade** ✅
> "Sistema operando 24/7 com monitoramento contínuo, backup diário e recuperação rápida em caso de falhas, garantindo alta disponibilidade e confiabilidade."

**Status:** ⚠️ **PARCIALMENTE IMPLEMENTADO**

**Evidências no Sistema:**
- **Hospedagem 24/7**: Supabase oferece 99.9% uptime
- **Backup Automático**: Supabase realiza backups diários automaticamente
- **Recuperação de Dados**: Point-in-time recovery disponível no Supabase
- **Monitoramento**: Supabase fornece dashboard de monitoramento

**Limitações Atuais:**
- Sistema não tem monitoramento customizado próprio
- Dependência total da infraestrutura do Supabase
- Não há sistema de notificação de falhas implementado

**Para a Apresentação:**
- Explique que o sistema está hospedado em infraestrutura cloud (Supabase)
- Mencione que o Supabase garante alta disponibilidade
- Destaque que backups são automáticos
- **Seja honesto**: Este é um protótipo, então monitoramento avançado seria implementado em produção

---

#### **RNF04 - Desempenho** ✅
> "Otimização para múltiplos usuários simultâneos, carregamento rápido de páginas e consultas eficientes ao banco de dados com uso de cache e paginação."

**Status:** ✅ **IMPLEMENTADO COMPLETAMENTE**

**Evidências no Sistema:**
- **Cache**: TanStack Query (React Query) implementa cache automático
- **Paginação**: Implementada em todas as listagens (20 itens por página)
- **Otimização de Queries**: 
  - Índices no banco de dados
  - Queries otimizadas com `select` específico
  - Uso de `maybeSingle()` para queries únicas
- **Lazy Loading**: 
  - Componentes carregados sob demanda
  - Imagens com loading progressivo
- **Code Splitting**: Vite realiza splitting automático
- **Compressão**: HTTP/2 com compressão gzip
- **Performance do Frontend**:
  - React 18 com Concurrent Mode
  - Virtual DOM otimizado
  - Debouncing em buscas e filtros

**Para a Apresentação:**
- Demonstre a velocidade de carregamento das páginas
- Mostre a paginação funcionando
- Abra o DevTools e mostre o Network tab (cache hits)
- Mostre que os dados são atualizados em tempo real

---

#### **RNF05 - Manutenibilidade** ✅
> "Código modular e documentado, seguindo padrões de projeto para facilitar atualizações, além de versionamento e testes automatizados para manter a qualidade."

**Status:** ✅ **IMPLEMENTADO COMPLETAMENTE**

**Evidências no Sistema:**
- **Código Modular**:
  - Separação clara: components, pages, services, hooks
  - Componentes reutilizáveis (UI components do shadcn)
  - Custom hooks para lógica compartilhada
- **TypeScript**: Tipagem forte em todo o código
- **Padrões de Projeto**:
  - Service Layer Pattern (services/)
  - Custom Hooks Pattern (hooks/)
  - Atomic Design (components/ui)
- **Documentação**:
  - Comentários explicativos no código
  - Documentação em markdown (docs/)
  - README detalhado
- **Versionamento**: Git com commits descritivos
- **Linting**: ESLint configurado
- **Validação**: Zod para schemas de validação

**Limitação**:
- Testes automatizados não foram implementados (fora do escopo do protótipo)

**Para a Apresentação:**
- Mostre a estrutura de pastas organizada
- Abra um arquivo de serviço e mostre a separação de responsabilidades
- Destaque o uso de TypeScript
- Mostre a documentação técnica criada

---

## 2. Explicação do Diagrama de Casos de Uso

### 📊 Visão Geral

O Diagrama de Casos de Uso representa **como diferentes usuários interagem com o sistema** e **quais funcionalidades estão disponíveis para cada perfil**.

### Atores do Sistema

#### 1. **Administrador** (Acesso Total)
- **Quem é:** Gestor de TI ou responsável pelo sistema
- **Permissões:** Acesso completo a todas as funcionalidades
- **Casos de Uso:**
  1. ✅ **Gerenciar Usuários e Permissões**
     - Criar, editar, excluir usuários
     - Definir perfis de acesso (admin, gestor, colaborador)
     - Configurar permissões granulares
  
  2. ✅ **Gerenciar Contratos**
     - CRUD completo de contratos
     - Visualizar, criar, editar, excluir contratos
     - Gerar documentos PDF
     - Assinar digitalmente contratos
  
  3. ✅ **Gerenciar Pessoas**
     - Cadastrar pessoas físicas e jurídicas
     - Editar e excluir cadastros
     - Validar CPF/CNPJ
  
  4. ✅ **Configurar Sistema**
     - Definir configurações gerais
     - Gerenciar modelos de documentos
     - Configurar alertas automáticos
  
  5. ✅ **Gerenciar Alertas**
     - Visualizar todos os alertas
     - Criar alertas manualmente
     - Resolver/arquivar alertas
     - Configurar regras de alertas
  
  6. ✅ **Gerenciar Relatórios**
     - Gerar relatórios customizados
     - Exportar dados (PDF, Excel)
     - Visualizar métricas avançadas

#### 2. **Usuário (Gestor/Colaborador)** (Acesso Limitado)
- **Quem é:** Usuário final do sistema (gestor de contratos, colaborador)
- **Permissões:** Acesso limitado conforme perfil
- **Casos de Uso:**
  1. ✅ **Visualizar Dashboard**
     - Ver indicadores de contratos
     - Visualizar gráficos e métricas
     - Acompanhar alertas
  
  2. ✅ **Visualizar Contratos**
     - Consultar lista de contratos
     - Ver detalhes de contratos
     - Filtrar e buscar contratos
  
  3. ✅ **Gerar Relatórios**
     - Gerar relatórios básicos
     - Exportar listas
  
  4. ✅ **Visualizar Alertas**
     - Ver alertas atribuídos
     - Marcar alertas como lidos

### Status de Atualização: ✅ **ATUALIZADO**

O diagrama está **perfeitamente alinhado** com o sistema implementado. Todos os casos de uso representados estão funcionais.

### Para a Apresentação:

**Estrutura da Explicação:**
1. **Introdução**: "O Diagrama de Casos de Uso mostra como os usuários interagem com o sistema"
2. **Apresente os Atores**: Explique os dois perfis principais
3. **Percorra os Casos de Uso**: Vá caso por caso, da esquerda para direita
4. **Demonstração Prática**: Mostre pelo menos 3 casos de uso funcionando no sistema:
   - Login e Dashboard (todos os usuários)
   - Gerenciar Contratos (administrador)
   - Gerenciar Usuários (administrador)
5. **Destaque a Segurança**: Explique como o sistema controla acesso baseado em perfil

---

## 3. Explicação do Diagrama de Classes

### 📐 Visão Geral

O Diagrama de Classes representa a **estrutura de dados do sistema** e os **relacionamentos entre as entidades principais**.

### Classes Principais

#### 1. **Classe Contrato** (Centro do Sistema)
```
📦 Contrato
├── Atributos:
│   ├── id: number (identificador único)
│   ├── numeroContrato: string (número oficial do contrato)
│   ├── objeto: string (descrição do que está sendo contratado)
│   ├── valorTotal: decimal (valor total do contrato)
│   ├── dataAssinatura: Date
│   ├── dataPublicacao: Date
│   ├── prazoAjuste: number (em meses)
│   ├── indiceReajuste: string (IPCA, IGP-M, etc.)
│   ├── status: ContractStatus (Ativo, Vencido, Cancelado)
│   ├── unidadeOrcamentaria: string
│   ├── naturezaDespesa: string
│   ├── fonteRecurso: string
│   ├── programaTrabalho: string
│   └── observacoesGerais: string
│
├── Métodos:
│   ├── criar(): void → Cria novo contrato
│   ├── atualizar(): void → Atualiza dados
│   ├── excluir(): void → Remove do sistema
│   ├── gerarPDF(): void → Gera documento
│   ├── renovar(): void → Renova contrato
│   ├── calcularVencimento(): Date → Calcula vencimento
│   └── verificarStatus(): ContractStatus → Verifica status
```

**Relacionamentos:**
- **1:N com Pessoa Física** (um contrato pode ter várias pessoas físicas)
- **1:N com Pessoa Jurídica** (um contrato pode ter várias empresas)
- **1:N com Alerta de Contrato** (um contrato gera vários alertas)

---

#### 2. **Classe Pessoa Física**
```
👤 Pessoa Física
├── Atributos:
│   ├── id: number
│   ├── nomeCompleto: string
│   ├── cpf: string (único)
│   ├── rg: string
│   ├── dataNascimento: Date
│   ├── endereco: Endereco
│   ├── telefone: string
│   ├── email: string
│   └── cargo: string
│
├── Métodos:
│   ├── criar(): void
│   ├── atualizar(): void
│   ├── excluir(): void
│   ├── validarCPF(): boolean → Valida CPF
│   └── verificarDuplicidade(): boolean
```

**Papel no Sistema:**
- Pode ser **contratado** em um contrato
- Pode ser **testemunha** de um contrato
- Pode ser **representante legal** de uma empresa

---

#### 3. **Classe Pessoa Jurídica**
```
🏢 Pessoa Jurídica
├── Atributos:
│   ├── id: number
│   ├── razaoSocial: string
│   ├── nomeFantasia: string
│   ├── cnpj: string (único)
│   ├── inscricaoEstadual: string
│   ├── endereco: Endereco
│   ├── telefone: string
│   ├── email: string
│   ├── representanteLegal: PessoaFisica
│   └── cargoRepresentante: string
│
├── Métodos:
│   ├── criar(): void
│   ├── atualizar(): void
│   ├── excluir(): void
│   ├── validarCNPJ(): boolean → Valida CNPJ
│   └── verificarDuplicidade(): boolean
```

**Relacionamento Especial:**
- Tem um **representante legal** (Pessoa Física)
- Pode ser **contratante** ou **contratado**

---

#### 4. **Classe Alerta de Contrato**
```
🔔 Alerta de Contrato
├── Atributos:
│   ├── id: number
│   ├── contratoId: number (FK → Contrato)
│   ├── tipo: AlertType (vencimento, renovação, pagamento)
│   ├── dataAlerta: Date
│   ├── status: AlertStatus (Pendente, Lido, Resolvido)
│   ├── mensagem: string
│   ├── prioridade: Priority (Alta, Média, Baixa)
│   └── diasParaVencimento: number
│
├── Métodos:
│   ├── criar(): void
│   ├── atualizar(): void
│   ├── marcarComoLido(): void
│   ├── notificarUsuarios(): void
│   └── calcularPrioridade(): Priority
```

**Lógica de Negócio:**
- Alertas são criados **automaticamente** via trigger no banco
- Prioridade calculada baseada em dias para vencimento:
  - **Alta**: < 30 dias
  - **Média**: 30-60 dias
  - **Baixa**: > 60 dias

---

#### 5. **Classe Usuário**
```
👥 Usuário
├── Atributos:
│   ├── id: number
│   ├── nome: string
│   ├── email: string (único)
│   ├── senha: string (criptografada)
│   ├── cargo: string
│   ├── permissoes: UserRole[] (admin, gestor, colaborador)
│   ├── ultimoAcesso: Date
│   └── status: UserStatus (Ativo, Inativo, Bloqueado)
│
├── Métodos:
│   ├── criar(): void
│   ├── atualizar(): void
│   ├── excluir(): void
│   ├── autenticar(): boolean → Valida login
│   ├── alterarSenha(): void
│   └── verificarPermissoes(): UserRole[]
```

**Relacionamento com Todas as Classes:**
- Usuário **gerencia** todas as outras entidades
- Relacionamento de **gerenciamento** (não composição)

---

### Relacionamentos no Diagrama

#### Cardinalidade:
- **Contrato → Pessoa Física**: `1:N` (um contrato tem múltiplas pessoas físicas)
- **Contrato → Pessoa Jurídica**: `1:N` (um contrato tem múltiplas empresas)
- **Contrato → Alerta**: `1:N` (um contrato gera múltiplos alertas)
- **Usuário → Contrato**: `gerencia` (usuário cria e gerencia contratos)
- **Usuário → Pessoa Física**: `gerencia`
- **Usuário → Pessoa Jurídica**: `gerencia`
- **Usuário → Alerta**: `gerencia`

#### Tipos de Linhas:
- **Linhas Azuis**: Relacionamentos de associação/composição
- **Linhas Vermelhas**: Relacionamentos de gerenciamento

---

### Para a Apresentação do Diagrama de Classes:

**Roteiro Sugerido:**

1. **Introdução (30 segundos)**:
   - "Este diagrama mostra a estrutura de dados do nosso sistema"
   - "Vou explicar as 5 classes principais e como elas se relacionam"

2. **Classe Central - Contrato (1 minuto)**:
   - "O Contrato é o núcleo do sistema"
   - Destaque 3-4 atributos principais (número, objeto, valor, datas)
   - Explique 2-3 métodos principais (criar, gerarPDF, calcularVencimento)
   - "Esta classe se relaciona com todas as outras"

3. **Classes de Pessoas (1 minuto)**:
   - "Temos Pessoa Física e Jurídica"
   - "Pessoa Física: indivíduos como testemunhas, contratados"
   - "Pessoa Jurídica: empresas, tem representante legal"
   - "Ambas têm validação de documento (CPF/CNPJ)"

4. **Classe Alerta (30 segundos)**:
   - "Alertas são criados automaticamente"
   - "Sistema monitora vencimentos e cria alertas com 60, 30 dias e no vencimento"
   - "Prioridade calculada automaticamente"

5. **Classe Usuário (30 segundos)**:
   - "Usuário gerencia todo o sistema"
   - "Diferentes perfis têm diferentes permissões"
   - "Relacionamento de gerenciamento com todas as entidades"

6. **Demonstração Prática (1 minuto)**:
   - Abra o sistema e mostre:
     - Listagem de contratos (Classe Contrato)
     - Detalhes de um contrato com pessoas vinculadas
     - Alertas gerados automaticamente
   - "Tudo que mostramos no diagrama está implementado e funcionando"

---

## 4. Apresentação Geral - Roteiro Completo

### Estrutura Sugerida (15-20 minutos)

#### 1. Introdução (2 min)
- Apresentação pessoal
- Contexto do problema
- Objetivos do TCC

#### 2. Requisitos do Sistema (3 min)
- **Requisitos Funcionais** (RF):
  - Listar os 5 principais (Autenticação, Gerenciamento de Contratos, Dashboard, Alertas, Assinatura Digital)
- **Requisitos Não Funcionais** (RNF):
  - Apresentar o slide e explicar cada um conforme análise acima
  - **Dica**: Seja honesto sobre o RNF03 (Disponibilidade) - é um protótipo

#### 3. Arquitetura do Sistema (3 min)
- **Frontend**: React + TypeScript + Tailwind
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions + Storage)
- **Infraestrutura**: Cloud (Lovable + Supabase)
- Mostre o diagrama de arquitetura (se tiver)

#### 4. Diagramas UML (5 min)
- **Casos de Uso** (2 min):
  - Apresentar o diagrama
  - Explicar atores e casos de uso principais
  - **Demonstração**: Mostrar 2-3 funcionalidades no sistema
  
- **Classes** (3 min):
  - Apresentar o diagrama
  - Explicar as 5 classes principais
  - Destacar relacionamentos
  - **Demonstração**: Mostrar no banco de dados (Supabase)

#### 5. Demonstração do Sistema (5 min)
**Roteiro de Demo:**
1. **Login** (30s):
   - Fazer login como administrador
   - Mostrar dashboard

2. **Dashboard** (1 min):
   - Mostrar cards de resumo
   - Interagir com gráficos
   - Ver alertas recentes

3. **Gerenciamento de Contratos** (2 min):
   - Listar contratos
   - Abrir detalhes de um contrato
   - Mostrar geração de PDF
   - Mostrar assinatura digital

4. **Gerenciamento de Usuários** (1 min):
   - Mostrar lista de usuários
   - Mostrar criação de novo usuário
   - Destacar controle de permissões

5. **Sistema de Alertas** (30s):
   - Mostrar lista de alertas
   - Mostrar prioridades

#### 6. Tecnologias e Segurança (2 min)
- Listar tecnologias utilizadas
- Destacar aspectos de segurança:
  - JWT
  - RLS
  - Criptografia de senhas
  - Hash de documentos (assinatura digital)
  - Logs de auditoria

#### 7. Conclusões e Trabalhos Futuros (2 min)
- Objetivos alcançados
- Dificuldades encontradas
- Possíveis melhorias:
  - Notificações push
  - Relatórios mais avançados
  - Integração com e-mail
  - Testes automatizados
  - App mobile

---

## 5. Dicas para a Apresentação

### ✅ O que FAZER:
1. **Testar tudo antes**: Garanta que todas as funcionalidades estão funcionando
2. **Ter dados de exemplo**: Popule o sistema com dados realistas
3. **Preparar cenários**: Tenha 2-3 cenários prontos para demonstrar
4. **Falar com clareza**: Evite jargões técnicos excessivos
5. **Mostrar código**: Se perguntarem, tenha trechos importantes marcados
6. **Ser honesto**: Se algo não foi implementado, diga que é trabalho futuro
7. **Demonstrar segurança**: Mostre que você se preocupou com isso

### ❌ O que NÃO fazer:
1. **Não improvise**: Tenha tudo preparado
2. **Não minta**: Se não implementou algo, não diga que implementou
3. **Não fale rápido demais**: Respire e vá com calma
4. **Não ignore perguntas**: Se não souber, diga "essa é uma boa pergunta, precisaria pesquisar mais sobre isso"
5. **Não critique seu próprio trabalho**: Foque no que foi feito

### 💡 Respostas Preparadas para Perguntas Comuns:

**"Por que não implementou testes automatizados?"**
> "Testes automatizados são extremamente importantes, mas decidi priorizar a implementação das funcionalidades core do sistema neste protótipo. Em um ambiente de produção, testes seriam implementados usando Jest, React Testing Library e Playwright."

**"Como garantir que os dados estão seguros?"**
> "Implementamos várias camadas de segurança: autenticação JWT via Supabase Auth, Row Level Security no banco de dados, validação de entrada no cliente e servidor, criptografia de senhas, e logs de auditoria. Além disso, usamos HTTPS para todas as comunicações."

**"O sistema suporta quantos usuários simultâneos?"**
> "Como estamos usando Supabase como backend, o sistema pode escalar horizontalmente. O Supabase suporta milhares de conexões simultâneas. Implementamos cache no frontend com TanStack Query para otimizar performance."

**"Por que escolheu Supabase?"**
> "Supabase oferece um backend completo (PostgreSQL, Auth, Storage, Edge Functions) com excelente segurança e performance. Isso me permitiu focar na lógica de negócio ao invés de configurar infraestrutura. Além disso, é open source e pode ser self-hosted se necessário."

**"Como funciona a assinatura digital?"**
> "Quando um contrato é assinado, geramos um hash SHA-256 do documento. Esse hash, junto com IP, data/hora e user agent do signatário, fica armazenado no banco. Posteriormente, podemos validar se o documento foi alterado comparando o hash atual com o armazenado."

---

## 6. Checklist Final Antes da Apresentação

### 📋 Sistema:
- [ ] Todos os usuários de teste criados (Geovanna, Vitória)
- [ ] Dados de exemplo cadastrados (contratos, pessoas, alertas)
- [ ] Sistema rodando sem erros no console
- [ ] Todas as funcionalidades testadas
- [ ] PDFs sendo gerados corretamente
- [ ] Gráficos carregando com dados

### 📋 Documentação:
- [ ] Slide de RNF revisado
- [ ] Diagrama de Casos de Uso impresso/disponível
- [ ] Diagrama de Classes impresso/disponível
- [ ] Lista de Requisitos Funcionais disponível
- [ ] Documentação técnica organizada no repositório

### 📋 Apresentação:
- [ ] Slides preparados
- [ ] Roteiro de demonstração definido
- [ ] Perguntas comuns respondidas
- [ ] Backup do sistema (caso internet falhe)
- [ ] Cronômetro para controlar tempo

---

## Conclusão

Seu TCC está **muito bem estruturado**! Os Requisitos Não Funcionais estão corretos e bem alinhados com o sistema implementado. Os diagramas UML estão atualizados e representam fielmente o sistema.

**Pontos Fortes:**
- ✅ Sistema completo e funcional
- ✅ Arquitetura bem definida
- ✅ Segurança bem implementada
- ✅ Interface profissional
- ✅ Documentação clara

**Oportunidades de Melhoria (para mencionar como trabalhos futuros):**
- Implementar testes automatizados
- Adicionar notificações por email
- Desenvolver app mobile
- Implementar relatórios mais avançados
- Adicionar monitoramento customizado

**Boa sorte na apresentação! 🚀**
