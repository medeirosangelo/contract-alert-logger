import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileCheck, 
  Shield, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  PenTool
} from "lucide-react";
import { contractSignaturesApi, type ContractSignature, type SignDocumentData } from "@/services/contractSignatures";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ContractSignaturePanelProps {
  contractId: string;
  contractContent: string;
  onSignatureUpdate?: () => void;
}

const ContractSignaturePanel = ({ 
  contractId, 
  contractContent, 
  onSignatureUpdate 
}: ContractSignaturePanelProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showSignForm, setShowSignForm] = useState(false);
  const [signerRole, setSignerRole] = useState("");

  // Buscar assinaturas do contrato
  const { data: signatures, isLoading, error } = useQuery({
    queryKey: ["contractSignatures", contractId],
    queryFn: () => contractSignaturesApi.getByContractId(contractId),
    enabled: !!contractId
  });

  // Mutação para assinar documento
  const signMutation = useMutation({
    mutationFn: contractSignaturesApi.signDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contractSignatures", contractId] });
      setShowSignForm(false);
      setSignerRole("");
      onSignatureUpdate?.();
    },
    onError: (error) => {
      console.error("Erro ao assinar documento:", error);
    }
  });

  // Verificar se o usuário atual já assinou
  const userSignature = signatures?.find(sig => sig.signer_id === user?.id && sig.is_valid);
  const hasUserSigned = !!userSignature;

  const handleSign = () => {
    if (!signerRole.trim()) {
      toast.error("Por favor, informe seu cargo/função.");
      return;
    }

    const signData: SignDocumentData = {
      contract_id: contractId,
      document_content: contractContent,
      signer_role: signerRole.trim()
    };

    signMutation.mutate(signData);
  };

  const getSignatureTypeLabel = (type: string) => {
    switch (type) {
      case 'basic':
        return 'Básica';
      case 'advanced':
        return 'Avançada';
      case 'qualified':
        return 'Qualificada';
      default:
        return 'Básica';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Assinaturas Digitais</h3>
        </div>
        <p className="text-warm-600">Carregando assinaturas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Assinaturas Digitais</h3>
        </div>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Erro ao carregar assinaturas do contrato.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Assinaturas Digitais</h3>
        </div>
        <p className="text-sm text-warm-600">
          Gerencie as assinaturas digitais deste contrato
        </p>
      </div>
      <div className="space-y-4">
        {/* Status do contrato */}
        <div className="flex items-center justify-between p-3 bg-warm-50 rounded-lg">
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-warm-600" />
            <span className="text-sm font-medium">Status:</span>
            {signatures && signatures.length > 0 ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                {signatures.filter(s => s.is_valid).length} assinatura(s)
              </Badge>
            ) : (
              <Badge variant="secondary">Não assinado</Badge>
            )}
          </div>
          
          {!hasUserSigned && user && (
            <Button
              onClick={() => setShowSignForm(!showSignForm)}
              size="sm"
              className="gap-2"
              disabled={signMutation.isPending}
            >
              <PenTool className="h-4 w-4" />
              Assinar Documento
            </Button>
          )}
        </div>

        {/* Formulário de assinatura */}
        {showSignForm && (
          <div className="p-4 border border-warm-200 rounded-lg space-y-4">
            <h4 className="font-medium">Assinar Documento</h4>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cargo/Função:</label>
              <input
                type="text"
                value={signerRole}
                onChange={(e) => setSignerRole(e.target.value)}
                placeholder="Ex: Diretor, Gerente, Coordenador..."
                className="w-full p-2 border border-warm-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Ao assinar, você confirma que leu e concorda com os termos do contrato. 
                Sua assinatura digital terá validade jurídica.
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-2">
              <Button
                onClick={handleSign}
                disabled={signMutation.isPending || !signerRole.trim()}
                className="gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                {signMutation.isPending ? "Assinando..." : "Confirmar Assinatura"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSignForm(false)}
                disabled={signMutation.isPending}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Lista de assinaturas */}
        {signatures && signatures.length > 0 && (
          <div className="space-y-3">
            <Separator />
            <h4 className="font-medium">Assinaturas Registradas:</h4>
            
            {signatures.map((signature) => (
              <div
                key={signature.id}
                className="p-3 border border-warm-200 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-warm-600" />
                    <span className="font-medium">{signature.signer_name}</span>
                    <Badge variant="outline" className="text-xs">
                      {signature.signer_role}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {signature.is_valid ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <Badge variant={signature.is_valid ? "default" : "destructive"} className="text-xs">
                      {signature.is_valid ? "Válida" : "Inválida"}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(signature.signature_date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Tipo: {getSignatureTypeLabel(signature.signature_type)}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <p>Email: {signature.signer_email}</p>
                  <p>Token: {signature.signature_token.substring(0, 20)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Aviso sobre assinatura já feita */}
        {hasUserSigned && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Você já assinou este documento em {formatDate(userSignature.signature_date)}.
            </AlertDescription>
          </Alert>
        )}

        {/* Informações sobre assinatura digital */}
        {(!signatures || signatures.length === 0) && (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este contrato ainda não possui assinaturas digitais. 
              As assinaturas garantem autenticidade e integridade do documento.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ContractSignaturePanel;