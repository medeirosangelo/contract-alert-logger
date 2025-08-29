-- Remove todas as políticas existentes que estão causando recursão infinita
DROP POLICY IF EXISTS "users_select_own_or_admin" ON public.users;
DROP POLICY IF EXISTS "users_insert_admin_only" ON public.users;
DROP POLICY IF EXISTS "users_update_own_or_admin" ON public.users;
DROP POLICY IF EXISTS "users_delete_admin_only" ON public.users;

-- Criar funções de segurança para evitar recursão infinita
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.get_current_user_role() = 'admin';
$$;

-- Criar novas políticas sem recursão
CREATE POLICY "users_select_policy" 
ON public.users 
FOR SELECT 
USING (
  id = auth.uid() OR 
  public.is_admin() OR 
  (SELECT COUNT(*) FROM public.users) = 0
);

CREATE POLICY "users_insert_policy" 
ON public.users 
FOR INSERT 
WITH CHECK (
  public.is_admin() OR 
  (SELECT COUNT(*) FROM public.users) = 0 OR 
  id = auth.uid()
);

CREATE POLICY "users_update_policy" 
ON public.users 
FOR UPDATE 
USING (
  id = auth.uid() OR 
  public.is_admin()
)
WITH CHECK (
  id = auth.uid() OR 
  public.is_admin()
);

CREATE POLICY "users_delete_policy" 
ON public.users 
FOR DELETE 
USING (public.is_admin());

-- Inserir seu usuário admin
INSERT INTO public.users (
  id, 
  email, 
  name, 
  username, 
  role, 
  permissions
) VALUES (
  '7ed92b9d-99dd-4fed-9516-6321c9096e25'::uuid,
  'medeirosangelogabriel@gmail.com',
  'Angelo Gabriel Medeiros',
  'medeirosangelo',
  'admin',
  '{"dashboard": true, "contracts": true, "users": true, "edit": true}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  username = EXCLUDED.username,
  role = EXCLUDED.role,
  permissions = EXCLUDED.permissions;