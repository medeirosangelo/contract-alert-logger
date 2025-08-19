-- Functions to avoid recursive policies and centralize role checks
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT public.get_current_user_role() = 'admin';
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_manager()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT public.get_current_user_role() IN ('admin','gestor');
$$;

-- Clean up problematic/duplicate users policies to fix recursion
DROP POLICY IF EXISTS "Administradores podem gerenciar todos os usuários" ON public.users;
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar usuários" ON public.users;
DROP POLICY IF EXISTS "Usuários autenticados podem criar usuários" ON public.users;
DROP POLICY IF EXISTS "Usuários autenticados podem excluir usuários" ON public.users;
DROP POLICY IF EXISTS "Usuários autenticados podem ver todos os usuários" ON public.users;
DROP POLICY IF EXISTS "Usuários podem ver seus próprios dados" ON public.users;

-- Keep the first-admin creation policy as-is

-- Recreate safe, non-recursive policies for users table
CREATE POLICY "Admins manage all users"
ON public.users
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Users can read own user"
ON public.users
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own user"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own user"
ON public.users
FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins and Managers can read all users"
ON public.users
FOR SELECT
USING (public.is_admin_or_manager());