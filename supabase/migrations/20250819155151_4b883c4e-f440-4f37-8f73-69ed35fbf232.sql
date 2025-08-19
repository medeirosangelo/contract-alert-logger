-- Habilitar RLS na tabela users que tem políticas mas não tem RLS habilitado
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;