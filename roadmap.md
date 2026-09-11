# Roadmap SWGCM

Prioridade atual definida pelo usuário: **sistema funcionando (CAO — Cadastro, Acompanhamento e Organização)**.
Segurança e novas funcionalidades grandes ficam para depois.

## Fora do escopo agora (decisão do usuário)
- 2FA
- Assinatura digital de contratos (permanece apenas a página de demonstração)
- Recuperação de senha

## Fase A — Fluxo CAO funcional (em andamento)
- [x] Cadastro de contratos com vínculo real de contratante, contratada, representante e testemunhas
- [x] Edição de contrato pela lista e pela rota `/contracts/edit/:id`
- [x] Validação dos formulários de contrato (cadastro e modal de edição)
- [x] Lista de contratos com busca, filtros avançados, ordenação e total somado
- [x] Exportação CSV (abre no Excel) da lista de contratos
- [x] Abas Ativos / Finalizados / Todos
- [x] Aviso com contagem de contratos críticos no menu (Alertas de Contratos)
- [x] Busca automática de empresa por CNPJ (BrasilAPI) no cadastro de pessoa jurídica
- [x] Geração de PDF do contrato
- [x] Upload de anexos do contrato
- [x] Histórico de alterações do contrato (quem alterou o que e quando)
- [x] Exportação CSV nas listas de pessoas físicas e jurídicas
- [x] Alertas de contrato com pedido de resolução e conferência de duas pessoas
- [x] Criação de usuários pela função administrativa (Geovanna e Vitória com login ativo)
- [ ] Edição em massa na lista de contratos
- [ ] Rascunho automático dos formulários longos

## Fase B — Dashboard e organização
- [ ] Gráficos adicionais (evolução mensal, top fornecedores, natureza de despesa)
- [ ] Análise financeira (contratado vs. a vencer, ticket médio)
- [ ] Dashboard por perfil de usuário
- [ ] Mecanismo de aprovação de contratos

## Fase C — Segurança (depois que tudo funcionar)
- [ ] Remover credenciais fixas de `src/hooks/useAuth.tsx`
- [ ] Refazer RLS de contracts / legal_persons / physical_persons / contract_alerts
- [ ] Impedir auto-promoção de `role`/`permissions` na tabela `users`
- [ ] Unificar fonte de papel (users.role x user_roles)
- [ ] Aplicar `allowedRoles` nas rotas admin + página `/unauthorized`
- [ ] Gravar `auth_logs` em login/logout
- [ ] Ativar Leaked Password Protection e atualizar Postgres (painel Supabase)

## Fase D — Higiene
- [x] Remover `src/services/api.ts` e imports mortos em `App.tsx`
- [ ] Remover triggers duplicados no banco (alertas e updated_at)
- [ ] Remover página demo de assinatura digital quando a real for feita
- [ ] Dump de backup periódico

## Trabalhos futuros
- Widgets personalizáveis, importação Excel com mapeamento, notificações por e-mail, versionamento de contratos
