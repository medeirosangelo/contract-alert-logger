-- 1) Ensure users table has updated_at and trigger to maintain it
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 2) Align role defaults and fix inconsistent existing data
ALTER TABLE public.users ALTER COLUMN role SET DEFAULT 'colaborador';
UPDATE public.users SET role = 'colaborador' WHERE role = 'user';

-- 3) Fix RLS on public.users so admins can truly manage everyone
-- Drop existing policies to avoid restrictive AND behavior
DROP POLICY IF EXISTS "Permitir criação do primeiro admin" ON public.users;
DROP POLICY IF EXISTS "Admins manage all users" ON public.users;
DROP POLICY IF EXISTS "Users can read own user" ON public.users;
DROP POLICY IF EXISTS "Users can update own user" ON public.users;
DROP POLICY IF EXISTS "Users can insert own user" ON public.users;
DROP POLICY IF EXISTS "Admins and Managers can read all users" ON public.users;

-- Recreate permissive policies
CREATE POLICY "Users can read own user"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Admins and Managers can read all users"
ON public.users
FOR SELECT
TO authenticated
USING (is_admin_or_manager());

CREATE POLICY "Users can insert own user"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own user"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Admins can insert users"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admins can update all users"
ON public.users
FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admins can delete users"
ON public.users
FOR DELETE
TO authenticated
USING (is_admin());