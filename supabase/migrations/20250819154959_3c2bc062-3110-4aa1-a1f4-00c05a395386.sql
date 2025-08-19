-- Corrigir as datas dos contratos existentes para que se estendam aos próximos anos
UPDATE contracts 
SET end_date = '2026-12-31', 
    duration = 1064, -- dias entre 2024-02-01 e 2026-12-31
    updated_at = CURRENT_TIMESTAMP
WHERE contract_number = 'CT-2024-001';

UPDATE contracts 
SET end_date = '2026-12-31', 
    duration = 1023, -- dias entre 2024-03-15 e 2026-12-31  
    updated_at = CURRENT_TIMESTAMP
WHERE contract_number = 'CT-2024-002';

UPDATE contracts 
SET end_date = '2027-06-30', 
    duration = 1095, -- dias entre 2024-07-01 e 2027-06-30
    updated_at = CURRENT_TIMESTAMP
WHERE contract_number = 'CT-2024-003';