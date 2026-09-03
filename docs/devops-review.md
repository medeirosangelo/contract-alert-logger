# Revisão DevOps do SWGCM — Estado Real e Plano de Finalização

Data da revisão: setembro/2026
Escopo: fluxos de autenticação/autorização, banco (RLS, triggers), rotas, formulários, dados e código morto.

---

## 1. Diagnóstico atual (fatos medidos)

### Dados no banco
| Tabela | Registros | Observação |
|---|---|---|
| contracts | 7 | ok para defesa |
| contract_alerts | 9 | 2 contratos com alerta duplicado (00005, 00007) |
| legal_persons | 9 | ok |
| physical_persons | 7 | ok |
| users | 4 | ok |
| contract_signatures | 0 | funcionalidade existe, nunca usada |
| document_uploads | 0 | upload existe, nunca usado |
| user_roles | 0 | tabela **inútil hoje** (papel vive em `users.role`) |
| auth_logs | 0 | auditoria implementada mas não gravando |

### Código
- 24 páginas, 13 serviços, ~5.100 linhas em `src/pages` + `ContractForm`.
- Validação Zod existe em: `ContractForm`, `LegalPersonForm`, `PhysicalPersonForm`, `UserManagement`.
- Sem testes automatizados, sem CI, sem lint gate.

---

## 2. Bloqueadores (corrigir antes de publicar)

### B1 — Credenciais fixas no código do front (CRÍTICO)
`src/hooks/useAuth.tsx` contém usuário, e-mail e **senha do admin em texto puro**. Isso vai para o bundle público — qualquer visitante pode ler no navegador. Precisa sair e o login passar 100% pelo Supabase Auth.

### B2 — Escalada de privilégio pela tabela `users` (CRÍTICO)
A política `users_update_self_or_admin` permite `UPDATE` da própria linha, **incluindo a coluna `role` e `permissions`**. Qualquer usuário autenticado pode se promover a admin. Correção: mover papel para `user_roles` + função `has_role()`, ou bloquear a alteração de `role`/`permissions` por trigger para não-admin.

### B3 — RLS aberta (CRÍTICO)
`contracts`, `legal_persons`, `physical_persons`, `contract_alerts` têm políticas `USING (true)` / `CHECK (true)` para `SELECT/INSERT/UPDATE/DELETE`, inclusive para `anon`. Ou seja: **sem login é possível ler e apagar contratos**. Correção: remover as políticas "Enable ... for all users" e manter apenas regras por `auth.uid()` / papel.

### B4 — Duas fontes de verdade de papel
`users.role` (usada pelo app) vs `user_roles` (vazia, usada por `current_user_role()`). Funções `is_admin()`/`get_current_user_role()` leem `users`, outra lê `user_roles`. Isso já causou os bugs de "lista de usuários vazia". Escolher **uma** fonte.

### B5 — Triggers duplicados
- `contracts`: `create_contract_alerts_trigger` (3 alertas) + `create_contract_end_alert_trigger` (1 alerta) = **4 alertas por contrato novo**.
- `contracts`, `legal_persons`, `physical_persons`: dois triggers de `updated_at` cada.
Correção: dropar `create_contract_end_alert_trigger` e os `set_updated_at` redundantes.

### B6 — Autorização de rota inexistente
`ProtectedRoute` aceita `allowedRoles`, mas **nenhuma rota passa esse parâmetro**. Colaborador acessa `/users/management`, `/users/permissions`, `/admin-users`. `permissions` do usuário não filtra nada no menu. Rota `/unauthorized` é referenciada mas não existe (cai no `*` → `/home`).

### B7 — Código morto / inconsistente
- `src/services/api.ts`: axios apontando para `http://localhost:8000/api` — não é usado por nada.
- `App.tsx` importa `UseCases`, `UseCaseDiagram`, `UseCaseActors`, `ClassDiagram` sem rota (imports mortos no bundle).
- `/digital-signature-demo` é página de demonstração, não fluxo real do contrato.

