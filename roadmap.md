# Roadmap SWGCM

## Fase 1 — Segurança (bloqueadores)
- [ ] Remover credenciais admin fixas de `src/hooks/useAuth.tsx`
- [ ] Refazer RLS de contracts / legal_persons / physical_persons / contract_alerts (fechar acesso anon)
- [ ] Impedir auto-promoção de `role`/`permissions` na tabela `users`
- [ ] Unificar fonte de papel (users.role x user_roles) e ajustar funções
- [ ] Remover triggers duplicados (alertas 4x, updated_at 2x)
- [ ] Aplicar `allowedRoles` nas rotas admin + criar página `/unauthorized`

## Fase 2 — Contratos
- [ ] Histórico de modificações (`contract_history` + trigger + aba no modal)
- [ ] Versionamento (`contract_versions` com snapshot JSONB)
- [ ] Filtros avançados na lista de contratos
- [ ] Mecanismo de aprovação de contratos
- [ ] Assinatura digital ligada ao contrato real + hash no PDF

## Fase 3 — Dashboard e formulários
- [ ] Novos gráficos (evolução mensal, top fornecedores, natureza de despesa)
- [ ] Análise financeira (contratado vs. a vencer, ticket médio)
- [ ] Badge de alertas críticos no menu
- [ ] Dashboard por perfil de usuário
- [ ] Validação em tempo real + máscaras (CPF/CNPJ/CEP/moeda)
- [ ] Rascunhos de formulário (autosave local)
- [ ] Exportação Excel/CSV das listas
- [ ] Edição em massa

## Fase 4 — Higiene e operação
- [ ] Remover `src/services/api.ts` e imports mortos em `App.tsx`
- [ ] Remover página demo de assinatura digital
- [ ] Gravar `auth_logs` em login/logout
- [ ] Ativar Leaked Password Protection e atualizar Postgres (painel Supabase)
- [ ] Dump de backup antes da apresentação

## Trabalhos futuros (fora do protótipo)
- Widgets personalizáveis, importação Excel com mapeamento, 2FA, notificações por e-mail
