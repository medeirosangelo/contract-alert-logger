-- 1) Garantir trigger para sincronizar auth.users -> public.users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created_users'
  ) THEN
    CREATE TRIGGER on_auth_user_created_users
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_users();
  END IF;
END $$;

-- 2) Corrigir/definir seu usuário como admin (id observado nos logs de auth)
INSERT INTO public.users (id, email, name, username, role, permissions)
VALUES (
  '630e5517-807e-48d1-96ba-482e325aca51',
  'medeirosangelogabriel@gmail.com',
  'Angelo Gabriel Medeiros',
  'medeirosangelo',
  'admin',
  '{"dashboard": true, "contracts": true, "users": true, "edit": true}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  username = EXCLUDED.username,
  role = EXCLUDED.role,
  permissions = EXCLUDED.permissions;

-- 3) Remover admin órfão criado por engano (se existir)
DELETE FROM public.users WHERE id = '7ed92b9d-99dd-4fed-9516-6321c9096e25';

-- 4) Dados fake para apresentação
-- Pessoas jurídicas
INSERT INTO public.legal_persons (
  id, created_by, city, state, zip_code, phone, email, legal_rep_name, legal_rep_cpf, legal_rep_role,
  bank, agency, account, company_name, trade_name, cnpj, state_registration, street, number, complement, neighborhood
) VALUES
  (
    gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
    'São Paulo', 'SP', '01000-000', '(11) 3333-4444', 'contato@alphaservicos.com',
    'João Almeida', '123.456.789-00', 'Diretor',
    'Banco A', '0001', '12345-6', 'Alpha Serviços LTDA', 'Alpha', '12.345.678/0001-90', 'ISENTO',
    'Av. Paulista', '1000', 'Conj. 101', 'Bela Vista'
  ),
  (
    gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
    'Rio de Janeiro', 'RJ', '20000-000', '(21) 2222-3333', 'contato@betasupply.com',
    'Maria Costa', '987.654.321-00', 'Gerente',
    'Banco B', '0002', '65432-1', 'Beta Supply ME', 'Beta', '98.765.432/0001-09', 'ISENTO',
    'Rua das Laranjeiras', '250', 'Sala 2', 'Laranjeiras'
  );

-- Pessoas físicas
INSERT INTO public.physical_persons (
  id, created_by, birth_date, number, complement, neighborhood, city, state, zip_code, phone, email, full_name, cpf, rg, role, street
) VALUES
  (
    gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
    '1995-05-12', '120', NULL, 'Centro', 'São Paulo', 'SP', '01000-000', '(11) 95555-4444', 'teste.pf1@example.com',
    'Carlos Henrique', '111.222.333-44', '12.345.678-9', 'Testemunha', 'Rua da Consolação'
  ),
  (
    gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
    '1992-10-03', '45', 'Casa 3', 'Copacabana', 'Rio de Janeiro', 'RJ', '22000-000', '(21) 98888-7777', 'teste.pf2@example.com',
    'Fernanda Lima', '555.666.777-88', '98.765.432-1', 'Fiscal', 'Av. Atlântica'
  );

-- Contratos
INSERT INTO public.contracts (
  id, created_by, total_value, duration, signature_date, publication_date, start_date, end_date,
  contract_number, object, adjustment_index, bank, agency, account, payment_term, delay_penalty, termination_penalty,
  budget_unit, work_program, expense_nature, resource_source, signature_location, general_observations, status
) VALUES
  (
    gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
    150000.00, 12, '2025-01-05', '2025-01-10', '2025-02-01', '2026-02-01',
    'CT-2025-001', 'Prestação de serviços de manutenção predial', 'IPCA', 'Banco A', '0001', '12345-6',
    'Pagamento em 30 dias após emissão da NF', 'Multa de 2% por atraso', 'Rescisão com aviso de 30 dias',
    'Unidade Orçamentária A', 'Programa de Trabalho A', '3.3.90.39', 'Fonte 100', 'São Paulo', 'Observações gerais do contrato', 'active'
  ),
  (
    gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
    82000.00, 6, '2025-03-15', '2025-03-20', '2025-04-01', '2025-10-01',
    'CT-2025-002', 'Fornecimento de materiais de escritório', 'IGP-M', 'Banco B', '0002', '65432-1',
    'Pagamento em 15 dias', 'Multa de 1% por atraso', 'Rescisão por inadimplemento',
    'Unidade Orçamentária B', 'Programa de Trabalho B', '3.3.90.30', 'Fonte 150', 'Rio de Janeiro', 'Observações adicionais', 'active'
  );