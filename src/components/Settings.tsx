import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  Clock, 
  RefreshCw, 
  Layout,
  Save,
  RotateCcw
} from 'lucide-react';

const Settings: React.FC = () => {
  const { 
    theme, 
    notifications, 
    language, 
    timezone, 
    autoRefresh, 
    compactView,
    toggleTheme, 
    updateSettings 
  } = useSettings();

  const handleReset = () => {
    updateSettings({
      theme: 'light',
      notifications: true,
      language: 'en',
      timezone: 'UTC',
      autoRefresh: true,
      compactView: false,
    });
  };

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Customize your CrewSync experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Layout className="h-5 w-5" />
              <span>Appearance</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Customize the look and feel</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Dark Mode
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Compact View */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Layout className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Compact View
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Show more information in less space
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ compactView: !compactView })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  compactView ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    compactView ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your notification preferences</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Push Notifications
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Receive notifications for important updates
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ notifications: !notifications })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  notifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Auto Refresh */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Auto Refresh
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Automatically refresh data every 30 seconds
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ autoRefresh: !autoRefresh })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  autoRefresh ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoRefresh ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Localization Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Localization</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Language and regional settings</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Timezone */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => updateSettings({ timezone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5" />
              <span>System</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">System information and actions</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span className="font-medium">January 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Current Theme:</span>
                <span className="font-medium capitalize">{theme}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleReset}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;