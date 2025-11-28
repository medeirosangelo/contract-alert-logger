# Roteiro de Apresentação TCC - SWGCM
## Sistema Web para Gestão de Contratos e Monitoramento de Produtividade

**Autores:** Ângelo Gabriel Medeiros, Geovanna de Araújo Saldanha, Vitória Kaylanne Martins Gomes  
**Orientador:** Prof. Me. Pierre da Costa Viana Júnior  
**Instituição:** Instituto Federal de Roraima - Campus Boa Vista

---

## 📋 ROTEIRO COMPLETO DA APRESENTAÇÃO (20 minutos)

### 1. INTRODUÇÃO (2 minutos)

**Apresentação Pessoal:**
- "Boa tarde/Bom dia, membros da banca examinadora"
- "Sou [Nome], juntamente com [Nomes dos colegas]"
- "Apresentaremos hoje o TCC: SWGCM - Sistema Web para Gestão de Contratos e Monitoramento de Produtividade"

**Contextualização:**
> "A gestão de contratos em instituições públicas é um processo crítico que envolve múltiplas etapas após o processo licitatório. Problemas comuns incluem:
> - Perda de prazos de vencimento
> - Falta de centralização de informações
> - Dificuldade no acompanhamento da execução
> - Retrabalho e falhas humanas na gestão manual"

**Transição:** "Foi com base nessa problemática que desenvolvemos o SWGCM..."

---

### 2. PROBLEMA DE PESQUISA (1 minuto)

**Enuncie claramente:**
> "De que forma um sistema web pode apoiar as organizações internas no cadastro, acompanhamento e controle de contratos após o processo licitatório, reduzindo falhas humanas e melhorando a produtividade interna?"

**Justificativa:**
- Necessidade de automatização
- Redução de erros operacionais
- Melhoria na tomada de decisões
- Aumento da transparência e eficiência

---

### 3. OBJETIVOS (2 minutos)

#### **Objetivo Geral:**
> "Desenvolver um sistema web para gestão integrada de contratos, promovendo eficiência organizacional e suporte à tomada de decisões estratégicas através de uma interface intuitiva e funcionalidades automatizadas."

#### **Objetivos Específicos:**
1. ✅ **Criar sistema de alertas automatizados** para contratos próximos ao vencimento
2. ✅ **Implementar dashboard interativo** para visualização de contratos e produtividade
3. ✅ **Desenvolver interfaces intuitivas** para cadastro e acompanhamento de contratos
4. ✅ **Gerar relatórios detalhados** sobre o status dos contratos
5. ✅ **Automatizar o processo** de renovação contratual
6. ✅ **Implementar sistema de busca** e filtros avançados

**Dica:** Mostre que TODOS os objetivos foram alcançados! ✅

---

### 4. FUNDAMENTAÇÃO TEÓRICA (3 minutos)

#### **4.1 Gestão de Contratos**
- Conceito e importância
- Ciclo de vida do contrato
- Desafios na gestão pública

#### **4.2 Sistemas de Informação**
- Papel dos sistemas na gestão organizacional
- Benefícios da automatização
- Sistemas web e acessibilidade

#### **4.3 Tecnologias Utilizadas**
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Edge Functions)
- **Arquitetura:** SPA (Single Page Application)
- **Segurança:** JWT, RLS (Row Level Security), Criptografia

**Transição:** "Com base nessa fundamentação, passemos à metodologia..."

---

### 5. METODOLOGIA (2 minutos)

#### **Design Science Research (DSR)**
- "Utilizamos a metodologia DSR, adequada para desenvolvimento de artefatos tecnológicos"

**Etapas seguidas:**
1. **Identificação do Problema:** Gestão ineficiente de contratos
2. **Definição de Objetivos:** Sistema web automatizado
3. **Projeto e Desenvolvimento:** Prototipagem iterativa
4. **Demonstração:** Protótipo funcional
5. **Avaliação:** Validação de requisitos