---

## 3. Backlog solicitado → o que falta de verdade

### Contratos
| Item | Situação | Falta |
|---|---|---|
| Histórico de modificações | ❌ inexistente | tabela `contract_history` + trigger de auditoria + aba "Histórico" no modal |
| Filtros avançados | ⚠️ só abas ativos/finalizados | busca por texto, faixa de valor, período, empresa, status |
| Aprovação de contratos | ❌ | coluna `approval_status`, tabela `contract_approvals`, ação restrita a admin/gestor |
| Assinatura digital | ⚠️ existe (hash SHA-256) mas 0 uso e só em página demo | ligar `ContractSignaturePanel` ao contrato real e exibir no PDF |
| Versionamento | ❌ | `contract_versions` (snapshot JSONB por alteração) + comparação |

### Dashboard
| Item | Situação | Falta |
|---|---|---|
| Mais gráficos | ⚠️ 4 componentes | evolução mensal, top fornecedores, distribuição por natureza de despesa |
| Dashboard por perfil | ❌ | render condicional por papel (admin/gestor/colaborador) |
| Widgets personalizáveis | ❌ | preferências por usuário (escopo alto — sugiro cortar do TCC) |
| Análise financeira | ⚠️ parcial | valor contratado vs. a vencer, ticket médio, reajuste projetado |
| Alertas visuais críticos | ⚠️ toast + cores | badge no menu com contagem de alertas ≤30 dias |

### Formulários
| Item | Situação | Falta |
|---|---|---|
| Validação em tempo real | ⚠️ Zod no submit | `mode: "onChange"`, máscaras CPF/CNPJ/CEP/moeda, mensagens inline |
| Autopreenchimento por API | ✅ ViaCEP | opcional: CNPJ (BrasilAPI) |
| Rascunhos | ❌ | autosave em `localStorage` por formulário |
| Edição em massa | ❌ | seleção múltipla na lista + ação em lote |
| Import/export Excel | ❌ | export com `xlsx` (rápido) / import com validação (médio) |

---

## 4. Ordem recomendada de execução

**Fase 1 — Segurança (obrigatória, ~1 rodada)**
1. Remover credenciais fixas do `useAuth`.
2. Refazer RLS de `contracts`, `legal_persons`, `physical_persons`, `contract_alerts` (somente autenticado; escrita por papel).
3. Bloquear auto-promoção de papel em `users`.
4. Unificar fonte de papel + limpar triggers duplicados.
5. Aplicar `allowedRoles` nas rotas administrativas + página `/unauthorized`.

**Fase 2 — Contratos (maior valor para a banca)**
6. `contract_history` + `contract_versions` com trigger de auditoria e aba no modal.
7. Filtros avançados na lista.
8. Fluxo de aprovação.
9. Assinatura digital no contrato real + hash no PDF.

**Fase 3 — Dashboard e formulários**
10. Gráficos adicionais + análise financeira + badge de alertas.
11. Dashboard por perfil.
12. Validação em tempo real com máscaras, rascunhos, export Excel.

**Fase 4 — Higiene**
13. Remover `services/api.ts`, imports mortos, página demo de assinatura.
14. Gravar `auth_logs` no login/logout (a auditoria do TCC precisa de dados).
15. Ativar "Leaked Password Protection" e atualizar versão do Postgres (painel Supabase — só você pode).

**Cortar do escopo do protótipo:** widgets personalizáveis, importação Excel com mapeamento, 2FA. Justificável na defesa como "trabalhos futuros".

---

## 5. Riscos de infraestrutura (fora do código)
- Postgres com patches de segurança pendentes.
- Proteção contra senhas vazadas desativada.
- Sem backup/rollback documentado — exportar dump antes da apresentação.
- Sem CI: nenhum gate de build/lint antes do deploy.
