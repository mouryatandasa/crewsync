import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  timezone: string;
  autoRefresh: boolean;
  compactView: boolean;
  toggleTheme: () => void;
  updateSettings: (settings: Partial<SettingsState>) => void;
}

interface SettingsState {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  timezone: string;
  autoRefresh: boolean;
  compactView: boolean;
}

const defaultSettings: SettingsState = {
  theme: 'light',
  notifications: true,
  language: 'en',
  timezone: 'UTC',
  autoRefresh: true,
  compactView: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    const saved = localStorage.getItem('crewsync-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('crewsync-settings', JSON.stringify(settings));
    
    // Apply theme to document
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const value: SettingsContextType = {
    ...settings,
    toggleTheme,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};