# Pendências e Melhorias do Sistema SWGCM

Atualizado em: setembro/2026

Prioridade definida: **deixar o sistema funcionando de ponta a ponta** no fluxo CAO
(Cadastro, Acompanhamento e Organização de contratos). Novas funcionalidades grandes
e o endurecimento de segurança vêm depois.

---

## Decisões — não serão implementados agora
- **Autenticação em dois fatores (2FA)**
- **Assinatura digital de contratos** (fica apenas a página de demonstração já existente)
- **Recuperação de senha**

Motivo: preferência por estabilizar o que existe antes de acrescentar funcionalidades.

---

## Concluído
- Autenticação com Supabase Auth e perfil em `public.users`
- Cadastro de contratos vinculando contratante, contratada, representante e testemunhas reais
- Edição de contrato pela lista e pela rota própria de edição
- Validação de formulários (contrato, pessoa física, pessoa jurídica, usuários)
- Lista de contratos com busca (número, objeto, empresa, CNPJ), filtros por situação,
  período de vencimento e faixa de valor, ordenação por coluna e total somado
- Abas **Ativos / Finalizados / Todos** na lista de contratos
- Exportação CSV da lista de contratos (abre no Excel)
- Geração de PDF do contrato
- Upload de anexos do contrato
- Busca automática de dados da empresa por CNPJ (BrasilAPI) no cadastro de pessoa jurídica
- Alertas de contratos com cards, prioridades e modal de resolução (aditivo, finalizar, cancelar)
- Aviso com a contagem de contratos vencendo em até 30 dias no menu lateral
- Dashboard com gráficos, projeção de gastos e notificação de vencimentos ao entrar
- Remoção de código morto (`src/services/api.ts` e imports sem rota)

---

## Pendências — Contratos (prioridade)
- [ ] Histórico de alterações do contrato (quem alterou, o que e quando)
- [ ] Edição em massa na lista
- [ ] Mecanismo de aprovação de contratos
- [ ] Versionamento de contratos (trabalho futuro)

## Pendências — Pessoas e formulários
- [ ] Exportação CSV nas listas de pessoas físicas e jurídicas
- [ ] Rascunho automático dos formulários longos
- [ ] Importação de planilha Excel com mapeamento de colunas (trabalho futuro)

## Pendências — Dashboard
- [ ] Gráficos adicionais: evolução mensal, top fornecedores, natureza de despesa
- [ ] Análise financeira: contratado vs. a vencer, ticket médio
- [ ] Dashboard específico por perfil de usuário
- [ ] Widgets personalizáveis (trabalho futuro)

## Pendências — Usuários
- [ ] Edição de usuários existentes
- [ ] Política mínima de senha no cadastro

## Pendências — Segurança (fase posterior)
- [ ] Remover credenciais fixas do código de autenticação
- [ ] Refechar as políticas RLS de contratos, pessoas e alertas
- [ ] Impedir que o próprio usuário altere seu papel/permissões
- [ ] Unificar a fonte do papel do usuário (`users.role` x `user_roles`)
- [ ] Restringir rotas administrativas por papel + página de acesso negado
- [ ] Gravar registros de auditoria em login/logout
- [ ] Ativar proteção contra senhas vazadas e atualizar o Postgres (painel Supabase)

## Pendências — Banco de dados
- [ ] Remover triggers duplicados (alertas gerados em excesso e `updated_at` duplicado)
- [ ] Rotina de backup/dump periódico
