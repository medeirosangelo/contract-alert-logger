
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { authApi } from '@/services/auth';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  role: string | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string, username?: string) => Promise<void>;
  login: (identifier: string, password: string, isUsername?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hard-coded credentials for the admin user
const ADMIN_USERNAME = "medeirosangelo";
const ADMIN_PASSWORD = "290412";
const ADMIN_EMAIL = "medeirosangelogabriel@gmail.com";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Garante que exista um registro correspondente na tabela public.users para o usuário autenticado
  const ensureUserRecord = async (currentUser: User, resolvedRole: string) => {
    try {
      const { data: existing } = await supabase
        .from('users')
        .select('id, role')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (!existing) {
        const permissions = {
          dashboard: true,
          contracts: resolvedRole !== 'colaborador',
          users: resolvedRole === 'admin',
          edit: resolvedRole !== 'colaborador',
        } as any;

        await supabase.from('users').insert({
          id: currentUser.id,
          email: currentUser.email || '',
          name: (currentUser.user_metadata as any)?.name || (currentUser.email?.split('@')[0] || 'Usuário'),
          username: (currentUser.user_metadata as any)?.username || (currentUser.email ? currentUser.email.split('@')[0] : ''),
          role: resolvedRole,
          permissions,
        } as any);
      } else if (existing.role !== resolvedRole) {
        // Mantém o papel sincronizado com o metadado/heurística local
        await supabase.from('users').update({ role: resolvedRole } as any).eq('id', currentUser.id);
      }
    } catch (err) {
      console.error('Erro ao garantir registro do usuário na tabela users:', err);
    }
  };

  useEffect(() => {
    console.log('AuthProvider initialized');
    let mounted = true;
    
    // First set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, !!session);
        
        if (mounted) {
          setUser(session?.user || null);
          setIsAuthenticated(!!session?.user);
          
          if (session?.user) {
            // Verificando se o usuário tem role definido nos metadados
            const userRole = session.user.user_metadata?.role;
            
            if (userRole) {
              setRole(userRole);
            } else if (session.user.email === ADMIN_EMAIL || 
                session.user.user_metadata?.username === ADMIN_USERNAME) {
              setRole('admin');
            } else {
              setRole('colaborador'); // Default role
            }
            setIsLoading(false);
          } else {
            setRole(null);
            setIsLoading(false);
          }
        }
      }
    );

    // Then check for an existing session
    const fetchUser = async () => {
      try {
        console.log('Checking for existing session');
        const { data: { session } } = await supabase.auth.getSession();
        
        console.log('Existing session found:', !!session);
        
        if (mounted) {
          setUser(session?.user || null);
          setIsAuthenticated(!!session?.user);
          
          if (session?.user) {
            // Verificando se o usuário tem role definido nos metadados
            const userRole = session.user.user_metadata?.role;
            
            if (userRole) {
              setRole(userRole);
            } else if (session.user.email === ADMIN_EMAIL || 
                session.user.user_metadata?.username === ADMIN_USERNAME) {
              setRole('admin');
            } else {
              setRole('colaborador'); // Default role
            }
          } else {
            setRole(null);
          }
          
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        if (mounted) {
          setUser(null);
          setRole(null);
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      console.log('Cleaning up auth subscription');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, name: string, username?: string) => {
    await authApi.signUp({ email, password, name, username });
  };

  const login = async (identifier: string, password: string, isUsername: boolean = false) => {
    setIsLoading(true);
    try {
      // Determinar se é login por email ou username
      let email = identifier;
      
      // Se for login por username, buscar o email correspondente
      if (isUsername) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('email')
          .eq('username', identifier)
          .single();
          
        if (error || !userData) {
          throw new Error('Usuário não encontrado');
        }
        email = userData.email;
      }

      // Fazer login no Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      if (data.session?.user) {
        setUser(data.session.user);
        setIsAuthenticated(true);

        // Buscar role do usuário na tabela users
        const { data: userRole, error: roleError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.session.user.id)
          .single();

        if (roleError) {
          console.error('Erro ao buscar role do usuário:', roleError);
          setRole('colaborador'); // Default role
        } else {
          setRole(userRole.role);
        }
      }
    } catch (error: any) {
      console.error('Error in login function:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error in logout function:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    role,
    isLoading,
    signUp,
    login,
    logout,
    isAuthenticated,
  };

  console.log('AuthProvider state:', { isAuthenticated, isLoading, user: !!user });
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

