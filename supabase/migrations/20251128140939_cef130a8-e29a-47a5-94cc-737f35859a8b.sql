-- Remover contratos duplicados/extras
DELETE FROM public.contracts WHERE contract_number IN ('CT-2025-001', 'CT-2025-002');

-- Inserir 5º contrato de exemplo para completar os 5 contratos necessários para a defesa
INSERT INTO public.contracts (
  contract_number, object, contractor_id, contracted_id, legal_rep_id, witness1_id, witness2_id,
  total_value, duration, signature_date, start_date, end_date, status,
  bank, agency, account, payment_term, budget_unit, work_program, expense_nature, resource_source,
  signature_location, adjustment_index, price_adjustment_term, delay_penalty, termination_penalty,
  publication_date, general_observations, created_by
)
SELECT 
  '00005/2024',
  'Fornecimento de materiais de escritório e equipamentos',
  (SELECT id FROM legal_persons WHERE cnpj = '05939467000115' LIMIT 1),
  (SELECT id FROM legal_persons WHERE cnpj = '98765432000110' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '45678912345' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '32165498712' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '12345678901' LIMIT 1),
  80000.00, 12, '2024-05-10', '2024-06-01', '2025-05-31', 'active',
  'Caixa Econômica', '0002', '23456-7', '15 dias após entrega',
  '0700000', 'Suprimentos Administrativos', '3.3.90.30', 'Recursos Próprios',
  'Boa Vista - RR', 'IPCA', 12,
  '0,3% do valor contratual por dia de atraso, limitado a 5% do valor total',
  '8% do valor total do contrato',
  '2024-05-15', 'Contrato de fornecimento de materiais diversos', 'e7a8601b-b2d4-4270-ba26-134011402d03'
WHERE NOT EXISTS (SELECT 1 FROM contracts WHERE contract_number = '00005/2024');