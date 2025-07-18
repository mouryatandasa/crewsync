import React, { useState } from 'react';
import { mockUsers, mockShifts } from '../../data/mockData';
import { User } from '../../types';
import { Users, Search, Filter, Mail, Phone, Calendar, CheckCircle, XCircle } from 'lucide-react';

const VolunteersManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<User | null>(null);
  const [filterSkill, setFilterSkill] = useState('');

  const volunteers = mockUsers.filter(user => user.role === 'volunteer');
  
  const allSkills = Array.from(new Set(
    volunteers.flatMap(v => v.skills || [])
  ));

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !filterSkill || (volunteer.skills && volunteer.skills.includes(filterSkill));
    return matchesSearch && matchesSkill;
  });

  const getVolunteerShifts = (volunteerId: string) => {
    return mockShifts.filter(shift => shift.assignedVolunteers.includes(volunteerId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Volunteer Management</h2>
        <p className="mt-2 text-gray-600">Manage your volunteer team and track their assignments</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search volunteers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volunteers List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Volunteers ({filteredVolunteers.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredVolunteers.map((volunteer) => {
                const shiftsCount = getVolunteerShifts(volunteer.id).length;
                
                return (
                  <div
                    key={volunteer.id}
                    onClick={() => setSelectedVolunteer(volunteer)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedVolunteer?.id === volunteer.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{volunteer.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{shiftsCount} shifts</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{volunteer.email}</p>
                    {volunteer.skills && (
                      <div className="flex flex-wrap gap-1">
                        {volunteer.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {volunteer.skills.length > 2 && (
                          <span className="text-xs text-gray-500">+{volunteer.skills.length - 2} more</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Volunteer Details */}
        <div className="lg:col-span-2">
          {selectedVolunteer ? (
            <div className="space-y-6">
              {/* Volunteer Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-medium">
                        {selectedVolunteer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedVolunteer.name}</h3>
                      <p className="text-gray-600">Volunteer</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{selectedVolunteer.email}</span>
                      </div>
                      {selectedVolunteer.phone && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{selectedVolunteer.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Skills & Availability</h4>
                    {selectedVolunteer.skills && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedVolunteer.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedVolunteer.availability && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Availability:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedVolunteer.availability.map((time) => (
                            <span key={time} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Assigned Shifts */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Assigned Shifts</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {getVolunteerShifts(selectedVolunteer.id).map((shift) => (
                      <div key={shift.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{shift.title}</h4>
                          <div className="flex items-center space-x-2">
                            {shift.status === 'completed' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-400" />
                            )}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              shift.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                              shift.status === 'full' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {shift.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{shift.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>
                            {new Date(shift.startTime).toLocaleDateString()} at{' '}
                            {new Date(shift.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span>{shift.location}</span>
                        </div>
                      </div>
                    ))}
                    {getVolunteerShifts(selectedVolunteer.id).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No shifts assigned yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Volunteer</h3>
              <p className="text-gray-600">Choose a volunteer from the list to view their details and assignments.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteersManager;