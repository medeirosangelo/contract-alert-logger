
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authApi = {
  signUp: async (credentials: SignUpCredentials) => {
    try {
      console.log('Signing up...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user record in the users table
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: credentials.email,
            name: credentials.name,
          });

        if (userError) throw userError;
      }

      console.log('Sign up successful');
      toast({
        title: "Cadastro realizado",
        description: "Sua conta foi criada com sucesso. Verifique seu e-mail para confirmação.",
      });
      
      return authData;
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Erro ao cadastrar",
        description: "Não foi possível criar sua conta. Verifique os dados e tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  },

  login: async (credentials: LoginCredentials) => {
    try {
      console.log('Logging in...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;
      console.log('Login successful');
      
      toast({
        title: "Login realizado",
        description: "Você entrou com sucesso no sistema.",
      });
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro ao fazer login",
        description: "E-mail ou senha inválidos.",
        variant: "destructive",
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      console.log('Logging out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      return session?.user || null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  isAuthenticated: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      return !!session?.user;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  },

  getUserRole: async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) return null;
      
      const { data, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();
        
      if (userError) {
        console.error('Error fetching user role from database:', userError);
        // Instead of throwing, we'll return a default role
        return 'user';
      }
      
      return data?.role || 'user';
    } catch (error) {
      console.error('Error in getUserRole:', error);
      return 'user'; // Default role if there's an error
    }
  }
};
