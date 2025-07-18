import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import AuthPage from './components/auth/AuthPage';
import Layout from './components/Layout';
import Dashboard from './components/organizer/Dashboard';
import EventsManager from './components/organizer/EventsManager';
import VolunteersManager from './components/organizer/VolunteersManager';
import Communication from './components/organizer/Communication';
import Settings from './components/Settings';
import MyShifts from './components/volunteer/MyShifts';
import MyTasks from './components/volunteer/MyTasks';
import Announcements from './components/volunteer/Announcements';
import { mockUsers } from './data/mockData';
import { User } from './types';

const AppContent: React.FC = () => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Set default tab based on user role - must be called before any conditional returns
  React.useEffect(() => {
    if (currentUser) {
      setActiveTab(currentUser.role === 'organizer' ? 'dashboard' : 'my-shifts');
    }
  }, [currentUser]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading CrewSync...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated || !currentUser) {
    return <AuthPage />;
  }

  const renderContent = () => {
    if (currentUser.role === 'organizer') {
      switch (activeTab) {
        case 'dashboard':
          return <Dashboard />;
        case 'events':
          return <EventsManager />;
        case 'volunteers':
          return <VolunteersManager />;
        case 'communication':
          return <Communication />;
        case 'settings':
          return <Settings />;
        default:
          return <Dashboard />;
      }
    } else {
      switch (activeTab) {
        case 'my-shifts':
          return <MyShifts currentUser={currentUser} />;
        case 'tasks':
          return <MyTasks currentUser={currentUser} />;
        case 'announcements':
          return <Announcements currentUser={currentUser} />;
        case 'settings':
          return <Settings />;
        default:
          return <MyShifts currentUser={currentUser} />;
      }
    }
  };

  return (
    <Layout 
      currentUser={currentUser} 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;