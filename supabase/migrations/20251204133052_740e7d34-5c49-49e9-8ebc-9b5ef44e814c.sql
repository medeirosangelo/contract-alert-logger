-- Inserir novas empresas: Nova Era e Atacadão
INSERT INTO public.legal_persons (
  company_name, trade_name, cnpj, street, number, neighborhood, city, state, zip_code,
  phone, email, legal_rep_name, legal_rep_cpf, legal_rep_role, bank, agency, account
) VALUES 
(
  'Supermercado Nova Era Ltda', 'Nova Era', '33444555000188',
  'Av. Major Williams', '1500', 'Centro', 'Boa Vista', 'RR', '69301-110',
  '(95) 3224-8800', 'contato@novaera.com.br', 'Carlos Eduardo Lima', '78945612300', 'Diretor Comercial',
  'Bradesco', '0123', '45678-9'
),
(
  'Atacadão Distribuição S.A.', 'Atacadão', '55666777000199',
  'Av. Ville Roy', '2800', 'Canarinho', 'Boa Vista', 'RR', '69306-000',
  '(95) 3623-9900', 'comercial@atacadao.com.br', 'Roberto Fernandes Silva', '96385274100', 'Gerente Regional',
  'Itaú', '4567', '89012-3'
)
ON CONFLICT (cnpj) DO NOTHING;

-- Inserir novos contratos para Nova Era e Atacadão
INSERT INTO public.contracts (
  contract_number, object, contractor_id, contracted_id, legal_rep_id, witness1_id, witness2_id,
  total_value, duration, signature_date, start_date, end_date, status,
  bank, agency, account, payment_term, budget_unit, work_program, expense_nature, resource_source,
  signature_location, adjustment_index, price_adjustment_term, delay_penalty, termination_penalty,
  publication_date, general_observations, created_by
)
SELECT 
  '00006/2024',
  'Fornecimento de gêneros alimentícios e produtos de primeira necessidade',
  (SELECT id FROM legal_persons WHERE cnpj = '05939467000115' LIMIT 1),
  (SELECT id FROM legal_persons WHERE cnpj = '33444555000188' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '45678912345' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '32165498712' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '12345678901' LIMIT 1),
  95000.00, 12, '2024-07-15', '2024-08-01', '2025-07-31', 'active',
  'Bradesco', '0123', '45678-9', '20 dias após entrega',
  '0700000', 'Alimentação', '3.3.90.30', 'Recursos Próprios',
  'Boa Vista - RR', 'IPCA', 12,
  '0,5% do valor por dia de atraso, limitado a 10%',
  '10% do valor total do contrato',
  '2024-07-20', 'Contrato para fornecimento mensal de alimentos', 'e7a8601b-b2d4-4270-ba26-134011402d03'
WHERE NOT EXISTS (SELECT 1 FROM contracts WHERE contract_number = '00006/2024');

INSERT INTO public.contracts (
  contract_number, object, contractor_id, contracted_id, legal_rep_id, witness1_id, witness2_id,
  total_value, duration, signature_date, start_date, end_date, status,
  bank, agency, account, payment_term, budget_unit, work_program, expense_nature, resource_source,
  signature_location, adjustment_index, price_adjustment_term, delay_penalty, termination_penalty,
  publication_date, general_observations, created_by
)
SELECT 
  '00007/2024',
  'Fornecimento de açúcar cristal e café torrado e moído',
  (SELECT id FROM legal_persons WHERE cnpj = '05939467000115' LIMIT 1),
  (SELECT id FROM legal_persons WHERE cnpj = '55666777000199' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '45678912345' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '32165498712' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '12345678901' LIMIT 1),
  45000.00, 6, '2024-09-01', '2024-09-15', '2025-03-15', 'active',
  'Itaú', '4567', '89012-3', '15 dias após entrega',
  '0700000', 'Copa e Cozinha', '3.3.90.30', 'Recursos Próprios',
  'Boa Vista - RR', 'IGPM', 6,
  '0,3% do valor por dia de atraso',
  '5% do valor total do contrato',
  '2024-09-05', 'Fornecimento de açúcar (500kg/mês) e café (100kg/mês)', 'e7a8601b-b2d4-4270-ba26-134011402d03'
WHERE NOT EXISTS (SELECT 1 FROM contracts WHERE contract_number = '00007/2024');

-- Criar alertas para os novos contratos
INSERT INTO public.contract_alerts (contract_id, alert_type, alert_date, description, status, created_by)
SELECT 
  c.id,
  'end_date',
  c.end_date - INTERVAL '30 days',
  'Contrato próximo do vencimento - Verificar necessidade de renovação ou aditivo',
  'pending',
  c.created_by
FROM contracts c
WHERE c.contract_number IN ('00006/2024', '00007/2024')
AND NOT EXISTS (
  SELECT 1 FROM contract_alerts ca WHERE ca.contract_id = c.id
);