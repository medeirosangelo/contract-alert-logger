
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
            // For the purpose of this app, the hard-coded admin user always gets admin role
            if (session.user.email === ADMIN_EMAIL || 
                session.user.user_metadata?.username === ADMIN_USERNAME) {
              setRole('admin');
            } else {
              setRole('user');
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
            // For the purpose of this app, the hard-coded admin user always gets admin role
            if (session.user.email === ADMIN_EMAIL || 
                session.user.user_metadata?.username === ADMIN_USERNAME) {
              setRole('admin');
            } else {
              setRole('user');
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
      // Special logic for the admin user
      if ((isUsername && identifier === ADMIN_USERNAME && password === ADMIN_PASSWORD) ||
          (!isUsername && identifier === ADMIN_EMAIL && password === ADMIN_PASSWORD)) {
        
        // Use the hardcoded email for signing in through Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        });

        if (error) {
          // If the admin user doesn't exist yet, create it
          if (error.message.includes('Invalid login credentials')) {
            console.log('Admin user does not exist, creating...');
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD,
              options: {
                data: {
                  username: ADMIN_USERNAME,
                  name: "Administrador",
                  role: "admin"
                }
              }
            });

            if (signUpError) throw signUpError;
            
            // Now try to sign in with the newly created admin account
            const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD,
            });
            
            if (retryError) throw retryError;
            
            if (retryData.session?.user) {
              setUser(retryData.session.user);
              setRole('admin');
              setIsAuthenticated(true);
            }
          } else {
            throw error;
          }
        } else if (data.session?.user) {
          setUser(data.session.user);
          setRole('admin');
          setIsAuthenticated(true);
        }
      } else {
        // For non-admin users, use the regular login
        const { session } = await authApi.login({ identifier, password, isUsername });
        if (session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
          setRole('user'); // Default role for other users
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
