-- Atualizar contratos para ter datas distribuídas melhor nos próximos 3 anos
-- Contrato 00001/2024 - Vence em 2025
UPDATE contracts SET 
  start_date = '2024-01-15',
  end_date = '2025-06-15',
  signature_date = '2024-01-10',
  total_value = 150000,
  duration = 18
WHERE contract_number = '00001/2024';

-- Contrato 00002/2024 - Vence em 2026
UPDATE contracts SET 
  start_date = '2024-06-01',
  end_date = '2026-06-01',
  signature_date = '2024-05-25',
  total_value = 220000,
  duration = 24
WHERE contract_number = '00002/2024';

-- Contrato 00003/2024 - Vence em 2026
UPDATE contracts SET 
  start_date = '2024-09-01',
  end_date = '2026-09-01',
  signature_date = '2024-08-20',
  total_value = 85000,
  duration = 24
WHERE contract_number = '00003/2024';

-- Contrato 00004/2023 - Já finalizado em 2024
UPDATE contracts SET 
  start_date = '2023-03-01',
  end_date = '2024-03-01',
  signature_date = '2023-02-20',
  total_value = 120000,
  duration = 12,
  status = 'finished'
WHERE contract_number = '00004/2023';

-- Contrato 00005/2024 - Vence em 2025
UPDATE contracts SET 
  start_date = '2024-06-01',
  end_date = '2025-12-31',
  signature_date = '2024-05-28',
  total_value = 80000,
  duration = 18
WHERE contract_number = '00005/2024';

-- Nova Era Alimentos - Vence em 2027
UPDATE contracts SET 
  start_date = '2025-01-01',
  end_date = '2027-12-31',
  signature_date = '2024-12-15',
  total_value = 180000,
  duration = 36
WHERE object LIKE '%Nova Era%' OR object LIKE '%açúcar%';

-- Atacadão - Vence em 2026
UPDATE contracts SET 
  start_date = '2024-07-01',
  end_date = '2026-07-01',
  signature_date = '2024-06-20',
  total_value = 95000,
  duration = 24
WHERE object LIKE '%Atacadão%' OR object LIKE '%café%';

-- Atualizar alertas para refletir novas datas
DELETE FROM contract_alerts WHERE status = 'pending';

-- Criar novos alertas baseados nas datas atualizadas
INSERT INTO contract_alerts (contract_id, alert_type, alert_date, description, status)
SELECT 
  id,
  'end_date',
  end_date - INTERVAL '30 days',
  'Contrato próximo do vencimento (30 dias)',
  'pending'
FROM contracts 
WHERE status = 'active' AND end_date > CURRENT_DATE;