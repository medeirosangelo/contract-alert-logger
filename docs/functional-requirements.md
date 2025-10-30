# Requisitos Funcionais do Sistema SWGCM

## RF01 - Autenticação e Autorização
**Descrição:** O sistema deve permitir autenticação de usuários com diferentes níveis de acesso (Administrador, Gestor e Colaborador).

**Atores:** Administrador, Gestor, Colaborador

**Fluxo Principal:**
1. Usuário acessa a tela de login
2. Insere email e senha
3. Sistema valida as credenciais
4. Sistema redireciona para o dashboard de acordo com as permissões
5. Sistema registra o log de acesso

**Regras de Negócio:**
- Senha deve ter no mínimo 6 caracteres, com pelo menos uma letra maiúscula, uma minúscula e um número
- Sistema deve implementar JWT para autenticação
- Sessões devem expirar após 30 dias de inatividade
- Máximo de 3 tentativas de login incorretas antes de bloquear temporariamente

---

## RF02 - Gerenciamento de Usuários
**Descrição:** O sistema deve permitir o cadastro, edição, exclusão e visualização de usuários do sistema.

**Atores:** Administrador

**Fluxo Principal:**
1. Administrador acessa o menu "Gerenciamento de Usuários"
2. Visualiza lista de usuários cadastrados
3. Pode criar novo usuário informando: nome, email, senha e perfil
4. Pode editar informações de usuários existentes
5. Pode excluir usuários do sistema
6. Sistema registra todas as operações em log

**Regras de Negócio:**
- Apenas administradores podem gerenciar usuários
- Email deve ser único no sistema
- Ao criar usuário, sistema envia email de confirmação (opcional)
- Ao excluir usuário, sistema mantém registro histórico

---

## RF03 - Gerenciamento de Contratos
**Descrição:** O sistema deve permitir o cadastro completo de contratos, incluindo todas as informações contratuais, partes envolvidas, valores e prazos.

**Atores:** Administrador, Gestor

**Fluxo Principal:**
1. Usuário acessa "Cadastro de Contratos"
2. Preenche informações de identificação do contrato (número, objeto)
3. Informa as partes contratantes (contratante e contratado)
4. Define informações de pagamento e prazos
5. Adiciona cláusulas de multas e penalidades
6. Define classificação orçamentária
7. Sistema valida dados e salva contrato
8. Sistema cria alertas automáticos para vencimento

**Regras de Negócio:**
- Número do contrato deve ser único
- Data de início deve ser anterior à data de término
- Valor total deve ser maior que zero
- Sistema deve criar automaticamente alertas em 30, 60 dias antes do vencimento e no dia do vencimento
- Contrato pode ter status: Ativo, Vencido, Cancelado, Suspenso

---

## RF04 - Gerenciamento de Pessoas Físicas
**Descrição:** O sistema deve permitir o cadastro de pessoas físicas que podem atuar como contratados, testemunhas ou representantes legais.

**Atores:** Administrador, Gestor

**Fluxo Principal:**
1. Usuário acessa "Cadastro de Pessoa Física"
2. Preenche dados pessoais (nome, CPF, RG, data de nascimento)
3. Informa endereço completo
4. Adiciona informações de contato (telefone, email)
5. Define cargo/função
6. Sistema valida CPF
7. Sistema salva cadastro

**Regras de Negócio:**
- CPF deve ser válido e único no sistema
- CPF deve ser validado usando algoritmo de dígito verificador
- Data de nascimento não pode ser futura
- Email deve ser único no sistema
- Sistema deve permitir busca de endereço por CEP via API ViaCEP

---

## RF05 - Gerenciamento de Pessoas Jurídicas
**Descrição:** O sistema deve permitir o cadastro de pessoas jurídicas (empresas) que podem atuar como contratantes ou contratadas.

**Atores:** Administrador, Gestor

**Fluxo Principal:**
1. Usuário acessa "Cadastro de Pessoa Jurídica"
2. Preenche dados da empresa (razão social, nome fantasia, CNPJ)
3. Informa endereço completo
4. Adiciona informações bancárias
5. Define representante legal
6. Sistema valida CNPJ
7. Sistema salva cadastro

**Regras de Negócio:**
- CNPJ deve ser válido e único no sistema
- CNPJ deve ser validado usando algoritmo de dígito verificador
- Representante legal deve ser uma pessoa física já cadastrada
- Sistema deve permitir busca de endereço por CEP via API ViaCEP

