
import { Database } from "@/integrations/supabase/types";
import { Json } from "@/integrations/supabase/types";

// Define type aliases for cleaner code
export type PhysicalPerson = Database["public"]["Tables"]["physical_persons"]["Row"];
export type PhysicalPersonInsert = Database["public"]["Tables"]["physical_persons"]["Insert"];

export type LegalPerson = Database["public"]["Tables"]["legal_persons"]["Row"];
export type LegalPersonInsert = Database["public"]["Tables"]["legal_persons"]["Insert"];

export type Contract = Database["public"]["Tables"]["contracts"]["Row"];
export type ContractInsert = Database["public"]["Tables"]["contracts"]["Insert"];

export type ContractAlert = Database["public"]["Tables"]["contract_alerts"]["Row"];
export type ContractAlertInsert = Database["public"]["Tables"]["contract_alerts"]["Insert"];

// Atualizando a definição de User para ser compatível com o tipo Json do Supabase para permissions
export type User = Database["public"]["Tables"]["users"]["Row"] & {
  permissions?: Json;
};
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];

// Novos tipos para as tabelas de autenticação e documentos
export type UserSession = Database["public"]["Tables"]["user_sessions"]["Row"];
export type UserSessionInsert = Database["public"]["Tables"]["user_sessions"]["Insert"];

export type AuthLog = Database["public"]["Tables"]["auth_logs"]["Row"];
export type AuthLogInsert = Database["public"]["Tables"]["auth_logs"]["Insert"];

export type DocumentUpload = Database["public"]["Tables"]["document_uploads"]["Row"];
export type DocumentUploadInsert = Database["public"]["Tables"]["document_uploads"]["Insert"];
