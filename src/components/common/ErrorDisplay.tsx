
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorDisplayProps {
  title: string;
  message: string;
  error?: string;
  onRetry: () => void;
}

const ErrorDisplay = ({ title, message, error, onRetry }: ErrorDisplayProps) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="h-6 w-6 text-red-500" />
        <h3 className="font-medium text-lg">{title}</h3>
      </div>
      <p className="mb-3">{message}</p>
      {error && (
        <p className="text-sm mb-4">Detalhes: {error}</p>
      )}
      <Button 
        variant="outline" 
        onClick={onRetry} 
        className="gap-2 border-red-300 text-red-700 hover:bg-red-50"
      >
        <RefreshCw className="h-4 w-4" />
        Tentar novamente
      </Button>
    </div>
  );
};

export default ErrorDisplay;
