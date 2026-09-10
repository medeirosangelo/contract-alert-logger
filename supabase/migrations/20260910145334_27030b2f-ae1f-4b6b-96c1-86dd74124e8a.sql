CREATE TABLE public.alert_resolutions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_id uuid NOT NULL REFERENCES public.contract_alerts(id) ON DELETE CASCADE,
  contract_id uuid REFERENCES public.contracts(id) ON DELETE CASCADE,
  action text NOT NULL CHECK (action IN ('aditivo','finalizar','cancelar')),
  additional_value numeric NOT NULL DEFAULT 0,
  additional_months integer NOT NULL DEFAULT 0,
  justification text NOT NULL,
  status text NOT NULL DEFAULT 'pending_approval' CHECK (status IN ('pending_approval','approved','rejected')),
  requested_by uuid,
  requested_by_name text,
  requested_at timestamp with time zone NOT NULL DEFAULT now(),
  reviewed_by uuid,
  reviewed_by_name text,
  reviewed_at timestamp with time zone,
  review_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_alert_resolutions_alert ON public.alert_resolutions(alert_id, created_at DESC);
CREATE INDEX idx_alert_resolutions_status ON public.alert_resolutions(status);

GRANT SELECT, INSERT, UPDATE ON public.alert_resolutions TO authenticated;
GRANT ALL ON public.alert_resolutions TO service_role;

ALTER TABLE public.alert_resolutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view resolutions"
  ON public.alert_resolutions FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can request resolution"
  ON public.alert_resolutions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = requested_by AND status = 'pending_approval');

CREATE POLICY "Другой user can review resolution"
  ON public.alert_resolutions FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() <> requested_by)
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() <> requested_by);

CREATE OR REPLACE FUNCTION public.enforce_dual_review()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.reviewed_by IS NOT NULL AND NEW.reviewed_by = NEW.requested_by THEN
    RAISE EXCEPTION 'O solicitante não pode aprovar o próprio pedido';
  END IF;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_dual_review_trg
BEFORE INSERT OR UPDATE ON public.alert_resolutions
FOR EACH ROW EXECUTE FUNCTION public.enforce_dual_review();