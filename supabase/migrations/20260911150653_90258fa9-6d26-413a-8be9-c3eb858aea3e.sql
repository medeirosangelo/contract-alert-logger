DROP TRIGGER IF EXISTS create_contract_alerts_trigger ON public.contracts;
DROP TRIGGER IF EXISTS update_contracts_updated_at ON public.contracts;
DROP TRIGGER IF EXISTS update_legal_persons_updated_at ON public.legal_persons;
DROP TRIGGER IF EXISTS update_physical_persons_updated_at ON public.physical_persons;

CREATE OR REPLACE FUNCTION public.create_contract_end_alert()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
    INSERT INTO public.contract_alerts (
        contract_id, alert_type, alert_date, description, status, created_by
    ) VALUES (
        NEW.id,
        'end_date',
        NEW.end_date - INTERVAL '30 days',
        'Contrato próximo do vencimento (30 dias)',
        'pending',
        NEW.created_by
    );
    RETURN NEW;
END;
$function$;