-- Inserir dados de exemplo de pessoas físicas
INSERT INTO public.physical_persons (full_name, cpf, rg, birth_date, email, phone, street, number, neighborhood, city, state, zip_code, role, created_by)
VALUES 
  ('Maria Silva Santos', '12345678901', '1234567', '1985-03-15', 'maria.santos@email.com', '(95) 98765-4321', 'Rua das Flores', '123', 'Centro', 'Boa Vista', 'RR', '69301-000', 'Testemunha', 'e7a8601b-b2d4-4270-ba26-134011402d03'),
  ('João Pedro Oliveira', '98765432109', '9876543', '1990-07-22', 'joao.oliveira@email.com', '(95) 99876-5432', 'Avenida Brasil', '456', 'São Francisco', 'Boa Vista', 'RR', '69305-000', 'Testemunha', 'e7a8601b-b2d4-4270-ba26-134011402d03'),
  ('Ana Paula Costa', '45678912345', '4567891', '1988-11-30', 'ana.costa@email.com', '(95) 97654-3210', 'Rua São Pedro', '789', 'Mecejana', 'Boa Vista', 'RR', '69304-000', 'Representante Legal', 'e7a8601b-b2d4-4270-ba26-134011402d03'),
  ('Carlos Eduardo Lima', '32165498712', '3216549', '1982-05-18', 'carlos.lima@email.com', '(95) 96543-2109', 'Rua Santos Dumont', '321', 'Caçari', 'Boa Vista', 'RR', '69307-000', 'Testemunha', 'e7a8601b-b2d4-4270-ba26-134011402d03')
ON CONFLICT (cpf) DO NOTHING;

-- Inserir dados de exemplo de pessoas jurídicas
INSERT INTO public.legal_persons (company_name, trade_name, cnpj, state_registration, email, phone, street, number, neighborhood, city, state, zip_code, legal_rep_name, legal_rep_cpf, legal_rep_role, bank, agency, account, created_by)
VALUES 
  ('CAER - Companhia de Águas e Esgotos de Roraima', 'CAER', '05939467000115', '24000001-1', 'contato@caer.rr.gov.br', '(95) 2121-2100', 'Avenida Brigadeiro Eduardo Gomes', '3521', 'São Pedro', 'Boa Vista', 'RR', '69306-640', 'José Carlos Silva', '11122233344', 'Diretor Presidente', 'Banco do Brasil', '0001', '12345-6', 'e7a8601b-b2d4-4270-ba26-134011402d03'),
  ('Tech Solutions Ltda', 'Tech Solutions', '12345678000190', '24000002-2', 'contato@techsolutions.com.br', '(95) 3224-5678', 'Rua Coronel Pinto', '250', 'Centro', 'Boa Vista', 'RR', '69301-150', 'Ricardo Mendes', '22233344455', 'Diretor', 'Caixa Econômica', '0002', '23456-7', 'e7a8601b-b2d4-4270-ba26-134011402d03'),
  ('Limpeza Total Serviços', 'Limpeza Total', '98765432000110', '24000003-3', 'contato@limpezatotal.com.br', '(95) 3225-6789', 'Avenida Cap. Ene Garcez', '1500', 'Aeroporto', 'Boa Vista', 'RR', '69310-000', 'Mariana Souza', '33344455566', 'Gerente', 'Bradesco', '0003', '34567-8', 'e7a8601b-b2d4-4270-ba26-134011402d03'),
  ('Segurança Prime Ltda', 'Prime Segurança', '11222333000144', '24000004-4', 'contato@primeseguranca.com.br', '(95) 3226-7890', 'Rua Cecília Brasil', '890', 'Caçari', 'Boa Vista', 'RR', '69307-000', 'Fernando Alves', '44455566677', 'Diretor Operacional', 'Itaú', '0004', '45678-9', 'e7a8601b-b2d4-4270-ba26-134011402d03'),
  ('Consultoria Empresarial Santos', 'CE Santos', '44555666000177', '24000005-5', 'contato@cesantos.com.br', '(95) 3227-8901', 'Rua Floriano Peixoto', '456', 'Centro', 'Boa Vista', 'RR', '69301-110', 'Roberto Santos', '55566677788', 'Consultor Sênior', 'Santander', '0005', '56789-0', 'e7a8601b-b2d4-4270-ba26-134011402d03')
ON CONFLICT (cnpj) DO NOTHING;

-- Inserir contratos de exemplo (vamos usar os IDs das empresas que acabamos de inserir)
INSERT INTO public.contracts (
  contract_number, object, contractor_id, contracted_id, legal_rep_id, witness1_id, witness2_id,
  total_value, duration, signature_date, start_date, end_date, status,
  bank, agency, account, payment_term, budget_unit, work_program, expense_nature, resource_source,
  signature_location, adjustment_index, price_adjustment_term, delay_penalty, termination_penalty,
  publication_date, general_observations, created_by
)
SELECT 
  '00001/2024',
  'Prestação de serviços de tecnologia da informação e suporte técnico',
  (SELECT id FROM legal_persons WHERE cnpj = '05939467000115' LIMIT 1),
  (SELECT id FROM legal_persons WHERE cnpj = '12345678000190' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '45678912345' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '12345678901' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '98765432109' LIMIT 1),
  150000.00, 12, '2024-01-15', '2024-02-01', '2025-01-31', 'active',
  'Banco do Brasil', '0001', '12345-6', '30 dias após apresentação de nota fiscal',
  '0700000', 'Modernização Tecnológica', '3.3.90.39', 'Recursos Próprios',
  'Boa Vista - RR', 'IPCA', 12, 
  '0,5% do valor contratual por dia de atraso, limitado a 10% do valor total',
  '10% do valor total do contrato',
  '2024-01-20', 'Contrato de tecnologia com suporte 24/7', 'e7a8601b-b2d4-4270-ba26-134011402d03'
