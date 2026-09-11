GRANT SELECT, INSERT, UPDATE ON public.alert_resolutions TO authenticated;
GRANT ALL ON public.alert_resolutions TO service_role;
GRANT SELECT, INSERT ON public.contract_history TO authenticated;
GRANT ALL ON public.contract_history TO service_role;