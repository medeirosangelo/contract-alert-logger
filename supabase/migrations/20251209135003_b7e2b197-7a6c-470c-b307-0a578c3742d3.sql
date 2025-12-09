-- Atualizar contratos para ter datas em 2027
UPDATE contracts SET 
  start_date = '2025-01-01',
  end_date = '2027-12-31',
  signature_date = '2024-12-15',
  total_value = 180000,
  duration = 36
WHERE contract_number = '00002/2024';

-- Atualizar outro contrato para 2027
UPDATE contracts SET 
  start_date = '2025-06-01',
  end_date = '2027-06-01',
  signature_date = '2025-05-25',
  total_value = 120000,
  duration = 24
WHERE contract_number = '00003/2024';