#### **Técnicas de Coleta de Dados:**
- Revisão bibliográfica
- Análise de sistemas similares
- Levantamento de requisitos

---

### 6. PRODUTO DESENVOLVIDO (6 minutos)

#### **6.1 Arquitetura do Sistema (1 min)**

**Camadas do Sistema:**
```
┌─────────────────────────────────────┐
│     Camada de Apresentação          │
│  (React + TypeScript + Tailwind)    │
├─────────────────────────────────────┤
│     Camada de Negócio               │
│  (Services + Hooks + Validações)    │
├─────────────────────────────────────┤
│     Camada de Dados                 │
│  (Supabase + PostgreSQL + Auth)     │
└─────────────────────────────────────┘
```

#### **6.2 Diagrama de Casos de Uso (2 min)**

**Atores:**
1. **Administrador** (acesso total)
2. **Gestor/Colaborador** (acesso limitado)

**Principais Casos de Uso:**
- Gerenciar Contratos (CRUD completo)
- Gerenciar Pessoas (Físicas e Jurídicas)
- Visualizar Dashboard e Relatórios
- Gerenciar Alertas Automatizados
- Gerenciar Usuários e Permissões
- Assinar Digitalmente Contratos

**[DEMONSTRE NO SISTEMA]:**
- Faça login como administrador
- Mostre o dashboard
- Navegue para Gerenciar Contratos

#### **6.3 Diagrama de Classes (2 min)**

**5 Classes Principais:**

1. **Contrato** (núcleo do sistema)
   - Atributos: número, objeto, valor, datas, status
   - Métodos: criar(), atualizar(), gerarPDF(), calcularVencimento()

2. **Pessoa Física**
   - Atributos: CPF, nome, endereço, contatos
   - Papel: testemunhas, contratados

3. **Pessoa Jurídica**
   - Atributos: CNPJ, razão social, representante legal
   - Papel: contratante/contratado

4. **Alerta de Contrato**
   - Criação automática via trigger
   - Priorização por dias restantes

5. **Usuário**
   - Gerencia todas as entidades
   - Controle de acesso (RBAC)

**Relacionamentos:**
- Contrato 1:N Pessoas (físicas e jurídicas)
- Contrato 1:N Alertas
- Usuário gerencia todas as entidades

**[MOSTRE O BANCO DE DADOS]** (opcional)

#### **6.4 Funcionalidades Implementadas (1 min)**

✅ **Autenticação e Autorização:**
- Login JWT com sessões
- Controle de acesso por perfil (RBAC)
- Logs de auditoria

✅ **Gestão de Contratos:**
- Cadastro completo de contratos
- Edição e exclusão
- Geração de PDF
- Assinatura digital (SHA-256)

✅ **Alertas Automatizados:**
- Sistema de alertas por vencimento
- Priorização automática (alta/média/baixa)
- Dashboard de alertas pendentes

✅ **Dashboard Analítico:**
- Cards de resumo
- Gráficos interativos (Recharts)
- Filtros por período e tipo

✅ **Gestão de Pessoas:**
- Cadastro de pessoas físicas e jurídicas
- Validação de CPF/CNPJ
- Integração com ViaCEP

---

### 7. DEMONSTRAÇÃO DO SISTEMA (4 minutos)

#### **Roteiro de Demo:**

**[TELA 1] Login (30 segundos)**
- Entre com credenciais de administrador
- Destaque a segurança (JWT)

**[TELA 2] Dashboard (1 minuto)**
- Mostre os cards de resumo
- Interaja com os gráficos
- Destaque os alertas críticos

**[TELA 3] Alertas de Contratos (1 minuto)**
- Mostre a página de alertas melhorada
- Destaque as prioridades (cores)
- Mostre estatísticas (críticos, pendentes, resolvidos)
- Resolva um alerta

**[TELA 4] Gerenciamento de Contratos (1 minuto)**
- Liste contratos cadastrados
- Abra os detalhes de um contrato
- Gere o PDF do contrato
- Mostre a assinatura digital

