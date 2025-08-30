-- Limpar relações órfãs e corrigir dados
DELETE FROM public.user_roles WHERE user_id = '7ed92b9d-99dd-4fed-9516-6321c9096e25';

-- Corrigir/definir admin corretamente
UPDATE public.users 
SET id = '630e5517-807e-48d1-96ba-482e325aca51',
    name = 'Angelo Gabriel Medeiros',
    username = 'medeirosangelo',
    role = 'admin',
    permissions = '{"dashboard": true, "contracts": true, "users": true, "edit": true}'::jsonb
WHERE email = 'medeirosangelogabriel@gmail.com';

-- Se não existir, inserir
INSERT INTO public.users (id, email, name, username, role, permissions)
SELECT 
  '630e5517-807e-48d1-96ba-482e325aca51',
  'medeirosangelogabriel@gmail.com',
  'Angelo Gabriel Medeiros',
  'medeirosangelo',
  'admin',
  '{"dashboard": true, "contracts": true, "users": true, "edit": true}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.users WHERE email = 'medeirosangelogabriel@gmail.com'
);

-- Inserir dados fake apenas se não existirem
INSERT INTO public.legal_persons (
  id, created_by, city, state, zip_code, phone, email, legal_rep_name, legal_rep_cpf, legal_rep_role,
  bank, agency, account, company_name, trade_name, cnpj, state_registration, street, number, complement, neighborhood
)
SELECT 
  gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
  'São Paulo', 'SP', '01000-000', '(11) 3333-4444', 'contato@alphaservicos.com',
  'João Almeida', '123.456.789-00', 'Diretor',
  'Banco A', '0001', '12345-6', 'Alpha Serviços LTDA', 'Alpha', '12.345.678/0001-90', 'ISENTO',
  'Av. Paulista', '1000', 'Conj. 101', 'Bela Vista'
WHERE NOT EXISTS (SELECT 1 FROM public.legal_persons WHERE cnpj = '12.345.678/0001-90');

INSERT INTO public.legal_persons (
  id, created_by, city, state, zip_code, phone, email, legal_rep_name, legal_rep_cpf, legal_rep_role,
  bank, agency, account, company_name, trade_name, cnpj, state_registration, street, number, complement, neighborhood
)
SELECT 
  gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
  'Rio de Janeiro', 'RJ', '20000-000', '(21) 2222-3333', 'contato@betasupply.com',
  'Maria Costa', '987.654.321-00', 'Gerente',
  'Banco B', '0002', '65432-1', 'Beta Supply ME', 'Beta', '98.765.432/0001-09', 'ISENTO',
  'Rua das Laranjeiras', '250', 'Sala 2', 'Laranjeiras'
WHERE NOT EXISTS (SELECT 1 FROM public.legal_persons WHERE cnpj = '98.765.432/0001-09');