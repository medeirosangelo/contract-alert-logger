
import { supabase } from "@/integrations/supabase/client";

export interface AuthLog {
  id: string;
  user_id: string | null;
  email: string | null;
  action: string;
  ip_address: string | null;
  user_agent: string | null;
  details: any;
  created_at: string;
}

export const authLogsApi = {
  async logAuthEvent(
    action: 'login_success' | 'login_failed' | 'logout' | 'password_reset',
    email?: string,
    details?: any
  ) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Tentar obter informações do navegador
      let userAgent = '';
      let ipAddress = null;
      
      if (typeof window !== 'undefined') {
        userAgent = navigator.userAgent;
      }

      const logData = {
        user_id: user?.id || null,
        email: email || user?.email || null,
        action,
        user_agent: userAgent,
        ip_address: ipAddress,
        details: details || {}
      };

      const { error } = await supabase
        .from('auth_logs')
        .insert(logData);

      if (error) {
        console.error('Erro ao registrar log de autenticação:', error);
      }
    } catch (error) {
      console.error('Erro ao criar log de autenticação:', error);
    }
  },

  async getUserAuthLogs(limit: number = 10) {
    try {
      const { data, error } = await supabase
        .from('auth_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as AuthLog[];
    } catch (error) {
      console.error('Erro ao buscar logs de autenticação:', error);
      return [];
    }
  }
};
