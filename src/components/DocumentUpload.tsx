
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Trash2, Download } from 'lucide-react';
import { documentUploadApi, DocumentUpload } from '@/services/documentUpload';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

interface DocumentUploadProps {
  entityType: 'physical_person' | 'legal_person' | 'contract';
  entityId: string;
  title?: string;
}

const DocumentUploadComponent = ({ entityType, entityId, title = "Documentos" }: DocumentUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['documents', entityType, entityId],
    queryFn: () => documentUploadApi.getDocuments(entityType, entityId),
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!selectedDocumentType) {
      alert('Por favor, selecione o tipo de documento');
      return;
    }

    setIsUploading(true);
    try {
      await documentUploadApi.uploadDocument({
        file,
        entityType,
        entityId,
        documentType: selectedDocumentType
      });
      
      // Refresh documents list
      queryClient.invalidateQueries({ queryKey: ['documents', entityType, entityId] });
      
      // Reset form
      setSelectedDocumentType('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Erro no upload:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    if (!confirm('Tem certeza que deseja deletar este documento?')) return;

    try {
      await documentUploadApi.deleteDocument(documentId);
      queryClient.invalidateQueries({ queryKey: ['documents', entityType, entityId] });
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const handleDownload = async (document: DocumentUpload) => {
    try {
      const url = await documentUploadApi.getDocumentUrl(document.file_path);
      if (url) {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Erro ao baixar documento:', error);
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'cpf': 'CPF',
      'rg': 'RG',
      'cnpj': 'CNPJ',
      'contract': 'Contrato',
      'invoice': 'Nota Fiscal',
      'other': 'Outro'
    };
    return types[type] || type;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Form */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="documentType">Tipo de Documento</Label>
            <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpf">CPF</SelectItem>
                <SelectItem value="rg">RG</SelectItem>
                <SelectItem value="cnpj">CNPJ</SelectItem>
                <SelectItem value="contract">Contrato</SelectItem>
                <SelectItem value="invoice">Nota Fiscal</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="file">Arquivo</Label>
            <Input
              ref={fileInputRef}
              id="file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Formatos aceitos: PDF, JPG, PNG, DOC, DOCX (máx. 10MB)
            </p>
          </div>

          <Button 
            onClick={() => fileInputRef.current?.click()} 
            disabled={isUploading || !selectedDocumentType}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Enviando...' : 'Selecionar e Enviar Arquivo'}
          </Button>
        </div>

        {/* Documents List */}
        <div className="space-y-2">
          <Label>Documentos Enviados</Label>
          
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : documents.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Nenhum documento enviado ainda
            </p>
          ) : (
            <div className="space-y-2">
              {documents.map((doc: DocumentUpload) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{doc.file_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {getDocumentTypeLabel(doc.document_type || 'other')} • 
                      {(doc.file_size / 1024 / 1024).toFixed(2)} MB • 
                      {new Date(doc.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadComponent;
