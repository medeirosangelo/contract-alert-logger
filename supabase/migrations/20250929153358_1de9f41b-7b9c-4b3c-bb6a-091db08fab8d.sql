-- Corrigir funções para ter search_path adequado (correção de segurança)

-- Recriar função generate_document_hash com search_path adequado
CREATE OR REPLACE FUNCTION public.generate_document_hash(content TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Gera hash SHA-256 do conteúdo do documento
  RETURN encode(digest(content, 'sha256'), 'hex');
END;
$$;

-- Recriar função validate_signature com search_path adequado
CREATE OR REPLACE FUNCTION public.validate_signature(
  p_contract_id UUID,
  p_signer_id UUID,
  p_document_content TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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