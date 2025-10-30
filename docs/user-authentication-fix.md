# Correção do Sistema de Autenticação

## Problema Identificado

O sistema tinha uma inconsistência crítica entre a tabela `users` e o Supabase Authentication.

### Sintomas
1. ❌ Login falhando com "Invalid credentials" mesmo com usuário cadastrado
2. ❌ Lista de usuários vazia na página de gerenciamento
3. ⚠️ Confusão sobre as 3 tabelas de usuários

## Causa Raiz

### 1. Funções SQL Incorretas
As funções `get_current_user_role()` e `is_admin()` buscavam na tabela `user_roles` (vazia), mas o role está armazenado na tabela `users`.

**Correção Aplicada:**
```sql
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$;
```

### 2. Usuários Sem Credenciais de Autenticação
Usuários criados diretamente na tabela `users` não têm registro no `auth.users` do Supabase, impedindo o login.

## Arquitetura Correta do Sistema

### Tabelas de Usuários

#### 1. `auth.users` (Gerenciada pelo Supabase)
- Armazena credenciais de login (email/senha)
- Gerencia tokens de autenticação
- **NÃO deve ser acessada diretamente pela aplicação**

#### 2. `public.users` (Tabela Principal)
- Perfil completo do usuário
- Campos: `id`, `name`, `email`, `username`, `role`, `permissions`
- Sincronizada automaticamente com `auth.users` via trigger

#### 3. `public.user_roles` ⚠️ **OBSOLETA**
- Tabela antiga não mais utilizada
- **Recomendação**: Remover do banco

#### 4. `public.user_sessions`
- Rastreia sessões ativas dos usuários
- Útil para auditoria e segurança

## Fluxo Correto de Criação de Usuários

### ✅ Método Correto: Edge Function `create-user`

1. Usuário admin acessa `/admin-user-creation`
2. Preenche formulário com dados do novo usuário
3. Edge function cria:
   - Registro em `auth.users` (credenciais)
   - Registro em `users` (perfil)
   - Registro em `user_roles` (se necessário)
4. Trigger automático sincroniza as tabelas

```typescript
// Exemplo de chamada
const { data, error } = await supabase.functions.invoke('create-user', {
  body: {
    email: 'geovanna@tcc.com',
    password: 'Geovanna123',
    name: 'Geovanna',
    role: 'gestor'
  }
});
```

### ❌ Método Incorreto

**NÃO inserir diretamente na tabela `users`:**
```sql
-- ERRADO! Não faça isso
INSERT INTO users (id, email, name, role) 
VALUES (gen_random_uuid(), 'user@email.com', 'Nome', 'colaborador');
```

Isso cria um usuário sem credenciais, que não consegue fazer login.

## Políticas RLS (Row Level Security)

As políticas RLS da tabela `users` agora funcionam corretamente:

```sql
-- Usuários podem ver a si mesmos ou admins veem todos
CREATE POLICY "users_select_self_or_admin" 
ON public.users 
FOR SELECT 
USING ((id = auth.uid()) OR is_admin());
```

A função `is_admin()` agora busca corretamente o role da tabela `users`.

## Como Corrigir Usuários Existentes

### Cenário: Usuários já existem na tabela `users` mas não conseguem logar

**Opção 1: Recriar os usuários** (Recomendado)
1. Deletar registros da tabela `users`
2. Usar `/admin-user-creation` para recriar corretamente

**Opção 2: Criar credenciais manualmente**
1. Criar usuário no Supabase Dashboard (Authentication > Users)
2. Atualizar o `id` na tabela `users` para corresponder ao `id` do auth.users

## Credenciais para Testes

Após correção, use estas credenciais:

- **Geovanna**: 
  - Email: `geovanna@tcc.com`
  - Senha: `Geovanna123`

- **Vitória**: 
  - Email: `vitoria@tcc.com`
  - Senha: `Vitoria123`

## Próximos Passos

1. ✅ Funções SQL corrigidas
2. ⏳ Testar login após recriar usuários via `/admin-user-creation`
3. ⏳ Verificar se lista de usuários aparece
4. ⏳ Considerar remover tabela `user_roles` obsoleta

## Segurança

⚠️ **Importante**: Sempre usar a edge function para criar usuários. Ela garante:
- Senhas hasheadas corretamente
- Permissões padrão atribuídas
- Sincronização entre auth.users e users
- Logs de auditoria (auth_logs)
