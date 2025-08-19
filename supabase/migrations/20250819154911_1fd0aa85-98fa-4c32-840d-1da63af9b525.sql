-- Corrigir as datas dos contratos existentes para que se estendam aos próximos anos
UPDATE contracts 
SET end_date = '2026-12-31', 
    duration = EXTRACT(day FROM ('2026-12-31'::date - start_date)) + 1,
    updated_at = CURRENT_TIMESTAMP
WHERE contract_number IN ('CT-2024-001', 'CT-2024-002');

UPDATE contracts 
SET end_date = '2027-06-30', 
    duration = EXTRACT(day FROM ('2027-06-30'::date - start_date)) + 1,
    updated_at = CURRENT_TIMESTAMP
WHERE contract_number = 'CT-2024-003';