**[TELA 5] Gestão de Usuários (30 segundos)**
- Mostre a lista de usuários
- Destaque os diferentes perfis
- Mostre as permissões granulares

---

### 8. REQUISITOS NÃO FUNCIONAIS (2 minutos)

#### **RNF01 - Usabilidade** ✅
- Interface responsiva (mobile, tablet, desktop)
- Design intuitivo com shadcn/ui
- Feedback visual em todas as ações

#### **RNF02 - Segurança** ✅
- Autenticação JWT
- Criptografia de senhas
- Row Level Security (RLS)
- Logs de auditoria
- Validação de entrada (client + server)

#### **RNF03 - Disponibilidade** ⚠️
- Hospedagem em Supabase (99.9% uptime)
- Backups automáticos diários
- **Nota:** Monitoramento avançado seria implementado em produção

#### **RNF04 - Desempenho** ✅
- Cache com TanStack Query
- Paginação em todas as listagens
- Queries otimizadas
- Code splitting automático

#### **RNF05 - Manutenibilidade** ✅
- Código modular e tipado (TypeScript)
- Documentação técnica completa
- Versionamento Git
- Padrões de projeto (Service Layer, Custom Hooks)

---

### 9. CONSIDERAÇÕES FINAIS (2 minutos)

#### **Resultados Alcançados:**
✅ Todos os objetivos específicos foram cumpridos  
✅ Sistema funcional e estável  
✅ Interface intuitiva e responsiva  
✅ Segurança implementada (JWT, RLS, criptografia)  
✅ Alertas automatizados funcionais  
✅ Dashboard com métricas em tempo real  

#### **Contribuições do Trabalho:**
- Automatização da gestão de contratos
- Redução de erros operacionais
- Melhoria na tomada de decisões
- Aumento da produtividade interna
- Base para futuras melhorias

#### **Trabalhos Futuros:**
1. **Integração com APIs externas** (e-mail, SMS, WhatsApp)
2. **Módulo de licitações** completo
3. **Relatórios avançados** com BI
4. **Aplicativo mobile** nativo
5. **Assinatura digital avançada** (ICP-Brasil)
6. **Notificações push** em tempo real
7. **Integração com sistemas legados**

#### **Agradecimentos:**
- "Agradecemos ao orientador Prof. Pierre da Costa Viana Júnior"
- "Aos professores do IFRR"
- "À banca examinadora pela atenção"

**Encerramento:**
> "Estamos à disposição para responder perguntas."

---

## ❓ POSSÍVEIS PERGUNTAS DA BANCA

### 📊 SOBRE O SISTEMA

**P1: Por que escolheram essa stack tecnológica (React + Supabase)?**
**R:** 
- **React:** Framework mais popular, vasta comunidade, componentização, performance
- **TypeScript:** Segurança de tipos, redução de bugs, melhor manutenibilidade
- **Supabase:** Backend as a Service, reduz complexidade, auth integrado, RLS nativo
- **Tailwind CSS:** Produtividade, consistência, design system integrado

**P2: Como funciona a segurança do sistema?**
**R:**
- **Autenticação:** JWT (JSON Web Tokens) via Supabase Auth
- **Autorização:** RLS (Row Level Security) a nível de banco de dados
- **Criptografia:** Senhas criptografadas com bcrypt
- **Validação:** Client-side (React Hook Form + Zod) e Server-side
- **Auditoria:** Tabela auth_logs registra todos os acessos
- **Assinatura Digital:** Hash SHA-256 para garantir integridade dos contratos

**P3: Como funcionam os alertas automatizados?**
**R:**
- Criados via **trigger no banco de dados** ao cadastrar/atualizar contrato
- Lógica: alertas gerados para 60, 30 e 7 dias antes do vencimento
- **Priorização automática:**
  - Alta: ≤ 30 dias (vermelho)
  - Média: 31-60 dias (laranja)
  - Baixa: > 60 dias (verde)
