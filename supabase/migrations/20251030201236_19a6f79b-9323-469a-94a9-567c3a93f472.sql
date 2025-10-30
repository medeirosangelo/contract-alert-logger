-- Atualizar função para buscar role da tabela users (sem drop)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$;

-- Atualizar função is_admin para usar users
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin';
$$;

-- Atualizar função is_admin_or_manager
CREATE OR REPLACE FUNCTION public.is_admin_or_manager()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'gestor');
$$;