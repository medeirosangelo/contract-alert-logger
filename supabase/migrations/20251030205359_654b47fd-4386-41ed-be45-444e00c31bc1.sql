-- Remover trigger que está causando conflito com a edge function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Corrigir permissions do usuário g.saldanha (está com valor 0 inválido)
UPDATE public.users 
SET permissions = jsonb_build_object(
  'dashboard', true,
  'contracts', true,
  'users', true,
  'edit', true
)
WHERE email = 'g.saldanha@academico.ifrr.edu.br' AND permissions::text = '0';

-- Garantir que user_roles seja populada corretamente para consultas futuras
-- (mesmo que não esteja sendo usada atualmente, manter consistência)
INSERT INTO public.user_roles (user_id, role)
SELECT id, role 
FROM public.users
WHERE id NOT IN (SELECT user_id FROM public.user_roles)
ON CONFLICT DO NOTHING;