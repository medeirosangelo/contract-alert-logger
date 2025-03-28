export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contract_alerts: {
        Row: {
          alert_date: string
          alert_type: string
          contract_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          status: string
        }
        Insert: {
          alert_date: string
          alert_type: string
          contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          status?: string
        }
        Update: {
          alert_date?: string
          alert_type?: string
          contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_alerts_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_alerts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          account: string | null
          adjustment_index: string | null
          agency: string | null
          bank: string | null
          budget_unit: string | null
          contract_number: string
          contracted_id: string | null
          contractor_id: string | null
          created_at: string | null
          created_by: string | null
          delay_penalty: string | null
          duration: number
          end_date: string
          expense_nature: string | null
          general_observations: string | null
          id: string
          legal_rep_id: string | null
          object: string
          payment_term: string | null
          price_adjustment_term: number | null
          publication_date: string | null
          resource_source: string | null
          signature_date: string
          signature_location: string | null
          start_date: string
          status: string
          termination_penalty: string | null
          total_value: number
          updated_at: string | null
          witness1_id: string | null
          witness2_id: string | null
          work_program: string | null
        }
        Insert: {
          account?: string | null
          adjustment_index?: string | null
          agency?: string | null
          bank?: string | null
          budget_unit?: string | null
          contract_number: string
          contracted_id?: string | null
          contractor_id?: string | null
          created_at?: string | null
          created_by?: string | null
          delay_penalty?: string | null
          duration: number
          end_date: string
          expense_nature?: string | null
          general_observations?: string | null
          id?: string
          legal_rep_id?: string | null
          object: string
          payment_term?: string | null
          price_adjustment_term?: number | null
          publication_date?: string | null
          resource_source?: string | null
          signature_date: string
          signature_location?: string | null
          start_date: string
          status?: string
          termination_penalty?: string | null
          total_value: number
          updated_at?: string | null
          witness1_id?: string | null
          witness2_id?: string | null
          work_program?: string | null
        }
        Update: {
          account?: string | null
          adjustment_index?: string | null
          agency?: string | null
          bank?: string | null
          budget_unit?: string | null
          contract_number?: string
          contracted_id?: string | null
          contractor_id?: string | null
          created_at?: string | null
          created_by?: string | null
          delay_penalty?: string | null
          duration?: number
          end_date?: string
          expense_nature?: string | null
          general_observations?: string | null
          id?: string
          legal_rep_id?: string | null
          object?: string
          payment_term?: string | null
          price_adjustment_term?: number | null
          publication_date?: string | null
          resource_source?: string | null
          signature_date?: string
          signature_location?: string | null
          start_date?: string
          status?: string
          termination_penalty?: string | null
          total_value?: number
          updated_at?: string | null
          witness1_id?: string | null
          witness2_id?: string | null
          work_program?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_contracted_id_fkey"
            columns: ["contracted_id"]
            isOneToOne: false
            referencedRelation: "legal_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "legal_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_legal_rep_id_fkey"
            columns: ["legal_rep_id"]
            isOneToOne: false
            referencedRelation: "physical_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_witness1_id_fkey"
            columns: ["witness1_id"]
            isOneToOne: false
            referencedRelation: "physical_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_witness2_id_fkey"
            columns: ["witness2_id"]
            isOneToOne: false
            referencedRelation: "physical_persons"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_persons: {
        Row: {
          account: string | null
          agency: string | null
          bank: string | null
          city: string
          cnpj: string
          company_name: string
          complement: string | null
          created_at: string | null
          created_by: string | null
          email: string
          id: string
          legal_rep_cpf: string
          legal_rep_name: string
          legal_rep_role: string
          neighborhood: string
          number: string
          phone: string
          state: string
          state_registration: string | null
          street: string
          trade_name: string | null
          updated_at: string | null
          zip_code: string
        }
        Insert: {
          account?: string | null
          agency?: string | null
          bank?: string | null
          city: string
          cnpj: string
          company_name: string
          complement?: string | null
          created_at?: string | null
          created_by?: string | null
          email: string
          id?: string
          legal_rep_cpf: string
          legal_rep_name: string
          legal_rep_role: string
          neighborhood: string
          number: string
          phone: string
          state: string
          state_registration?: string | null
          street: string
          trade_name?: string | null
          updated_at?: string | null
          zip_code: string
        }
        Update: {
          account?: string | null
          agency?: string | null
          bank?: string | null
          city?: string
          cnpj?: string
          company_name?: string
          complement?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string
          id?: string
          legal_rep_cpf?: string
          legal_rep_name?: string
          legal_rep_role?: string
          neighborhood?: string
          number?: string
          phone?: string
          state?: string
          state_registration?: string | null
          street?: string
          trade_name?: string | null
          updated_at?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "legal_persons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      physical_persons: {
        Row: {
          birth_date: string
          city: string
          complement: string | null
          cpf: string
          created_at: string | null
          created_by: string | null
          email: string
          full_name: string
          id: string
          neighborhood: string
          number: string
          phone: string
          rg: string | null
          role: string | null
          state: string
          street: string
          updated_at: string | null
          zip_code: string
        }
        Insert: {
          birth_date: string
          city: string
          complement?: string | null
          cpf: string
          created_at?: string | null
          created_by?: string | null
          email: string
          full_name: string
          id?: string
          neighborhood: string
          number: string
          phone: string
          rg?: string | null
          role?: string | null
          state: string
          street: string
          updated_at?: string | null
          zip_code: string
        }
        Update: {
          birth_date?: string
          city?: string
          complement?: string | null
          cpf?: string
          created_at?: string | null
          created_by?: string | null
          email?: string
          full_name?: string
          id?: string
          neighborhood?: string
          number?: string
          phone?: string
          rg?: string | null
          role?: string | null
          state?: string
          street?: string
          updated_at?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "physical_persons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          role?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
