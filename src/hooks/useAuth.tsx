
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { authApi } from '@/services/auth';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  role: string | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(!!currentUser);
        
        if (currentUser) {
          try {
            const userRole = await authApi.getUserRole();
            setRole(userRole);
          } catch (error) {
            console.error('Error fetching user role:', error);
            // Default to 'user' role if we can't fetch a specific role
            setRole('user');
          }
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
        setRole(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setIsAuthenticated(!!session?.user);
        
        if (session?.user) {
          try {
            const userRole = await authApi.getUserRole();
            setRole(userRole);
          } catch (error) {
            console.error('Error fetching user role in auth change:', error);
            // Default to 'user' role if we can't fetch a specific role
            setRole('user');
          }
        } else {
          setRole(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    await authApi.signUp({ email, password, name });
  };

  const login = async (email: string, password: string) => {
    const { session } = await authApi.login({ email, password });
    if (session?.user) {
      setUser(session.user);
      setIsAuthenticated(true);
      try {
        const userRole = await authApi.getUserRole();
        setRole(userRole);
      } catch (error) {
        console.error('Error getting user role in login:', error);
        // Default to 'user' role if we can't fetch a specific role
        setRole('user');
      }
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
