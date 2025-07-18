export interface User {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'volunteer';
  phone?: string;
  skills?: string[];
  availability?: string[];
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  organizerId: string;
  status: 'planning' | 'active' | 'completed';
}

export interface Shift {
  id: string;
  eventId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  requiredVolunteers: number;
  assignedVolunteers: string[];
  skills?: string[];
  location: string;
  status: 'open' | 'full' | 'completed';
}

export interface Task {
  id: string;
  shiftId: string;
  volunteerId: string;
  title: string;
  description: string;
  status: 'assigned' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueTime?: string;
}

export interface Announcement {
  id: string;
  eventId: string;
  title: string;
  message: string;
  timestamp: string;
  priority: 'info' | 'warning' | 'urgent';
  targetAudience: 'all' | 'volunteers' | 'organizers';
}

export interface AttendanceRecord {
  id: string;
  volunteerId: string;
  shiftId: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'scheduled' | 'checked-in' | 'completed' | 'no-show';
}