---

## RF06 - Dashboard Analítico
**Descrição:** O sistema deve apresentar um dashboard com indicadores e gráficos sobre os contratos gerenciados.

**Atores:** Administrador, Gestor, Colaborador

**Fluxo Principal:**
1. Usuário acessa o dashboard
2. Sistema exibe cards com totalizadores:
   - Total de contratos ativos
   - Valor total dos contratos
   - Contratos próximos do vencimento
   - Alertas pendentes
3. Sistema exibe gráficos:
   - Distribuição de contratos por tipo
   - Evolução temporal dos valores
   - Análise de suprimentos
   - Análise de serviços
4. Sistema exibe calendário com datas importantes
5. Sistema exibe alertas recentes

**Regras de Negócio:**
- Dashboard deve ser atualizado em tempo real
- Gráficos devem ser interativos
- Usuário pode filtrar dados por período
- Sistema deve usar cache para otimizar performance

---

## RF07 - Sistema de Alertas
**Descrição:** O sistema deve gerar alertas automáticos para eventos importantes relacionados aos contratos.

**Atores:** Sistema (automático), Administrador, Gestor

**Fluxo Principal:**
1. Sistema verifica diariamente contratos próximos do vencimento
2. Sistema cria alertas automaticamente:
   - 60 dias antes do vencimento
   - 30 dias antes do vencimento
   - No dia do vencimento
3. Sistema exibe alertas no dashboard
4. Usuário pode visualizar lista completa de alertas
5. Usuário pode marcar alertas como lidos
6. Usuário pode resolver/arquivar alertas

**Regras de Negócio:**
- Alertas devem ter prioridade (Alta, Média, Baixa)
- Sistema deve calcular prioridade baseado nos dias para vencimento
- Alertas podem ter status: Pendente, Lido, Resolvido
- Sistema deve manter histórico de alertas

---

## RF08 - Geração de Documentos
**Descrição:** O sistema deve permitir a geração de documentos em PDF dos contratos cadastrados.

**Atores:** Administrador, Gestor

**Fluxo Principal:**
1. Usuário acessa detalhes de um contrato
2. Clica em "Gerar Documento PDF"
3. Sistema compila informações do contrato
4. Sistema gera PDF formatado
5. Sistema disponibiliza download do arquivo

**Regras de Negócio:**
- PDF deve conter todas as informações do contrato
- PDF deve seguir modelo padrão institucional
- Sistema deve registrar data/hora da geração
- PDF pode ser gerado múltiplas vezes

---

## RF09 - Assinatura Digital
**Descrição:** O sistema deve permitir assinatura digital de contratos com registro de hash criptográfico.

**Atores:** Administrador, Gestor, Signatários

**Fluxo Principal:**
1. Usuário acessa contrato pendente de assinatura
2. Sistema gera hash do documento
3. Signatário confirma assinatura
4. Sistema registra:
   - Hash do documento
   - Data/hora da assinatura
   - IP do signatário
   - User agent
5. Sistema marca contrato como assinado
6. Sistema permite validação posterior da assinatura

**Regras de Negócio:**
- Sistema deve usar SHA-256 para hash
- Assinatura não pode ser alterada após criada
- Sistema deve permitir múltiplos signatários
- Sistema deve validar integridade do documento

---

## RF10 - Busca e Filtros
**Descrição:** O sistema deve permitir busca e filtros avançados em todas as listagens.

**Atores:** Administrador, Gestor, Colaborador

**Fluxo Principal:**
1. Usuário acessa listagem (contratos, pessoas, etc.)
2. Pode filtrar por:
   - Status
   - Data
   - Valor
   - Tipo
   - Nome/Razão Social
3. Pode ordenar resultados
4. Sistema aplica filtros em tempo real
5. Sistema exibe resultados paginados

**Regras de Negócio:**
- Busca deve ser case-insensitive
- Filtros devem ser combinados (AND)
- Resultados devem ser paginados (20 itens por página)
- Sistema deve manter filtros durante navegação

---

## RF11 - Upload de Documentos
**Descrição:** O sistema deve permitir upload de documentos relacionados a contratos e pessoas.

**Atores:** Administrador, Gestor

**Fluxo Principal:**
1. Usuário acessa registro (contrato ou pessoa)
2. Clica em "Upload de Documento"
3. Seleciona arquivo do computador
4. Define tipo do documento
5. Sistema valida arquivo
6. Sistema faz upload para storage
7. Sistema registra metadados do documento

