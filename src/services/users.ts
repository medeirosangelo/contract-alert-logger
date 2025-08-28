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
  
  // Verificar se o email já está cadastrado no Auth
  checkAuthEmailExists: async (email: string): Promise<boolean> => {
    try {
      // Usando admin.listUsers ou funções equivalentes seria ideal, mas sem acesso admin,
      // vamos apenas tentar criar o usuário e observar se retorna erro específico durante a criação
      return false; // Retornar false e deixar a criação do usuário tratar o erro específico
    } catch (error) {
      console.error('Erro ao verificar email no Auth:', error);
      return false;
    }
  },
  
  // Verificar se o email já está cadastrado na tabela users
  checkEmailExists: async (email: string): Promise<boolean> => {
    try {
      // Verificar na tabela public.users
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (error) throw error;
      
      return data !== null;
    } catch (error: any) {
      console.error('Erro ao verificar email na tabela users:', error);
      return false;
    }
  },
  
  create: async (userData: UserCreateRequest): Promise<User | null> => {
    try {
      console.log('Criando novo usuário:', userData);

      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (authError) {
        console.error('Erro ao criar usuário no Auth:', authError);
        toast({
          title: 'Erro ao criar usuário',
          description: authError.message || 'Não foi possível criar o usuário.',
          variant: 'destructive',
        });
        return null;
      }

      if (authData?.user) {
        const authUserId = authData.user.id;
        
        // Definir permissões baseadas no role
        const defaultPermissions = {
          dashboard: true,
          contracts: userData.role !== 'colaborador',
          users: userData.role === 'admin',
          edit: userData.role !== 'colaborador',
        };

        // Inserir na tabela users
        const userRecord: UserInsert = {
          id: authUserId,
          email: userData.email,
          name: userData.name,
          username: userData.email.split('@')[0],
          role: userData.role,
          permissions: defaultPermissions,
        };

        console.log('Inserindo usuário na tabela users:', userRecord);
        const { data, error } = await supabase
          .from('users')
          .insert(userRecord)
          .select()
          .single();

        if (error) {
          console.error('Erro ao inserir na tabela users:', error);
          
          // Tentar limpar o usuário do Auth se a inserção falhar
          try {
            await supabase.functions.invoke('delete-user', { body: { userId: authUserId } });
            console.log('Usuário removido do Auth após falha na inserção');
          } catch (cleanupError) {
            console.error('Erro ao limpar usuário do Auth:', cleanupError);
          }
          
          toast({
            title: 'Erro ao criar usuário',
            description: error.message || 'Não foi possível criar o registro do usuário.',
            variant: 'destructive',
          });
          return null;
        }

        toast({ 
          title: 'Usuário criado com sucesso', 
          description: `O usuário ${userData.name} foi criado.` 
        });
        return data;
      }

      return null;
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      toast({
        title: 'Erro ao criar usuário',
        description: error.message || 'Não foi possível criar o usuário.',
        variant: 'destructive',
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