- Dashboard exibe alertas críticos em destaque
- Usuários podem marcar como resolvidos

**P4: O sistema está pronto para produção?**
**R:**
- É um **protótipo funcional** com todas as funcionalidades principais implementadas
- **Para produção, seria necessário:**
  1. Testes automatizados (unitários, integração, E2E)
  2. Monitoramento avançado (Sentry, DataDog)
  3. CI/CD automatizado
  4. Documentação de API completa
  5. Performance testing e load testing
  6. Treinamento de usuários
  7. Plano de migração de dados

**P5: Como é feita a geração de PDF?**
**R:**
- Biblioteca **jsPDF**
- Gera PDF do contrato completo com:
  - Dados do contrato
  - Informações das partes (contratante/contratado)
  - Cláusulas e condições
  - Assinaturas digitais
- PDF pode ser baixado ou visualizado no navegador

**P6: Como o sistema garante a integridade dos dados?**
**R:**
- **Validações:** Client-side (Zod) e Server-side
- **Constraints:** No banco (UNIQUE, NOT NULL, Foreign Keys)
- **Triggers:** Atualização automática de timestamps
- **Transações:** ACID compliance do PostgreSQL
- **Assinatura Digital:** Hash SHA-256 garante que contrato não foi alterado

---

### 📐 SOBRE METODOLOGIA E DIAGRAMAS

**P7: Por que utilizaram Design Science Research?**
**R:**
- DSR é adequada para **desenvolvimento de artefatos tecnológicos**
- Foco em **resolver problemas práticos** através de soluções inovadoras
- Permite **iterações e melhorias** contínuas
- Amplamente reconhecida em pesquisas de TI/SI

**P8: O Diagrama de Casos de Uso está atualizado com o sistema?**
**R:**
- ✅ **SIM**, 100% alinhado
- Todos os casos de uso representados foram implementados
- Demonstramos funcionalmente durante a apresentação

**P9: Como garantem que os relacionamentos do Diagrama de Classes estão corretos no banco?**
**R:**
- **Foreign Keys** implementadas no PostgreSQL
- **Migrations versionadas** no Supabase
- **Validações** em múltiplas camadas
- **Testes** de integridade referencial

---

### 🎯 SOBRE REQUISITOS

**P10: Todos os RNFs foram implementados?**
**R:**
- **Usabilidade:** ✅ Completo (responsivo, intuitivo)
- **Segurança:** ✅ Completo (JWT, RLS, criptografia)
- **Disponibilidade:** ⚠️ Parcial (depende do Supabase, mas garantido 99.9% uptime)
- **Desempenho:** ✅ Completo (cache, paginação, otimizações)
- **Manutenibilidade:** ✅ Completo (código modular, documentado, TypeScript)

**P11: Por que não implementaram testes automatizados?**
**R:**
- Limitação de tempo e escopo do TCC
- Foco na implementação das funcionalidades principais
- Seria implementado em fase de produção
- **Futuro trabalho:** Jest, React Testing Library, Cypress

---

### 🔮 SOBRE TRABALHOS FUTUROS

**P12: Qual seria a próxima funcionalidade prioritária?**
**R:**
- **Integração com e-mail/SMS** para notificações automáticas
- **Módulo de licitações** completo (pré-contrato)
- **Relatórios avançados** com BI e exportação Excel/PDF

**P13: Como implementariam notificações em tempo real?**
**R:**
- **Supabase Realtime:** WebSockets para notificações push
- **Edge Functions:** Para envio de e-mails/SMS
- **Service Workers:** Para notificações browser

**P14: O sistema suporta múltiplas organizações (multi-tenant)?**
**R:**
- **Atualmente não**, foi desenvolvido para uma única organização
- **Implementação futura:** Coluna `organization_id` em todas as tabelas
- RLS seria ajustado para filtrar por organização

---

### 💻 PERGUNTAS TÉCNICAS AVANÇADAS

