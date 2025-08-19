-- Criar dados de exemplo para apresentação do TCC

-- Inserir pessoas físicas de exemplo (testemunhas e representantes)
INSERT INTO public.physical_persons (
  id, full_name, cpf, rg, birth_date, street, number, neighborhood, city, state, zip_code, phone, email, role
) VALUES 
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Carlos Eduardo Silva', '111.222.333-44', '11.222.333-4', '1980-05-15', 'Rua das Palmeiras', '100', 'Centro', 'São Paulo', 'SP', '01310-000', '(11) 99999-1111', 'carlos.silva@email.com', 'Testemunha'),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Marina Santos Oliveira', '555.666.777-88', '55.666.777-8', '1985-08-22', 'Avenida Paulista', '200', 'Bela Vista', 'São Paulo', 'SP', '01310-100', '(11) 88888-2222', 'marina.oliveira@email.com', 'Representante Legal'),
  ('6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'Roberto Almeida Costa', '999.888.777-66', '99.888.777-6', '1975-12-10', 'Rua Augusta', '300', 'Consolação', 'São Paulo', 'SP', '01305-000', '(11) 77777-3333', 'roberto.costa@email.com', 'Testemunha');

-- Inserir pessoas jurídicas de exemplo (contratantes e contratadas)
INSERT INTO public.legal_persons (
  id, company_name, trade_name, cnpj, state_registration, street, number, neighborhood, city, state, zip_code, phone, email, legal_rep_name, legal_rep_cpf, legal_rep_role, bank, agency, account
) VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Prefeitura Municipal de São Paulo', 'PMSP', '12.345.678/0001-90', '123456789', 'Viaduto do Chá', '15', 'Centro', 'São Paulo', 'SP', '01002-020', '(11) 3113-9000', 'contato@prefeitura.sp.gov.br', 'João da Silva Prefeito', '123.456.789-00', 'Prefeito', 'Banco do Brasil', '0001-2', '123456-7'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Construtora ABC Ltda', 'ABC Construções', '98.765.432/0001-10', '987654321', 'Rua da Construção', '500', 'Vila Madalena', 'São Paulo', 'SP', '05434-070', '(11) 3456-7890', 'contato@abcconstrucoes.com.br', 'Maria da Silva', '987.654.321-00', 'Diretora', 'Itaú', '1234', '56789-0'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'TechSolutions Informática Ltda', 'TechSolutions', '11.222.333/0001-44', '112233445', 'Avenida Faria Lima', '1000', 'Itaim Bibi', 'São Paulo', 'SP', '04538-132', '(11) 2345-6789', 'vendas@techsolutions.com.br', 'Pedro Henrique Santos', '456.789.123-45', 'CEO', 'Bradesco', '5678', '98765-4'),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Limpeza Total Serviços Ltda', 'Limpeza Total', '44.555.666/0001-77', '445566778', 'Rua dos Serviços', '250', 'Mooca', 'São Paulo', 'SP', '03164-000', '(11) 4567-8901', 'comercial@limpezatotal.com.br', 'Ana Paula Rodrigues', '789.123.456-78', 'Gerente Comercial', 'Santander', '9012', '11111-2');

-- Inserir contratos de exemplo
INSERT INTO public.contracts (
  id, contract_number, object, contractor_id, contracted_id, legal_rep_id, total_value, duration, signature_date, start_date, end_date, status, witness1_id, witness2_id, budget_unit, expense_nature, resource_source, signature_location, general_observations
) VALUES 
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'CT-2024-001', 'Construção de ponte sobre o Rio Pinheiros', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 2500000.00, 365, '2024-01-15', '2024-02-01', '2025-01-31', 'active', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'Secretaria de Obras', 'Investimento', 'Tesouro Municipal', 'Gabinete do Prefeito', 'Contrato de alta prioridade para mobilidade urbana'),
  
  ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'CT-2024-002', 'Implementação de sistema de gestão de contratos', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 850000.00, 180, '2024-03-01', '2024-03-15', '2024-09-12', 'active', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'Secretaria de Tecnologia', 'Custeio', 'Recursos Próprios', 'Sala de Reuniões', 'Sistema desenvolvido especialmente para gestão municipal'),
  
  ('10eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'CT-2024-003', 'Serviços de limpeza e conservação de prédios públicos', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 450000.00, 365, '2024-06-01', '2024-07-01', '2025-06-30', 'active', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'Secretaria de Administração', 'Custeio', 'Tesouro Municipal', 'Secretaria de Administração', 'Contrato de prestação de serviços essenciais'),
  
  ('20eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'CT-2023-045', 'Reforma do Teatro Municipal', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 1200000.00, 270, '2023-09-15', '2023-10-01', '2024-06-28', 'expired', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'Secretaria de Cultura', 'Investimento', 'Convênio Estadual', 'Teatro Municipal', 'Reforma do patrimônio histórico da cidade'),
  
  ('30eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'CT-2024-004', 'Manutenção de equipamentos de informática', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 320000.00, 365, '2024-08-01', '2024-08-15', '2025-08-14', 'active', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'Secretaria de Tecnologia', 'Custeio', 'Recursos Próprios', 'Secretaria de Tecnologia', 'Manutenção preventiva e corretiva de equipamentos'),
  
  ('40eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'CT-2024-005', 'Construção de praça comunitária', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 780000.00, 120, '2024-09-01', '2024-09-15', '2025-01-13', 'active', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'Secretaria de Obras', 'Investimento', 'Recursos Federais', 'Gabinete do Prefeito', 'Obra de lazer e convivência para a comunidade');

-- Criar alertas para contratos que estão próximos do vencimento
INSERT INTO public.contract_alerts (
  contract_id, alert_type, alert_date, description, status
) VALUES 
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'end_date', '2025-01-01', 'Contrato próximo do vencimento (30 dias)', 'pending'),
  ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'end_date', '2024-08-13', 'Contrato próximo do vencimento (30 dias)', 'resolved'),
  ('10eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'end_date', '2025-05-31', 'Contrato próximo do vencimento (30 dias)', 'pending'),
  ('20eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'end_date', '2024-05-29', 'Contrato vencido', 'critical'),
  ('30eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'end_date', '2025-07-15', 'Contrato próximo do vencimento (30 dias)', 'pending');