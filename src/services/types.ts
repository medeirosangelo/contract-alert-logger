
import { Database } from "@/integrations/supabase/types";

// Define type aliases for cleaner code
export type PhysicalPerson = Database["public"]["Tables"]["physical_persons"]["Row"];
export type PhysicalPersonInsert = Database["public"]["Tables"]["physical_persons"]["Insert"];

export type LegalPerson = Database["public"]["Tables"]["legal_persons"]["Row"];
export type LegalPersonInsert = Database["public"]["Tables"]["legal_persons"]["Insert"];

export type Contract = Database["public"]["Tables"]["contracts"]["Row"];
export type ContractInsert = Database["public"]["Tables"]["contracts"]["Insert"];

export type ContractAlert = Database["public"]["Tables"]["contract_alerts"]["Row"];
export type ContractAlertInsert = Database["public"]["Tables"]["contract_alerts"]["Insert"];

export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];

// No re-export needed as we've already exported the types above
