import React, { useState } from 'react';
import { mockEvents, mockShifts, mockUsers } from '../../data/mockData';
import { Event } from '../../types';
import { Calendar, MapPin, Users, Plus, Clock, Edit3, Eye } from 'lucide-react';
import CreateEventModal from './CreateEventModal';
import EventTasksModal from './EventTasksModal';

const EventsManager: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [events, setEvents] = useState(mockEvents);

  const handleCreateEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: (events.length + 1).toString(),
    };
    setEvents([...events, newEvent]);
  };

  const handleViewTasks = (event: Event) => {
    setSelectedEvent(event);
    setShowTasksModal(true);
  };

  const getEventShifts = (eventId: string) => {
    return mockShifts.filter(shift => shift.eventId === eventId);
  };

  const getStatusBadge = (status: Event['status']) => {
    const styles = {
      planning: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Events Management</h2>
          <p className="mt-2 text-gray-600">Create and manage your events and shifts</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Your Events</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedEvent?.id === event.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{event.name}</h4>
                      <div className="space-y-1 text-xs text-gray-600 mt-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={getStatusBadge(event.status)}>
                        {event.status}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewTasks(event);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Tasks"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="lg:col-span-2">
          {selectedEvent ? (
            <div className="space-y-6">
              {/* Event Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.name}</h3>
                    <span className={getStatusBadge(selectedEvent.status)}>
                      {selectedEvent.status}
                    </span>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit3 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-700">{selectedEvent.description}</p>
              </div>

              {/* Shifts for Selected Event */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Event Shifts</h3>
                    <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm">
                      <Plus className="h-4 w-4" />
                      <span>Add Shift</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {getEventShifts(selectedEvent.id).map((shift) => (
                      <div key={shift.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{shift.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{shift.description}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            shift.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                            shift.status === 'full' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {shift.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(shift.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              {new Date(shift.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{shift.assignedVolunteers.length}/{shift.requiredVolunteers} volunteers</span>
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
                                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Event</h3>
              <p className="text-gray-600">Choose an event from the list to view its details and manage shifts.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateEvent={handleCreateEvent}
      />

      {/* Event Tasks Modal */}
      {selectedEvent && (
        <EventTasksModal
          isOpen={showTasksModal}
          onClose={() => setShowTasksModal(false)}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default EventsManager;