WHERE NOT EXISTS (SELECT 1 FROM contracts WHERE contract_number = '00001/2024');

INSERT INTO public.contracts (
  contract_number, object, contractor_id, contracted_id, legal_rep_id, witness1_id, witness2_id,
  total_value, duration, signature_date, start_date, end_date, status,
  bank, agency, account, payment_term, budget_unit, work_program, expense_nature, resource_source,
  signature_location, adjustment_index, price_adjustment_term, delay_penalty, termination_penalty,
  publication_date, general_observations, created_by
)
SELECT 
  '00002/2024',
  'Prestação de serviços de limpeza e conservação predial',
  (SELECT id FROM legal_persons WHERE cnpj = '05939467000115' LIMIT 1),
  (SELECT id FROM legal_persons WHERE cnpj = '98765432000110' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '45678912345' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '32165498712' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '98765432109' LIMIT 1),
  75000.00, 12, '2024-02-10', '2024-03-01', '2025-02-28', 'active',
  'Bradesco', '0003', '34567-8', '15 dias após apresentação de nota fiscal',
  '0700000', 'Manutenção Predial', '3.3.90.39', 'Recursos Próprios',
  'Boa Vista - RR', 'INPC', 12,
  '0,3% do valor contratual por dia de atraso, limitado a 5% do valor total',
  '8% do valor total do contrato',
  '2024-02-15', 'Contrato de limpeza com materiais inclusos', 'e7a8601b-b2d4-4270-ba26-134011402d03'
WHERE NOT EXISTS (SELECT 1 FROM contracts WHERE contract_number = '00002/2024');

INSERT INTO public.contracts (
  contract_number, object, contractor_id, contracted_id, legal_rep_id, witness1_id, witness2_id,
  total_value, duration, signature_date, start_date, end_date, status,
  bank, agency, account, payment_term, budget_unit, work_program, expense_nature, resource_source,
  signature_location, adjustment_index, price_adjustment_term, delay_penalty, termination_penalty,
  publication_date, general_observations, created_by
)
SELECT 
  '00003/2024',
  'Prestação de serviços de segurança patrimonial',
  (SELECT id FROM legal_persons WHERE cnpj = '05939467000115' LIMIT 1),
  (SELECT id FROM legal_persons WHERE cnpj = '11222333000144' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '45678912345' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '12345678901' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '32165498712' LIMIT 1),
  250000.00, 12, '2024-03-05', '2024-04-01', '2025-03-31', 'active',
  'Itaú', '0004', '45678-9', '30 dias após apresentação de nota fiscal',
  '0700000', 'Segurança Institucional', '3.3.90.39', 'Recursos Próprios',
  'Boa Vista - RR', 'IPCA', 12,
  '0,5% do valor contratual por dia de atraso, limitado a 10% do valor total',
  '12% do valor total do contrato',
  '2024-03-10', 'Contrato de segurança 24h com vigilantes armados', 'e7a8601b-b2d4-4270-ba26-134011402d03'
WHERE NOT EXISTS (SELECT 1 FROM contracts WHERE contract_number = '00003/2024');

INSERT INTO public.contracts (
  contract_number, object, contractor_id, contracted_id, legal_rep_id, witness1_id, witness2_id,
  total_value, duration, signature_date, start_date, end_date, status,
  bank, agency, account, payment_term, budget_unit, work_program, expense_nature, resource_source,
  signature_location, adjustment_index, price_adjustment_term, delay_penalty, termination_penalty,
  publication_date, general_observations, created_by
)
SELECT 
  '00004/2023',
  'Consultoria empresarial para modernização de processos',
  (SELECT id FROM legal_persons WHERE cnpj = '05939467000115' LIMIT 1),
  (SELECT id FROM legal_persons WHERE cnpj = '44555666000177' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '45678912345' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '12345678901' LIMIT 1),
  (SELECT id FROM physical_persons WHERE cpf = '98765432109' LIMIT 1),
  200000.00, 12, '2023-06-15', '2023-07-01', '2024-06-30', 'finished',
  'Santander', '0005', '56789-0', '30 dias após apresentação de nota fiscal',
  '0700000', 'Modernização Institucional', '3.3.90.35', 'Recursos Próprios',
  'Boa Vista - RR', 'IGP-M', 12,
  '0,5% do valor contratual por dia de atraso, limitado a 10% do valor total',
  '10% do valor total do contrato',
  '2023-06-20', 'Contrato de consultoria finalizado com êxito', 'e7a8601b-b2d4-4270-ba26-134011402d03'
WHERE NOT EXISTS (SELECT 1 FROM contracts WHERE contract_number = '00004/2023');