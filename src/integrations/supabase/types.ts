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
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          role?: string
          username?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: string
          username?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
