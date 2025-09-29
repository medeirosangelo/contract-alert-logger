-- Criar tabela para armazenar assinaturas digitais dos contratos
CREATE TABLE public.contract_signatures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  signer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  signer_name TEXT NOT NULL,
  signer_email TEXT NOT NULL,
  signer_role TEXT NOT NULL,
  document_hash TEXT NOT NULL, -- Hash SHA-256 do documento
  signature_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  signature_type TEXT NOT NULL DEFAULT 'basic', -- 'basic', 'advanced', 'qualified'
  ip_address INET,
  user_agent TEXT,
  signature_token TEXT NOT NULL, -- Token único da assinatura
  is_valid BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraint para evitar assinaturas duplicadas
  UNIQUE(contract_id, signer_id)
);

-- Habilitar RLS na tabela de assinaturas
ALTER TABLE public.contract_signatures ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para assinaturas
CREATE POLICY "Users can view contract signatures"
ON public.contract_signatures
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create their own signatures"
ON public.contract_signatures
FOR INSERT
WITH CHECK (auth.uid() = signer_id);

CREATE POLICY "Users can update their own signatures"
ON public.contract_signatures
FOR UPDATE
USING (auth.uid() = signer_id);

-- Admins podem ver e gerenciar todas as assinaturas
CREATE POLICY "Admins can manage all signatures"
ON public.contract_signatures
FOR ALL
USING (public.get_current_user_role() = 'admin');

-- Trigger para atualizar updated_at
CREATE TRIGGER update_contract_signatures_updated_at
BEFORE UPDATE ON public.contract_signatures
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para melhor performance
CREATE INDEX idx_contract_signatures_contract_id ON public.contract_signatures(contract_id);
CREATE INDEX idx_contract_signatures_signer_id ON public.contract_signatures(signer_id);
CREATE INDEX idx_contract_signatures_signature_date ON public.contract_signatures(signature_date);

-- Função para gerar hash de documento
CREATE OR REPLACE FUNCTION public.generate_document_hash(content TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Gera hash SHA-256 do conteúdo do documento
  RETURN encode(digest(content, 'sha256'), 'hex');
END;
$$;

-- Função para validar assinatura
CREATE OR REPLACE FUNCTION public.validate_signature(
  p_contract_id UUID,
  p_signer_id UUID,
  p_document_content TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stored_hash TEXT;
  calculated_hash TEXT;
BEGIN
  -- Buscar hash armazenado da assinatura
  SELECT document_hash INTO stored_hash
  FROM public.contract_signatures
  WHERE contract_id = p_contract_id 
    AND signer_id = p_signer_id
    AND is_valid = true;
  
  IF stored_hash IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Calcular hash do documento atual
  calculated_hash := public.generate_document_hash(p_document_content);
  
  -- Comparar hashes
  RETURN stored_hash = calculated_hash;
END;
$$;