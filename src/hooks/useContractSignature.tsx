import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contractSignaturesApi, type SignDocumentData } from "@/services/contractSignatures";
import { useAuth } from "./useAuth";

export const useContractSignature = (contractId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Query para buscar assinaturas do contrato
  const signaturesQuery = useQuery({
    queryKey: ["contractSignatures", contractId],
    queryFn: () => contractSignaturesApi.getByContractId(contractId),
    enabled: !!contractId
  });

  // Mutação para assinar documento
  const signMutation = useMutation({
    mutationFn: contractSignaturesApi.signDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contractSignatures", contractId] });
    }
  });

  // Mutação para validar assinatura
  const validateMutation = useMutation({
    mutationFn: ({ signerId, documentContent }: { signerId: string; documentContent: string }) =>
      contractSignaturesApi.validateSignature(contractId, signerId, documentContent)
  });

  // Verificar se o usuário atual já assinou
  const userSignature = signaturesQuery.data?.find(
    sig => sig.signer_id === user?.id && sig.is_valid
  );
  const hasUserSigned = !!userSignature;

  // Contar assinaturas válidas
  const validSignaturesCount = signaturesQuery.data?.filter(sig => sig.is_valid).length || 0;

  return {
    signatures: signaturesQuery.data || [],
    isLoading: signaturesQuery.isLoading,
    error: signaturesQuery.error,
    userSignature,
    hasUserSigned,
    validSignaturesCount,
    signDocument: signMutation.mutate,
    isSigningDocument: signMutation.isPending,
    validateSignature: validateMutation.mutate,
    isValidating: validateMutation.isPending,
    validationResult: validateMutation.data,
    refetch: signaturesQuery.refetch
  };
};