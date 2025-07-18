import React from 'react';
import { mockEvents, mockShifts, mockUsers, mockAttendance } from '../../data/mockData';
import { Calendar, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const totalEvents = mockEvents.length;
  const activeEvents = mockEvents.filter(e => e.status === 'active').length;
  const totalVolunteers = mockUsers.filter(u => u.role === 'volunteer').length;
  const totalShifts = mockShifts.length;
  const checkedInVolunteers = mockAttendance.filter(a => a.status === 'checked-in').length;

  const stats = [
    {
      title: 'Active Events',
      value: activeEvents,
      total: totalEvents,
      icon: Calendar,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Volunteers',
      value: totalVolunteers,
      icon: Users,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Open Shifts',
      value: mockShifts.filter(s => s.status === 'open').length,
      total: totalShifts,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Currently Active',
      value: checkedInVolunteers,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    }
  ];

  const upcomingShifts = mockShifts
    .filter(shift => new Date(shift.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5);

  const recentActivity = [
    { id: '1', action: 'Alex Chen signed up for Setup & Registration', time: '2 hours ago', type: 'signup' },
    { id: '2', action: 'Maria Rodriguez checked in for Company Booth Assistance', time: '4 hours ago', type: 'checkin' },
    { id: '3', action: 'New shift created: Audio/Visual Support', time: '6 hours ago', type: 'shift' },
    { id: '4', action: 'Emily Davis completed Guest Services task', time: '1 day ago', type: 'completion' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your events and coordinate volunteers efficiently</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className={`${stat.bgColor} dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <div className="flex items-baseline mt-2">
                    <p className={`text-2xl font-semibold ${stat.textColor} dark:text-white`}>
                      {stat.value}
                    </p>
                    {stat.total && (
                      <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">/ {stat.total}</p>
                    )}
                  </div>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Shifts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Shifts</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Next shifts requiring attention</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingShifts.map((shift) => {
                const assignedCount = shift.assignedVolunteers.length;
                const isUnderstaffed = assignedCount < shift.requiredVolunteers;
                
                return (
                  <div key={shift.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{shift.title}</h4>
                        {isUnderstaffed && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{shift.location}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(shift.startTime).toLocaleDateString()} at{' '}
                        {new Date(shift.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${isUnderstaffed ? 'text-yellow-600' : 'text-green-600'}`}>
                        {assignedCount}/{shift.requiredVolunteers} assigned
                      </div>
                      <div className={`text-xs ${isUnderstaffed ? 'text-yellow-500' : 'text-green-500'}`}>
                        {isUnderstaffed ? 'Needs volunteers' : 'Fully staffed'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Latest volunteer actions and updates</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'signup' ? 'bg-blue-500' :
                    activity.type === 'checkin' ? 'bg-green-500' :
                    activity.type === 'shift' ? 'bg-purple-500' :
                    'bg-emerald-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;