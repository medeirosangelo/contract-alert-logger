-- REFAZER COMPLETAMENTE O SISTEMA DE USUÁRIOS (versão com CASCADE)

-- 1) Limpar policies conflitantes
DROP POLICY IF EXISTS "Users can read own user" ON public.users;
DROP POLICY IF EXISTS "Admins and Managers can read all users" ON public.users;
DROP POLICY IF EXISTS "Users can insert own user" ON public.users;
DROP POLICY IF EXISTS "Users can update own user" ON public.users;
DROP POLICY IF EXISTS "Admins can insert users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Admins can delete users" ON public.users;
DROP POLICY IF EXISTS "admin_full_access" ON public.users;
DROP POLICY IF EXISTS "user_read_own" ON public.users;
DROP POLICY IF EXISTS "user_update_own" ON public.users;

-- 2) Limpar dados das tabelas relacionadas primeiro 
TRUNCATE TABLE public.contract_alerts CASCADE;
TRUNCATE TABLE public.auth_logs CASCADE;
TRUNCATE TABLE public.user_sessions CASCADE;
TRUNCATE TABLE public.document_uploads CASCADE;

-- 3) Limpar tabela users 
TRUNCATE TABLE public.users CASCADE;

-- 4) Recriar estrutura da tabela users de forma limpa
DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'colaborador' CHECK (role IN ('admin', 'gestor', 'colaborador')),
  permissions JSONB NOT NULL DEFAULT '{"dashboard": true, "contracts": false, "users": false, "edit": false}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5) Ativar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 6) Criar trigger para updated_at
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 7) Criar policies funcionais - versão simplificada
CREATE POLICY "users_select_own_or_admin" ON public.users
FOR SELECT
TO authenticated
USING (
  id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "users_insert_admin_only" ON public.users
FOR INSERT
TO authenticated
WITH CHECK (
  -- Permitir inserção se for admin ou se for o primeiro usuário
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin') OR
  (SELECT COUNT(*) FROM public.users) = 0 OR
  id = auth.uid()
);

CREATE POLICY "users_update_own_or_admin" ON public.users
FOR UPDATE
TO authenticated
USING (
  id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "users_delete_admin_only" ON public.users
FOR DELETE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- 8) Inserir usuários existentes
INSERT INTO public.users (
  id, 
  email, 
  name, 
  username, 
  role, 
  permissions
) VALUES 
(
  '7ed92b9d-99dd-4fed-9516-6321c9096e25'::uuid,
  'medeirosangelogabriel@gmail.com',
  'medeirosangelo',
  'medeirosangelogabriel',
  'admin',
  '{"dashboard": true, "contracts": true, "users": true, "edit": true}'::jsonb
),
(
  'eb003ab1-272a-48bc-ac58-0311602b715f'::uuid,
  'geovanna@gmail.com',
  'geovanna',
  'geovanaa',
  'admin',
  '{"dashboard": true, "contracts": true, "users": true, "edit": true}'::jsonb
),
(
  '630e5517-807e-48d1-96ba-482e325aca51'::uuid,
  'jinny@gmail.com',
  'jinny',
  'jinny',
  'admin',
  '{"dashboard": true, "contracts": true, "users": true, "edit": true}'::jsonb
);