-- Habilitar RLS em todas as tabelas públicas que não possuem
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Criar políticas para user_roles
CREATE POLICY "Admin can manage user roles"
ON public.user_roles
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Inserir dados restantes (pessoas físicas e contratos)
INSERT INTO public.physical_persons (
  id, created_by, birth_date, number, complement, neighborhood, city, state, zip_code, phone, email, full_name, cpf, rg, role, street
)
SELECT 
  gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
  '1995-05-12', '120', NULL, 'Centro', 'São Paulo', 'SP', '01000-000', '(11) 95555-4444', 'teste.pf1@example.com',
  'Carlos Henrique', '111.222.333-44', '12.345.678-9', 'Testemunha', 'Rua da Consolação'
WHERE NOT EXISTS (SELECT 1 FROM public.physical_persons WHERE cpf = '111.222.333-44');

INSERT INTO public.physical_persons (
  id, created_by, birth_date, number, complement, neighborhood, city, state, zip_code, phone, email, full_name, cpf, rg, role, street
)
SELECT 
  gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
  '1992-10-03', '45', 'Casa 3', 'Copacabana', 'Rio de Janeiro', 'RJ', '22000-000', '(21) 98888-7777', 'teste.pf2@example.com',
  'Fernanda Lima', '555.666.777-88', '98.765.432-1', 'Fiscal', 'Av. Atlântica'
WHERE NOT EXISTS (SELECT 1 FROM public.physical_persons WHERE cpf = '555.666.777-88');

INSERT INTO public.contracts (
  id, created_by, total_value, duration, signature_date, publication_date, start_date, end_date,
  contract_number, object, adjustment_index, bank, agency, account, payment_term, delay_penalty, termination_penalty,
  budget_unit, work_program, expense_nature, resource_source, signature_location, general_observations, status
)
SELECT 
  gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
  150000.00, 12, '2025-01-05', '2025-01-10', '2025-02-01', '2026-02-01',
  'CT-2025-001', 'Prestação de serviços de manutenção predial', 'IPCA', 'Banco A', '0001', '12345-6',
  'Pagamento em 30 dias após emissão da NF', 'Multa de 2% por atraso', 'Rescisão com aviso de 30 dias',
  'Unidade Orçamentária A', 'Programa de Trabalho A', '3.3.90.39', 'Fonte 100', 'São Paulo', 'Observações gerais do contrato', 'active'
WHERE NOT EXISTS (SELECT 1 FROM public.contracts WHERE contract_number = 'CT-2025-001');

INSERT INTO public.contracts (
  id, created_by, total_value, duration, signature_date, publication_date, start_date, end_date,
  contract_number, object, adjustment_index, bank, agency, account, payment_term, delay_penalty, termination_penalty,
  budget_unit, work_program, expense_nature, resource_source, signature_location, general_observations, status
)
SELECT 
  gen_random_uuid(), '630e5517-807e-48d1-96ba-482e325aca51',
  82000.00, 6, '2025-03-15', '2025-03-20', '2025-04-01', '2025-10-01',
  'CT-2025-002', 'Fornecimento de materiais de escritório', 'IGP-M', 'Banco B', '0002', '65432-1',
  'Pagamento em 15 dias', 'Multa de 1% por atraso', 'Rescisão por inadimplemento',
  'Unidade Orçamentária B', 'Programa de Trabalho B', '3.3.90.30', 'Fonte 150', 'Rio de Janeiro', 'Observações adicionais', 'active'
WHERE NOT EXISTS (SELECT 1 FROM public.contracts WHERE contract_number = 'CT-2025-002');