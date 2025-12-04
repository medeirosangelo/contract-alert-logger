-- Remover alertas duplicados, mantendo apenas 1 por contrato
DELETE FROM public.contract_alerts
WHERE id NOT IN (
  SELECT DISTINCT ON (contract_id) id
  FROM public.contract_alerts
  ORDER BY contract_id, alert_date DESC
);

-- Atualizar descrições para ficar mais claro
UPDATE public.contract_alerts
SET description = 'Contrato próximo do vencimento - Verificar necessidade de renovação ou aditivo'
WHERE status = 'pending';