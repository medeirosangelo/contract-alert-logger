
import { useState } from 'react';
import { documentUploadApi, UploadDocumentParams } from '@/services/documentUpload';
import { useQueryClient } from '@tanstack/react-query';

export const useDocumentUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const uploadDocument = async (params: UploadDocumentParams) => {
    setIsUploading(true);
    try {
      const result = await documentUploadApi.uploadDocument(params);
      
      // Invalidate queries to refresh document lists
      queryClient.invalidateQueries({ 
        queryKey: ['documents', params.entityType, params.entityId] 
      });
      
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteDocument = async (documentId: string, entityType: string, entityId: string) => {
    try {
      await documentUploadApi.deleteDocument(documentId);
      
      // Invalidate queries to refresh document lists
      queryClient.invalidateQueries({ 
        queryKey: ['documents', entityType, entityId] 
      });
    } catch (error) {
      throw error;
    }
  };

  return {
    uploadDocument,
    deleteDocument,
    isUploading
  };
};
