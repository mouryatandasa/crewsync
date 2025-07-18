import React from 'react';
import { mockTasks, mockShifts } from '../../data/mockData';
import { CheckCircle, Clock, AlertCircle, Calendar, MapPin } from 'lucide-react';

interface MyTasksProps {
  currentUser: { id: string; name: string; email: string; role: string };
}

const MyTasks: React.FC<MyTasksProps> = ({ currentUser }) => {
  const myTasks = mockTasks.filter(task => task.volunteerId === currentUser.id);

  const getTaskShift = (shiftId: string) => {
    return mockShifts.find(shift => shift.id === shiftId);
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[priority as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      assigned: 'bg-gray-100 text-gray-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`;
  };

  const pendingTasks = myTasks.filter(task => task.status !== 'completed');
  const completedTasks = myTasks.filter(task => task.status === 'completed');
  const highPriorityTasks = myTasks.filter(task => task.priority === 'high' && task.status !== 'completed');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">My Tasks</h2>
        <p className="mt-2 text-gray-600">Track and manage your assigned volunteer tasks</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 rounded-lg p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{pendingTasks.length}</p>
              <p className="text-sm text-gray-600">Pending Tasks</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{completedTasks.length}</p>
              <p className="text-sm text-gray-600">Completed Tasks</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 rounded-lg p-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{highPriorityTasks.length}</p>
              <p className="text-sm text-gray-600">High Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
            <p className="text-sm text-gray-600">Tasks that need your attention</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingTasks.map((task) => {
                const shift = getTaskShift(task.shiftId);
                const isUrgent = task.priority === 'high';
                const isDueSoon = task.dueTime && new Date(task.dueTime) <= new Date(Date.now() + 24 * 60 * 60 * 1000);
                
                return (
                  <div key={task.id} className={`border rounded-lg p-4 ${isUrgent || isDueSoon ? 'border-red-300 bg-red-50' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(task.status)}
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          {isUrgent && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                              Urgent
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={getPriorityBadge(task.priority)}>
                          {task.priority} priority
                        </span>
                        <span className={getStatusBadge(task.status)}>
                          {task.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    {shift && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <p className="text-sm font-medium text-gray-900 mb-1">Related Shift: {shift.title}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(shift.startTime).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {new Date(shift.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{shift.location}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {task.dueTime && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Due: {new Date(task.dueTime).toLocaleString()}
                        </span>
                        {isDueSoon && (
                          <span className="text-red-600 font-medium">Due soon!</span>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-4 flex space-x-2">
                      {task.status === 'assigned' && (
                        <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Start Task
                        </button>
                      )}
                      {task.status === 'in-progress' && (
                        <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Mark Complete
                        </button>
                      )}
                      <button className="text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Completed Tasks</h3>
            <p className="text-sm text-gray-600">Tasks you've successfully completed</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {completedTasks.map((task) => {
                const shift = getTaskShift(task.shiftId);
                
                return (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 opacity-75">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <span className={getStatusBadge(task.status)}>
                        Completed
                      </span>
                    </div>
                    
                    {shift && (
                      <div className="text-xs text-gray-500">
                        Completed for: {shift.title} on {new Date(shift.startTime).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {myTasks.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Tasks Assigned</h3>
          <p className="text-gray-600">You don't have any tasks assigned yet. Tasks will appear here when you're assigned to shifts.</p>
        </div>
      )}
    </div>
  );
};

export default MyTasks;