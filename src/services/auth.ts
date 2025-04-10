
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { User } from "./types";

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
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: credentials.email,
            name: credentials.name,
            username: credentials.username || credentials.email.split('@')[0],
          } as any); // Using 'as any' to bypass type checking for this operation

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
      let data;
      let error;
      
      if (credentials.isUsername) {
        // If using username, first find the associated email
        console.log('Login with username:', credentials.identifier);
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('email')
          .eq('username', credentials.identifier)
          .single();
        
        if (userError) {
          console.error('Username lookup error:', userError);
          throw new Error('Usuário não encontrado');
        }
        
        if (!userData?.email) {
          throw new Error('Usuário não encontrado');
        }
        
        // Now login with the found email
        const authResponse = await supabase.auth.signInWithPassword({
          email: userData.email,
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
    } catch (error) {
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
