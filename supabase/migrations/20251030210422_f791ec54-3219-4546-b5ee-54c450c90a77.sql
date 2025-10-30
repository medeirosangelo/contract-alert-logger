-- Corrigir permissions vazias de todos os usuários
-- Configurar permissions baseado no role

UPDATE public.users 
SET permissions = jsonb_build_object(
  'dashboard', true,
  'contracts', true,
  'users', true,
  'edit', true
)
WHERE role = 'admin' AND (permissions = '{}'::jsonb OR permissions = '[]'::jsonb);

UPDATE public.users 
SET permissions = jsonb_build_object(
  'dashboard', true,
  'contracts', true,
  'users', false,
  'edit', true
)
WHERE role = 'gestor' AND (permissions = '{}'::jsonb OR permissions = '[]'::jsonb);

UPDATE public.users 
SET permissions = jsonb_build_object(
  'dashboard', true,
  'contracts', false,
  'users', false,
  'edit', false
)
WHERE role = 'colaborador' AND (permissions = '{}'::jsonb OR permissions = '[]'::jsonb);

-- Garantir que o campo permissions nunca seja vazio
ALTER TABLE public.users 
ALTER COLUMN permissions SET DEFAULT jsonb_build_object(
  'dashboard', true,
  'contracts', false,
  'users', false,
  'edit', false
);