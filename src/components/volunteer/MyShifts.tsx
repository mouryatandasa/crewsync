import React from 'react';
import { mockShifts, mockUsers, mockAttendance } from '../../data/mockData';
import { Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface MyShiftsProps {
  currentUser: { id: string; name: string; email: string; role: string };
}

const MyShifts: React.FC<MyShiftsProps> = ({ currentUser }) => {
  const myShifts = mockShifts.filter(shift => 
    shift.assignedVolunteers.includes(currentUser.id)
  );

  const getAttendanceStatus = (shiftId: string) => {
    const record = mockAttendance.find(a => a.shiftId === shiftId && a.volunteerId === currentUser.id);
    return record?.status || 'scheduled';
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      scheduled: 'bg-yellow-100 text-yellow-800',
      'checked-in': 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      'no-show': 'bg-red-100 text-red-800'
    };
    
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'checked-in':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'no-show':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const upcomingShifts = myShifts.filter(shift => new Date(shift.startTime) > new Date());
  const pastShifts = myShifts.filter(shift => new Date(shift.startTime) <= new Date());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">My Shifts</h2>
        <p className="mt-2 text-gray-600">View and manage your assigned volunteer shifts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-lg p-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{upcomingShifts.length}</p>
              <p className="text-sm text-gray-600">Upcoming Shifts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {mockAttendance.filter(a => a.volunteerId === currentUser.id && a.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed Shifts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 rounded-lg p-3">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {myShifts.reduce((total, shift) => {
                  const duration = (new Date(shift.endTime).getTime() - new Date(shift.startTime).getTime()) / (1000 * 60 * 60);
                  return total + duration;
                }, 0)}h
              </p>
              <p className="text-sm text-gray-600">Total Hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Shifts */}
      {upcomingShifts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Shifts</h3>
            <p className="text-sm text-gray-600">Your scheduled volunteer assignments</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingShifts.map((shift) => {
                const attendanceStatus = getAttendanceStatus(shift.id);
                const shiftDate = new Date(shift.startTime);
                const isToday = shiftDate.toDateString() === new Date().toDateString();
                
                return (
                  <div key={shift.id} className={`border rounded-lg p-4 ${isToday ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{shift.title}</h4>
                          {isToday && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              Today
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{shift.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(attendanceStatus)}
                        <span className={getStatusBadge(attendanceStatus)}>
                          {attendanceStatus.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{shiftDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {shiftDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(shift.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{shift.location}</span>
                      </div>
                    </div>
                    
                    {shift.skills && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {shift.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {isToday && attendanceStatus === 'scheduled' && (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Check In
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Past Shifts */}
      {pastShifts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Past Shifts</h3>
            <p className="text-sm text-gray-600">Your volunteer history</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pastShifts.map((shift) => {
                const attendanceStatus = getAttendanceStatus(shift.id);
                
                return (
                  <div key={shift.id} className="border border-gray-200 rounded-lg p-4 opacity-75">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{shift.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{shift.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(attendanceStatus)}
                        <span className={getStatusBadge(attendanceStatus)}>
                          {attendanceStatus.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(shift.startTime).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(shift.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(shift.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{shift.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {myShifts.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Shifts Assigned</h3>
          <p className="text-gray-600">You don't have any shifts assigned yet. Check back later or contact your event organizer.</p>
        </div>
      )}
    </div>
  );
};

export default MyShifts;