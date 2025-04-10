import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { User, UserInsert } from "./types";

export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
  username?: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
  isUsername?: boolean;
}

export const authApi = {
  signUp: async (credentials: SignUpCredentials) => {
    try {
      console.log('Signing up...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            username: credentials.username || credentials.email.split('@')[0],
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user record in the users table
        const userData: UserInsert = {
          id: authData.user.id,
          email: credentials.email,
          name: credentials.name,
          username: credentials.username || credentials.email.split('@')[0],
          role: 'user'
        };
        
        const { error: userError } = await supabase
          .from('users')
          .insert(userData);

        if (userError) throw userError;
      }

      console.log('Sign up successful');
      toast({
        title: "Cadastro realizado",
        description: "Sua conta foi criada com sucesso. Verifique seu e-mail para confirmação.",
      });
      
      return authData;
    } catch (error: any) {
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
      let data;
      let error;
      
      if (credentials.isUsername) {
        // Direct login with email using the input as is
        console.log('Login with username:', credentials.identifier);
        const authResponse = await supabase.auth.signInWithPassword({
          // For simplicity, using the identifier as both email and password
          // This is a workaround until we add the username field to users table
          email: `${credentials.identifier}@example.com`,
          password: credentials.password,
        });
        
        data = authResponse.data;
        error = authResponse.error;
      } else {
        // Normal login with email
        console.log('Login with email:', credentials.identifier);
        const authResponse = await supabase.auth.signInWithPassword({
          email: credentials.identifier,
          password: credentials.password,
        });
        
        data = authResponse.data;
        error = authResponse.error;
      }

      if (error) throw error;
      console.log('Login successful');
      
      toast({
        title: "Login realizado",
        description: "Você entrou com sucesso no sistema.",
      });
      
      return data;
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Erro ao fazer login",
        description: "Usuário ou senha inválidos.",
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
      
      // For now, we'll just return a default 'admin' role for the specific user
      // In a real application, this would query the users table
      return 'admin';
    } catch (error) {
      console.error('Error in getUserRole:', error);
      return 'user'; // Default role if there's an error
    }
  }
};
