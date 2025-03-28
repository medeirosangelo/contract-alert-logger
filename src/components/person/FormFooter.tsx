
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { CardFooter } from "@/components/ui/card";

interface FormFooterProps {
  isSubmitting: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({ isSubmitting }) => {
  return (
    <CardFooter className="flex justify-end px-0 pt-4">
      <Button 
        type="submit" 
        className="w-full md:w-auto gap-2 bg-primary hover:bg-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            Cadastrar Pessoa Física
          </>
        )}
      </Button>
    </CardFooter>
  );
};

export default FormFooter;
