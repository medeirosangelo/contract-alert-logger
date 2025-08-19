-- Corrigir problemas críticos de RLS identificados pelo linter

-- Habilitar RLS em todas as tabelas públicas que não têm
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_uploads ENABLE ROW LEVEL SECURITY;

-- Corrigir funções com search_path mutable
ALTER FUNCTION public.cleanup_expired_sessions() SET search_path = '';
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';
ALTER FUNCTION public.update_updated_at() SET search_path = '';
ALTER FUNCTION public.create_contract_end_alert() SET search_path = '';
ALTER FUNCTION public.create_contract_alerts() SET search_path = '';