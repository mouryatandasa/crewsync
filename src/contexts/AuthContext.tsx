import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'organizer' | 'volunteer';
  phone?: string;
  skills?: string[];
  availability?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('crewsync-user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } catch (error) {
        localStorage.removeItem('crewsync-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      setIsLoading(false);
      return { success: false, error: 'User not found. Please check your email address.' };
    }
    
    // In a real app, you'd verify the password hash
    // For demo purposes, we'll accept any password
    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    
    setCurrentUser(user);
    localStorage.setItem('crewsync-user', JSON.stringify(user));
    setIsLoading(false);
    
    return { success: true };
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'An account with this email already exists.' };
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      skills: userData.skills,
      availability: userData.availability,
    };
    
    // In a real app, you'd save to database
    mockUsers.push(newUser);
    
    setCurrentUser(newUser);
    localStorage.setItem('crewsync-user', JSON.stringify(newUser));
    setIsLoading(false);
    
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('crewsync-user');
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};