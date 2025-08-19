-- Atualizar alguns contratos para se estenderem aos próximos anos
UPDATE contracts 
SET end_date = '2026-12-31', 
    duration = 730,
    updated_at = CURRENT_TIMESTAMP
WHERE contract_number IN ('2024/001', '2024/002');

UPDATE contracts 
SET end_date = '2027-06-30', 
    duration = 1095,
    updated_at = CURRENT_TIMESTAMP
WHERE contract_number = '2024/003';

-- Inserir alguns contratos que começam em 2026 para mostrar valores futuros
INSERT INTO contracts (
    contract_number, object, contractor_id, contracted_id, legal_rep_id,
    total_value, duration, signature_date, start_date, end_date,
    status, budget_unit, expense_nature, created_by
) VALUES 
(
    '2026/001', 
    'Contrato de fornecimento de equipamentos de TI para modernização',
    (SELECT id FROM legal_persons LIMIT 1),
    (SELECT id FROM legal_persons OFFSET 1 LIMIT 1),
    (SELECT id FROM physical_persons LIMIT 1),
    2500000, 365, '2025-12-15', '2026-01-01', '2026-12-31',
    'active', 'Secretaria de Tecnologia', 'Material de Consumo',
    (SELECT id FROM users WHERE role = 'admin' LIMIT 1)
),
(
    '2027/001',
    'Serviços de consultoria em gestão pública para 2027-2028',
    (SELECT id FROM legal_persons OFFSET 2 LIMIT 1),
    (SELECT id FROM legal_persons LIMIT 1),  
    (SELECT id FROM physical_persons OFFSET 1 LIMIT 1),
    1800000, 730, '2026-11-30', '2027-01-01', '2028-12-31',
    'active', 'Gabinete do Prefeito', 'Serviços Terceirizados',
    (SELECT id FROM users WHERE role = 'admin' LIMIT 1)
);