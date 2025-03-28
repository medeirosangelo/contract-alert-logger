
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
    console.log('AuthProvider initialized');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, !!session);
        
        setUser(session?.user || null);
        setIsAuthenticated(!!session?.user);
        
        if (session?.user) {
          try {
            const userRole = await authApi.getUserRole();
            console.log('User role fetched on auth change:', userRole);
            setRole(userRole);
          } catch (error) {
            console.error('Error fetching user role in auth change:', error);
            setRole('user');
          }
        } else {
          setRole(null);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    const fetchUser = async () => {
      try {
        console.log('Checking for existing session');
        const { data: { session } } = await supabase.auth.getSession();
        
        console.log('Existing session found:', !!session);
        setUser(session?.user || null);
        setIsAuthenticated(!!session?.user);
        
        if (session?.user) {
          try {
            const userRole = await authApi.getUserRole();
            console.log('User role fetched on init:', userRole);
            setRole(userRole);
          } catch (error) {
            console.error('Error fetching user role:', error);
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
        console.log('Setting isLoading to false');
        setIsLoading(false);
      }
    };

    fetchUser();

    return () => {
      console.log('Cleaning up auth subscription');
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
        console.log('User role after login:', userRole);
        setRole(userRole);
      } catch (error) {
        console.error('Error getting user role in login:', error);
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
