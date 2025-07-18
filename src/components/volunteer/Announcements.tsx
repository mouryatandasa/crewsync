import React from 'react';
import { mockAnnouncements } from '../../data/mockData';
import { Announcement } from '../../types';
import { Megaphone, Info, AlertTriangle, Calendar, Users } from 'lucide-react';

interface AnnouncementsProps {
  currentUser: { id: string; name: string; email: string; role: string };
}

const Announcements: React.FC<AnnouncementsProps> = ({ currentUser }) => {
  const relevantAnnouncements = mockAnnouncements.filter(announcement => 
    announcement.targetAudience === 'all' || 
    announcement.targetAudience === 'volunteers'
  );

  const getPriorityIcon = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPriorityBadge = (priority: Announcement['priority']) => {
    const styles = {
      urgent: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    return `px-3 py-1 text-sm font-medium rounded-full border ${styles[priority]}`;
  };

  const getCardStyle = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'border-red-300 bg-red-50';
      case 'warning':
        return 'border-yellow-300 bg-yellow-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const urgentAnnouncements = relevantAnnouncements.filter(a => a.priority === 'urgent');
  const otherAnnouncements = relevantAnnouncements.filter(a => a.priority !== 'urgent');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Announcements</h2>
        <p className="mt-2 text-gray-600">Important updates and information from event organizers</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-lg p-3">
              <Megaphone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{relevantAnnouncements.length}</p>
              <p className="text-sm text-gray-600">Total Messages</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 rounded-lg p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{urgentAnnouncements.length}</p>
              <p className="text-sm text-gray-600">Urgent Messages</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 rounded-lg p-3">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {relevantAnnouncements.filter(a => {
                  const messageDate = new Date(a.timestamp);
                  const today = new Date();
                  return messageDate.toDateString() === today.toDateString();
                }).length}
              </p>
              <p className="text-sm text-gray-600">Today's Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Announcements */}
      {urgentAnnouncements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold text-red-900">Urgent Announcements</h3>
          </div>
          {urgentAnnouncements.map((announcement) => (
            <div key={announcement.id} className={`rounded-lg border-2 p-6 ${getCardStyle(announcement.priority)} shadow-md`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getPriorityIcon(announcement.priority)}
                  <h4 className="text-xl font-semibold text-gray-900">{announcement.title}</h4>
                </div>
                <span className={getPriorityBadge(announcement.priority)}>
                  {announcement.priority.toUpperCase()}
                </span>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">{announcement.message}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(announcement.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span className="capitalize">{announcement.targetAudience}</span>
                  </div>
                </div>
                <span>{new Date(announcement.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Other Announcements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">All Announcements</h3>
        {otherAnnouncements.map((announcement) => (
          <div key={announcement.id} className={`rounded-lg border p-6 ${getCardStyle(announcement.priority)} hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getPriorityIcon(announcement.priority)}
                <h4 className="text-lg font-semibold text-gray-900">{announcement.title}</h4>
              </div>
              <span className={getPriorityBadge(announcement.priority)}>
                {announcement.priority}
              </span>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">{announcement.message}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(announcement.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span className="capitalize">{announcement.targetAudience}</span>
                </div>
              </div>
              <span>{new Date(announcement.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        ))}
      </div>

      {relevantAnnouncements.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Announcements</h3>
          <p className="text-gray-600">There are no announcements at this time. Check back later for updates from event organizers.</p>
        </div>
      )}
    </div>
  );
};

export default Announcements;