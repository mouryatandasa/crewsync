import React from 'react';
import { Event } from '../../types';
import { X, CheckCircle, Clock, AlertCircle, User, Calendar } from 'lucide-react';

interface EventTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const EventTasksModal: React.FC<EventTasksModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  // Mock tasks data for the event
  const mockTasks = [
    {
      id: '1',
      title: 'Setup Registration Desk',
      description: 'Prepare registration materials and welcome packets',
      assignedTo: 'Sarah Johnson',
      status: 'completed' as const,
      priority: 'high' as const,
      estimatedHours: 2,
    },
    {
      id: '2',
      title: 'Coordinate Catering',
      description: 'Ensure food and beverages are delivered on time',
      assignedTo: 'Mike Chen',
      status: 'in-progress' as const,
      priority: 'high' as const,
      estimatedHours: 4,
    },
    {
      id: '3',
      title: 'Setup Audio/Visual Equipment',
      description: 'Test microphones, projectors, and sound system',
      assignedTo: 'Alex Rodriguez',
      status: 'pending' as const,
      priority: 'medium' as const,
      estimatedHours: 3,
    },
    {
      id: '4',
      title: 'Prepare Welcome Materials',
      description: 'Print name tags, programs, and information packets',
      assignedTo: 'Emma Davis',
      status: 'completed' as const,
      priority: 'medium' as const,
      estimatedHours: 1.5,
    },
    {
      id: '5',
      title: 'Coordinate Parking',
      description: 'Set up parking signs and direct attendees',
      assignedTo: 'David Wilson',
      status: 'pending' as const,
      priority: 'low' as const,
      estimatedHours: 2,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[priority as keyof typeof styles]}`;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`;
  };

  const completedTasks = mockTasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = mockTasks.filter(task => task.status === 'in-progress').length;
  const pendingTasks = mockTasks.filter(task => task.status === 'pending').length;
  const totalHours = mockTasks.reduce((sum, task) => sum + task.estimatedHours, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{event.name} - Tasks</h2>
              <div className="flex items-center space-x-4 text-blue-100">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
              <div className="text-sm text-blue-700">In Progress</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{pendingTasks}</div>
              <div className="text-sm text-yellow-700">Pending</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{totalHours}h</div>
              <div className="text-sm text-purple-700">Total Hours</div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Tasks</h3>
            {mockTasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={getPriorityBadge(task.priority)}>
                      {task.priority}
                    </span>
                    <span className={getStatusBadge(task.status)}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{task.assignedTo}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{task.estimatedHours}h estimated</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTasksModal;