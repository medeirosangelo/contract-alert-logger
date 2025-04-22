
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { User, UserInsert } from "./types";

export interface UserCreateRequest {
  email: string;
  password: string;
  name: string;
  role: "admin" | "gestor" | "colaborador";
}

export const userApi = {
  getAll: async (): Promise<User[]> => {
    try {
      console.log('Buscando todos os usuários');
      
      // Buscar todos os usuários - com as novas políticas simplificadas
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      
      console.log(`${data?.length || 0} usuários encontrados`);
      return data || [];
    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error);
      toast({
        title: "Erro ao carregar usuários",
        description: error.message || "Não foi possível buscar a lista de usuários.",
        variant: "destructive",
      });
      return [];
    }
  },
  
  getById: async (id: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Erro ao buscar usuário por ID:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível encontrar o usuário solicitado.",
        variant: "destructive",
      });
      return null;
    }
  },
  
  // Verificar se o email já está cadastrado
  checkEmailExists: async (email: string): Promise<boolean> => {
    try {
      // Verificar se existe na tabela auth.users - não é possível com RLS
      // Verificar na tabela public.users
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (error) throw error;
      
      return data !== null;
    } catch (error: any) {
      console.error('Erro ao verificar email:', error);
      return false; // Em caso de erro, assume que não existe para tentar criar
    }
  },
  
  create: async (userData: UserCreateRequest): Promise<User | null> => {
    try {
      console.log('Criando novo usuário:', userData);
      
      // Verificar se o email já existe antes de tentar criar
      const emailExists = await userApi.checkEmailExists(userData.email);
      if (emailExists) {
        console.log('Email já cadastrado:', userData.email);
        toast({
          title: "Email já cadastrado",
          description: "Este email já está sendo utilizado por outro usuário.",
          variant: "destructive",
        });
        return null;
      }
      
      // Verificar se a tabela está vazia (primeiro usuário/bootstrap)
      const { count, error: countError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      let isFirstUser = false;
      if (countError) {
        console.error('Erro ao verificar quantidade de usuários:', countError);
      } else {
        isFirstUser = count === 0;
        console.log('É o primeiro usuário?', isFirstUser);
      }
      
      // Criar o usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: isFirstUser ? "admin" : userData.role,
          }
        }
      });

      if (authError) {
        // Se o erro for "User already registered", retornar erro específico
        if (authError.message?.includes('User already registered')) {
          console.log('Erro de usuário já registrado:', authError);
          toast({
            title: "Email já cadastrado",
            description: "Este email já está sendo utilizado por outro usuário.",
            variant: "destructive",
          });
          return null;
        }
        
        console.error('Erro ao criar usuário no Auth:', authError);
        throw authError;
      }
      
      if (authData.user) {
        // Definir permissões padrão com base na role
        const finalRole = isFirstUser ? "admin" : userData.role;
        const defaultPermissions = {
          dashboard: true,
          contracts: finalRole !== "colaborador",
          users: finalRole === "admin",
          edit: finalRole !== "colaborador"
        };

        // Inserir no banco
        const userRecord: UserInsert = {
          id: authData.user.id,
          email: userData.email,
          name: userData.name,
          username: userData.email.split('@')[0],
          role: finalRole,
          permissions: defaultPermissions
        };
        
        console.log('Inserindo usuário na tabela users:', userRecord);
        
        const { data, error } = await supabase
          .from('users')
          .insert(userRecord)
          .select()
          .single();

        if (error) {
          console.error('Erro ao inserir no banco:', error);
          throw error;
        }
        
        toast({
          title: "Usuário criado com sucesso",
          description: `O usuário ${userData.name} foi criado.`,
        });
        
        return data;
      }
      
      return null;
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      toast({
        title: "Erro ao criar usuário",
        description: error.message || "Não foi possível criar o usuário.",
        variant: "destructive",
      });
      return null;
    }
  },
  
  update: async (id: string, userData: Partial<User>): Promise<User | null> => {
    try {
      const { id: userId, ...updateData } = userData;
      
      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Usuário atualizado",
        description: `Os dados do usuário foram atualizados com sucesso.`,
      });
      
      return data;
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Não foi possível atualizar o usuário.",
        variant: "destructive",
      });
      return null;
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      const { error: authError } = await supabase.functions.invoke('delete-user', {
        body: { userId: id }
      });
      
      if (authError) throw authError;
      
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Usuário removido",
        description: "O usuário foi removido com sucesso.",
      });
      
      return true;
    } catch (error: any) {
      console.error('Erro ao excluir usuário:', error);
      toast({
        title: "Erro ao excluir",
        description: error.message || "Não foi possível excluir o usuário.",
        variant: "destructive",
      });
      return false;
    }
  },
  
  updatePermissions: async (userId: string, permissions: Record<string, boolean>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ permissions } as any)
        .eq('id', userId);

      if (error) throw error;
      
      toast({
        title: "Permissões atualizadas",
        description: "As permissões do usuário foram atualizadas com sucesso.",
      });
      
      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar permissões:', error);
      toast({
        title: "Erro ao atualizar permissões",
        description: error.message || "Não foi possível atualizar as permissões.",
        variant: "destructive",
      });
      return false;
    }
  }
};