**Regras de Negócio:**
- Formatos aceitos: PDF, DOC, DOCX, JPG, PNG
- Tamanho máximo: 10MB por arquivo
- Sistema deve registrar: nome original, tamanho, tipo, data upload
- Sistema deve usar storage seguro (Supabase Storage)
- Documentos devem respeitar RLS (Row Level Security)

---

## RF12 - Relatórios
**Descrição:** O sistema deve permitir geração de relatórios customizados.

**Atores:** Administrador, Gestor

**Fluxo Principal:**
1. Usuário acessa "Relatórios"
2. Seleciona tipo de relatório:
   - Contratos por período
   - Contratos por valor
   - Contratos por tipo
   - Alertas por período
3. Define filtros e parâmetros
4. Sistema gera relatório
5. Sistema permite exportação (PDF, Excel)

**Regras de Negócio:**
- Relatórios devem incluir gráficos
- Sistema deve permitir salvar configuração de relatórios
- Relatórios devem ser gerados de forma assíncrona se houver muitos dados
- Sistema deve manter histórico de relatórios gerados

---

## RF13 - Auditoria e Logs
**Descrição:** O sistema deve registrar todas as operações importantes para auditoria.

**Atores:** Sistema (automático)

**Fluxo Principal:**
1. Usuário realiza operação no sistema
2. Sistema registra automaticamente:
   - Usuário que realizou a ação
   - Data/hora da ação
   - Tipo de ação (criar, editar, excluir, visualizar)
   - Entidade afetada
   - IP do usuário
   - Detalhes da ação
3. Logs ficam disponíveis para consulta

**Regras de Negócio:**
- Logs não podem ser editados ou excluídos
- Apenas administradores podem visualizar logs
- Sistema deve manter logs por no mínimo 5 anos
- Logs devem incluir dados de autenticação (login/logout)

---

## RF14 - Permissões Granulares
**Descrição:** O sistema deve implementar controle de permissões detalhado por funcionalidade.

**Atores:** Administrador

**Fluxo Principal:**
1. Administrador acessa "Permissões de Usuário"
2. Seleciona um usuário
3. Define permissões individuais:
   - Visualizar dashboard
   - Gerenciar contratos
   - Gerenciar pessoas
   - Gerenciar usuários
   - Gerar relatórios
   - Editar configurações
4. Sistema salva permissões
5. Sistema aplica permissões imediatamente

**Regras de Negócio:**
- Permissões são baseadas em perfil + customizações
- Administrador tem todas as permissões
- Gestor tem permissões intermediárias
- Colaborador tem permissões básicas
- Sistema deve validar permissões em todas as requisições

---

## Resumo de Requisitos Funcionais

| ID | Nome | Prioridade | Complexidade |
|----|------|-----------|--------------|
| RF01 | Autenticação e Autorização | Alta | Média |
| RF02 | Gerenciamento de Usuários | Alta | Média |
| RF03 | Gerenciamento de Contratos | Alta | Alta |
| RF04 | Gerenciamento de Pessoas Físicas | Alta | Média |
| RF05 | Gerenciamento de Pessoas Jurídicas | Alta | Média |
| RF06 | Dashboard Analítico | Alta | Alta |
| RF07 | Sistema de Alertas | Alta | Média |
| RF08 | Geração de Documentos | Média | Média |
| RF09 | Assinatura Digital | Média | Alta |
| RF10 | Busca e Filtros | Média | Baixa |
| RF11 | Upload de Documentos | Média | Média |
| RF12 | Relatórios | Média | Alta |
| RF13 | Auditoria e Logs | Alta | Média |
| RF14 | Permissões Granulares | Alta | Média |

---

## Matriz de Rastreabilidade

| Requisito Funcional | Requisito Não Funcional Relacionado |
|--------------------|-------------------------------------|
| RF01 | RNF02 (Segurança) |
| RF02 | RNF02 (Segurança) |
| RF03 | RNF04 (Desempenho), RNF05 (Manutenibilidade) |
| RF06 | RNF04 (Desempenho) |
| RF07 | RNF03 (Disponibilidade) |
| RF09 | RNF02 (Segurança) |
| RF13 | RNF02 (Segurança) |
| RF14 | RNF02 (Segurança) |
