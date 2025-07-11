import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import supabase from './supabaseClient';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

// Role type
export type UserRole = 'student' | 'teacher' | 'admin';

// Extend user with role
export interface User {
  id: string;
  name?: string;
  email: string;
  role?: UserRole;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Fetch session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session?.user) {
        const profile = await fetchUserProfile(data.session.user);
        setUser(profile);
        localStorage.setItem('user', JSON.stringify(profile));
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user).then(profile => {
          setUser(profile);
          localStorage.setItem('user', JSON.stringify(profile));
        });
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 👇 Supabase login
  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return false;

    const profile = await fetchUserProfile(data.user);
    setUser(profile);
    localStorage.setItem('user', JSON.stringify(profile));
    return true;
  };

  // 👇 Logout
  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('user');
  };

  // Fetch profile data from Supabase (e.g., "profiles" table with name and role)
  const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<User> => {
    console.log('Fetching user profile...');
    const { data, error } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('id', supabaseUser.id)
      .maybeSingle();
      console.log('User profile data:', data);
      if(error){
        console.error('Error fetching user profile:', error);
        throw error;
      }

    return {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      name: data?.name || '',
      role: data?.role as UserRole,
    };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};