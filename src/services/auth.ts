import api from './api';
import { toast } from '@/components/ui/use-toast';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    try {
      console.log('Logging in...');
      const response = await api.post<LoginResponse>('/auth/login/', credentials);
      console.log('Login successful');
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
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

  logout: () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};