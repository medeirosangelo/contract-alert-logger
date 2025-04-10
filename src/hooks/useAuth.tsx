
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
            // Use setTimeout to avoid deadlock with Supabase
            setTimeout(async () => {
              try {
                if (mounted) {
                  const userRole = await authApi.getUserRole();
                  console.log('User role fetched on auth change:', userRole);
                  setRole(userRole);
                }
              } catch (error) {
                console.error('Error fetching user role in auth change:', error);
                if (mounted) {
                  setRole('user');
                }
              } finally {
                if (mounted) {
                  setIsLoading(false);
                }
              }
            }, 0);
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
            try {
              const userRole = await authApi.getUserRole();
              console.log('User role fetched on init:', userRole);
              if (mounted) {
                setRole(userRole);
              }
            } catch (error) {
              console.error('Error fetching user role:', error);
              if (mounted) {
                setRole('user');
              }
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
      const { session } = await authApi.login({ identifier, password, isUsername });
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
    } catch (error) {
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
