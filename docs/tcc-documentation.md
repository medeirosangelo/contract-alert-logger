# Protótipo de Sistema Web para Gestão de Contratos e Monitoramento de Produtividade

## Solução para gestão interna e automação de alertas

### Autor
Ângelo Gabriel Medeiros

### Orientador
Prof. Me. Pierre da Costa Viana Júnior

### Instituição
Instituto Federal de Educação, Ciência e Tecnologia de Roraima (IFRR)

### Data
16 de janeiro de 2025

## 1. Introdução

### Contexto
A gestão eficiente de contratos e o monitoramento da produtividade interna são elementos cruciais para o sucesso organizacional moderno. Em um cenário onde a complexidade das relações contratuais aumenta constantemente, a ausência de ferramentas automatizadas pode resultar em:
- Atrasos no acompanhamento de prazos
- Falhas no processo de renovação
- Prejuízos financeiros
- Perda de oportunidades estratégicas

### Proposta
O desenvolvimento de um sistema web (SWCI - Sistema Web de Controle Interno) focado em:
- Gestão automatizada de contratos
- Sistema de alertas para vencimentos
- Monitoramento de produtividade
- Suporte à tomada de decisões

## 2. Objetivos

### Objetivo Geral
Desenvolver um sistema web para gestão integrada de contratos, promovendo eficiência organizacional e suporte à tomada de decisões estratégicas através de uma interface intuitiva e funcionalidades automatizadas.

### Objetivos Específicos
1. Criar um sistema de alertas automatizados para contratos próximos ao vencimento
2. Implementar um dashboard interativo para visualização de contratos e produtividade
3. Desenvolver interfaces intuitivas para cadastro e acompanhamento de contratos
4. Gerar relatórios detalhados sobre o status dos contratos
5. Automatizar o processo de renovação contratual
6. Implementar sistema de busca e filtros avançados

## 3. Fundamentação Teórica

### Gestão de Contratos
A gestão de contratos é um processo crítico que envolve:
- Acompanhamento contínuo de prazos e condições
- Garantia de conformidade legal
- Minimização de riscos operacionais
- Otimização de recursos

### Tecnologias Utilizadas

#### Frontend
- **React com TypeScript**
  - Desenvolvimento de interfaces modernas e responsivas
  - Tipagem forte para maior segurança no código
  - Componentização para reusabilidade

- **Tailwind CSS**
  - Estilização ágil e moderna
  - Design responsivo
  - Customização flexível

- **Shadcn/UI**
  - Componentes pré-construídos
  - Consistência visual
  - Acessibilidade

- **Recharts**
  - Visualização de dados dinâmicos
  - Gráficos interativos
  - Dashboard analítico

#### Backend (Planejado)
- **Django REST Framework**
  - API RESTful
  - Autenticação e autorização
  - Validação de dados

- **PostgreSQL**
  - Banco de dados relacional
  - Integridade referencial
  - Consultas complexas

## 4. Requisitos do Sistema

### 4.1 Requisitos Funcionais

#### RF001 - Gestão de Contratos
- Cadastrar novos contratos
- Editar contratos existentes
- Excluir contratos
- Visualizar detalhes dos contratos
- Gerar PDF dos contratos
- Renovar contratos
- Finalizar contratos

#### RF002 - Gestão de Pessoas Físicas
- Cadastrar pessoas físicas
- Editar cadastros existentes
- Excluir cadastros
- Validar CPF
- Verificar duplicidade de cadastros
- Vincular a contratos

#### RF003 - Gestão de Pessoas Jurídicas
- Cadastrar pessoas jurídicas
- Editar cadastros existentes
- Excluir cadastros
- Validar CNPJ
- Verificar duplicidade de cadastros
- Vincular a contratos

#### RF004 - Sistema de Alertas
- Monitorar datas de vencimento
- Gerar alertas automáticos
- Notificar usuários
- Permitir configuração de períodos
- Categorizar por prioridade
- Marcar alertas como lidos

#### RF005 - Autenticação e Autorização
- Realizar login no sistema
- Gerenciar perfis de usuário
- Controlar permissões de acesso
- Alterar senha
- Recuperar senha
- Registrar logs de acesso

### 4.2 Requisitos Não Funcionais

#### RNF001 - Usabilidade
- Interface intuitiva e responsiva
- Tempo de resposta inferior a 2 segundos
- Compatibilidade com principais navegadores
- Design adaptativo para diferentes dispositivos
- Feedback visual para ações do usuário

#### RNF002 - Segurança
- Criptografia de dados sensíveis
- Autenticação por token JWT
- Proteção contra SQL Injection
- Validação de entrada de dados
- Registro de logs de atividades

#### RNF003 - Disponibilidade
- Sistema disponível 24/7
- Tempo de uptime mínimo de 99%
- Backup diário dos dados
- Plano de recuperação de desastres
- Monitoramento contínuo

#### RNF004 - Desempenho
- Carregamento de páginas em até 3 segundos
- Suporte a múltiplos usuários simultâneos
- Otimização de consultas ao banco de dados
- Cache de dados frequentemente acessados
- Paginação de resultados extensos

#### RNF005 - Manutenibilidade
- Código documentado
- Arquitetura modular
- Padrões de projeto definidos
- Versionamento de código
- Testes automatizados

## 5. Produto Desenvolvido

### Principais Funcionalidades

#### Dashboard
- Resumo visual de contratos
- Gráficos de status
- Indicadores de performance

#### Sistema de Alertas
- Verde: Contratos com mais de 120 dias
- Laranja: Contratos com até 60 dias
- Vermelho: Contratos próximos ao vencimento (30 dias ou menos)

#### Gestão de Contratos
- Cadastro completo
- Busca avançada
- Renovação automatizada
- Geração de documentos

#### Gestão de Pessoas
- Cadastro de pessoas físicas
- Cadastro de pessoas jurídicas
- Vinculação com contratos

## 6. Resultados e Discussão

### Benefícios Alcançados
1. Automatização de processos manuais
2. Redução de erros operacionais
3. Maior eficiência na gestão de prazos
4. Melhor visibilidade do status dos contratos

### Desafios Encontrados
1. Complexidade na implementação de regras de negócio
2. Necessidade de interface intuitiva
3. Performance com grande volume de dados

## 7. Considerações Finais

### Conclusões
O SWCI representa uma solução moderna e eficiente para:
- Gestão automatizada de contratos
- Monitoramento de prazos
- Suporte à tomada de decisões
- Aumento da produtividade organizacional

### Trabalhos Futuros
1. Integração com IA para previsão de vencimentos críticos
2. Expansão para outros tipos de contratos
3. Implementação de módulos adicionais
4. Integração com sistemas externos

## 8. Referências

1. FOWLER, Martin. UML Distilled: A Brief Guide to the Standard Object Modeling Language. 3rd Edition. Addison-Wesley Professional, 2003.

2. GAMMA, Erich et al. Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley Professional, 1994.

3. REACT TEAM. React Documentation. Disponível em: https://react.dev/. Acesso em: 10 jan. 2024.

4. TAILWIND CSS. Tailwind CSS Documentation. Disponível em: https://tailwindcss.com/docs. Acesso em: 10 jan. 2024.

5. TYPESCRIPT TEAM. TypeScript Documentation. Disponível em: https://www.typescriptlang.org/docs/. Acesso em: 10 jan. 2024.

6. DJANGO SOFTWARE FOUNDATION. Django Documentation. Disponível em: https://docs.djangoproject.com/. Acesso em: 10 jan. 2024.