**P15: Por que não usaram Redux para gerenciamento de estado?**
**R:**
- **TanStack Query** já gerencia estado do servidor (cache, refetch, mutations)
- **React Context** para estado global simples (auth)
- Redux seria **overkill** para este escopo
- Mantém código mais simples e manutenível

**P16: Como funciona o RLS (Row Level Security)?**
**R:**
- Políticas de segurança **no nível do banco de dados**
- Exemplo: `auth.uid() = user_id` garante que usuário só vê seus próprios dados
- **Vantagens:**
  - Segurança no backend
  - Não depende de lógica do frontend
  - Protege contra ataques diretos ao banco

**P17: Como o sistema escala para muitos usuários simultâneos?**
**R:**
- **Supabase:** Infraestrutura escalável automaticamente
- **PostgreSQL:** Connection pooling
- **Cache:** TanStack Query reduz requisições ao servidor
- **CDN:** Assets estáticos servidos via CDN
- **Paginação:** Reduz carga de queries

**P18: Qual o diferencial do SWGCM comparado a sistemas comerciais?**
**R:**
- **Gratuito e open-source** (potencial)
- **Específico para gestão pública brasileira**
- **Interface moderna e intuitiva**
- **Alertas automatizados** customizáveis
- **Facilmente customizável** para necessidades específicas

---

### 🎓 PERGUNTAS SOBRE APRENDIZADO

**P19: Quais foram os principais desafios do projeto?**
**R:**
1. **Sincronização auth.users ↔ public.users**
2. **Implementação correta do RLS**
3. **Geração de PDF com formatação correta**
4. **Validação de CPF/CNPJ**
5. **Gerenciamento de estado complexo**

**P20: O que aprenderem de mais importante?**
**R:**
- **Arquitetura de software** na prática
- **Segurança de aplicações web**
- **Gerenciamento de banco de dados** (PostgreSQL)
- **Metodologia de pesquisa** (DSR)
- **Trabalho em equipe** e versionamento Git

---

## 🎬 DICAS FINAIS PARA A APRESENTAÇÃO

### ✅ O QUE FAZER:
1. **Seja confiante:** Você conhece o sistema!
2. **Demonstre funcionando:** Vale mais que mil palavras
3. **Seja honesto:** Se algo não foi implementado, explique o motivo
4. **Prepare backup:** Tenha prints/vídeos caso internet falhe
5. **Teste antes:** Garanta que tudo está funcionando

### ❌ O QUE NÃO FAZER:
1. **Não leia slides:** Use como apoio, não roteiro
2. **Não se desculpe demais:** "Desculpa, não ficou bom" ❌
3. **Não fale muito rápido:** Respire e seja claro
4. **Não discuta com a banca:** Aceite sugestões
5. **Não minta:** Se não sabe, diga "não implementamos isso"

---

## 📝 CHECKLIST FINAL

**Antes da Apresentação:**
- [ ] Testar sistema completo
- [ ] Verificar conexão com internet
- [ ] Preparar dados de exemplo no banco
- [ ] Revisar slides
- [ ] Ensaiar cronometragem (20 min)
- [ ] Preparar resposta para perguntas comuns
- [ ] Levar pendrive com backup

**Durante a Apresentação:**
- [ ] Manter contato visual com a banca
- [ ] Falar claramente e pausadamente
- [ ] Demonstrar o sistema funcionando
- [ ] Responder perguntas com calma
- [ ] Agradecer ao final

---

## 🌟 MENSAGEM FINAL

Vocês desenvolveram um **sistema completo e funcional** que resolve um problema real. A apresentação é apenas a formalização do excelente trabalho já realizado.

**Lembrem-se:**
- Todos os objetivos foram cumpridos ✅
- O sistema funciona ✅
- A documentação está completa ✅
- Vocês dominam o conteúdo ✅

**Boa sorte na apresentação! 🎓🚀**

Vocês estão prontos. Agora é só mostrar o que construíram!
