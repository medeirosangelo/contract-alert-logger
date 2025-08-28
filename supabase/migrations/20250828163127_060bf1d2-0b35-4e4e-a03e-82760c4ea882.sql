-- REFAZER COMPLETAMENTE O SISTEMA DE USUÁRIOS

-- 1) Limpar policies conflitantes
DROP POLICY IF EXISTS "Users can read own user" ON public.users;
DROP POLICY IF EXISTS "Admins and Managers can read all users" ON public.users;
DROP POLICY IF EXISTS "Users can insert own user" ON public.users;
DROP POLICY IF EXISTS "Users can update own user" ON public.users;
DROP POLICY IF EXISTS "Admins can insert users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Admins can delete users" ON public.users;

-- 2) Limpar tabela users (backup implícito: os dados estão visíveis)
TRUNCATE TABLE public.users;

-- 3) Recriar estrutura da tabela users de forma limpa
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

-- 4) Ativar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 5) Criar trigger para updated_at
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 6) Criar policies simples e funcionais
CREATE POLICY "admin_full_access" ON public.users
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users u2 
    WHERE u2.id = auth.uid() AND u2.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users u2 
    WHERE u2.id = auth.uid() AND u2.role = 'admin'
  )
);

CREATE POLICY "user_read_own" ON public.users
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "user_update_own" ON public.users
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- 7) Inserir admin padrão se não existir no Auth
-- Primeiro vamos criar uma função para isso
CREATE OR REPLACE FUNCTION create_default_admin()
RETURNS void AS $$
BEGIN
  -- Inserir usuário admin padrão na tabela users
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
    'medeirosangelo',
    'medeirosangelogabriel',
    'admin',
    '{"dashboard": true, "contracts": true, "users": true, "edit": true}'::jsonb
  )
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    permissions = '{"dashboard": true, "contracts": true, "users": true, "edit": true}'::jsonb,
    updated_at = now();
  
  -- Inserir outros admins existentes
  INSERT INTO public.users (
    id, 
    email, 
    name, 
    username, 
    role, 
    permissions
  ) VALUES 
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
  )
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    permissions = '{"dashboard": true, "contracts": true, "users": true, "edit": true}'::jsonb,
    updated_at = now();
END;
$$ LANGUAGE plpgsql;

-- Executar a função
SELECT create_default_admin();

-- Remover a função temporária
DROP FUNCTION create_default_admin();