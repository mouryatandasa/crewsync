import React, { useState } from 'react';
import { mockAnnouncements, mockUsers } from '../../data/mockData';
import { Announcement } from '../../types';
import { Send, Megaphone, Users, AlertTriangle, Info, Plus } from 'lucide-react';

const Communication: React.FC = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMessage, setNewMessage] = useState({
    title: '',
    message: '',
    priority: 'info' as Announcement['priority'],
    targetAudience: 'all' as Announcement['targetAudience']
  });

  const volunteers = mockUsers.filter(user => user.role === 'volunteer');

  const getPriorityIcon = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityBadge = (priority: Announcement['priority']) => {
    const styles = {
      urgent: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800'
    };
    
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[priority]}`;
  };

  const handleCreateAnnouncement = () => {
    // In a real app, this would send to the API
    console.log('Creating announcement:', newMessage);
    setShowCreateForm(false);
    setNewMessage({
      title: '',
      message: '',
      priority: 'info',
      targetAudience: 'all'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Communication Hub</h2>
          <p className="mt-2 text-gray-600">Send announcements and communicate with your volunteers</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Announcement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-lg p-3">
                <Megaphone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{mockAnnouncements.length}</p>
                <p className="text-sm text-gray-600">Total Announcements</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 rounded-lg p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{volunteers.length}</p>
                <p className="text-sm text-gray-600">Active Volunteers</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 rounded-lg p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockAnnouncements.filter(a => a.priority === 'urgent').length}
                </p>
                <p className="text-sm text-gray-600">Urgent Messages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {mockAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  onClick={() => setSelectedAnnouncement(announcement)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedAnnouncement?.id === announcement.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(announcement.priority)}
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{announcement.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{announcement.message}</p>
                  <div className="flex items-center justify-between">
                    <span className={getPriorityBadge(announcement.priority)}>
                      {announcement.priority}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(announcement.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Announcement Details or Create Form */}
        <div className="lg:col-span-2">
          {showCreateForm ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Announcement</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newMessage.title}
                    onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter announcement title..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={6}
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your message..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newMessage.priority}
                      onChange={(e) => setNewMessage({ ...newMessage, priority: e.target.value as Announcement['priority'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select
                      value={newMessage.targetAudience}
                      onChange={(e) => setNewMessage({ ...newMessage, targetAudience: e.target.value as Announcement['targetAudience'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">Everyone</option>
                      <option value="volunteers">Volunteers Only</option>
                      <option value="organizers">Organizers Only</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateAnnouncement}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Announcement</span>
                  </button>
                </div>
              </div>
            </div>
          ) : selectedAnnouncement ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {getPriorityIcon(selectedAnnouncement.priority)}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedAnnouncement.title}</h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={getPriorityBadge(selectedAnnouncement.priority)}>
                        {selectedAnnouncement.priority}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(selectedAnnouncement.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{selectedAnnouncement.message}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Target Audience:</span> {selectedAnnouncement.targetAudience}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Sent to:</span> {
                    selectedAnnouncement.targetAudience === 'all' ? 'All users' :
                    selectedAnnouncement.targetAudience === 'volunteers' ? `${volunteers.length} volunteers` :
                    'Organizers only'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Announcement</h3>
              <p className="text-gray-600">Choose an announcement to view details or create a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communication;