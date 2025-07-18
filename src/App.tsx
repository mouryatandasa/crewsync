import React, { useState } from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
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

function App() {
  // For demo purposes, we'll simulate switching between user roles
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');

  const currentUser = mockUsers[currentUserIndex];

  // Reset active tab when switching users
  const handleUserSwitch = (index: number) => {
    setCurrentUserIndex(index);
    setActiveTab(mockUsers[index].role === 'organizer' ? 'dashboard' : 'my-shifts');
  };

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
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Demo User Switcher */}
        <div className="bg-gray-900 dark:bg-gray-950 text-white p-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-sm font-medium">Demo Mode - Switch Users:</span>
            <div className="flex space-x-2">
              {mockUsers.map((user, index) => (
                <button
                  key={user.id}
                  onClick={() => handleUserSwitch(index)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    currentUserIndex === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {user.name} ({user.role})
                </button>
              ))}
            </div>
          </div>
        </div>

        <Layout 
          currentUser={currentUser} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        >
          {renderContent()}
        </Layout>
      </div>
    </SettingsProvider>
  );
}

export default App;