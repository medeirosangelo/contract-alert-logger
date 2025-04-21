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
      // Verifica se já existe o e-mail cadastrado antes de tentar cadastrar
      const { data: existing, error: existingError } = await supabase
        .from('users')
        .select('id')
        .eq('email', credentials.email)
        .maybeSingle();

      if (existing) {
        toast({
          title: "Cadastro já existente",
          description: "Já existe um usuário com este e-mail cadastrado.",
          variant: "destructive",
        });
        throw new Error('User already registered');
      }

      // Verifica se já existe este username
      if (credentials.username) {
        const { data: userFound } = await supabase
          .from('users')
          .select('id')
          .eq('username', credentials.username)
          .maybeSingle();
        if (userFound) {
          toast({
            title: "Usuário já existe",
            description: "Este nome de usuário já está em uso.",
            variant: "destructive",
          });
          throw new Error('Username already registered');
        }
      }

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

      toast({
        title: "Cadastro realizado",
        description: "Sua conta foi criada com sucesso. Verifique seu e-mail para confirmação.",
      });
      
      return authData;
    } catch (error: any) {
      // Mensagem melhorada
      let description = "Não foi possível criar sua conta. Verifique os dados e tente novamente.";
      if (error.message?.includes("User already registered")) {
        description = "Este e-mail já está em uso.";
      }
      if (error.message?.includes("Username already registered")) {
        description = "Nome de usuário já está em uso.";
      }
      toast({
        title: "Erro ao cadastrar",
        description,
        variant: "destructive",
      });
      throw error;
    }
  },

  login: async (credentials: LoginCredentials) => {
    try {
      let data;
      let error;

      if (credentials.isUsername) {
        // Buscar e-mail a partir do username
        const { data: user } = await supabase
          .from('users')
          .select('email')
          .eq('username', credentials.identifier)
          .maybeSingle();

        if (!user?.email) {
          toast({
            title: "Usuário não encontrado",
            description: "Nome de usuário inválido.",
            variant: "destructive",
          });
          throw new Error('Username not found');
        }
        const authResponse = await supabase.auth.signInWithPassword({
          email: user.email,
          password: credentials.password,
        });
        data = authResponse.data;
        error = authResponse.error;
      } else {
        const authResponse = await supabase.auth.signInWithPassword({
          email: credentials.identifier,
          password: credentials.password,
        });
        data = authResponse.data;
        error = authResponse.error;
      }

      if (error) throw error;
      
      toast({
        title: "Login realizado",
        description: "Você entrou com sucesso no sistema.",
      });
      return data;
    } catch (error: any) {
      let description = "Usuário ou senha inválidos.";
      if (error?.message?.includes('Username not found')) {
        description = "Nome de usuário não encontrado.";
      }
      toast({
        title: "Erro ao fazer login",
        description,
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
