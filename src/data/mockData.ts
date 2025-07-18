import { User, Event, Shift, Task, Announcement, AttendanceRecord } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@university.edu',
    role: 'organizer',
    phone: '+1-555-0123'
  },
  {
    id: '2',
    name: 'Alex Chen',
    email: 'alex.chen@student.edu',
    role: 'volunteer',
    phone: '+1-555-0124',
    skills: ['Setup/Teardown', 'Registration', 'Audio/Visual'],
    availability: ['morning', 'afternoon']
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'maria.r@student.edu',
    role: 'volunteer',
    phone: '+1-555-0125',
    skills: ['Registration', 'Guest Services', 'Translation'],
    availability: ['afternoon', 'evening']
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.w@student.edu',
    role: 'volunteer',
    phone: '+1-555-0126',
    skills: ['Setup/Teardown', 'Security', 'Audio/Visual'],
    availability: ['morning', 'afternoon', 'evening']
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'emily.d@student.edu',
    role: 'volunteer',
    phone: '+1-555-0127',
    skills: ['Registration', 'Guest Services', 'Social Media'],
    availability: ['afternoon', 'evening']
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Annual Tech Conference 2025',
    date: '2025-03-15',
    location: 'University Convention Center',
    description: 'A comprehensive technology conference featuring industry leaders and innovation showcases.',
    organizerId: '1',
    status: 'planning'
  },
  {
    id: '2',
    name: 'Spring Career Fair',
    date: '2025-02-28',
    location: 'Student Union Building',
    description: 'Connect students with potential employers and internship opportunities.',
    organizerId: '1',
    status: 'active'
  }
];

export const mockShifts: Shift[] = [
  {
    id: '1',
    eventId: '1',
    title: 'Setup & Registration',
    description: 'Set up registration tables and welcome attendees',
    startTime: '2025-03-15T07:00:00',
    endTime: '2025-03-15T10:00:00',
    requiredVolunteers: 4,
    assignedVolunteers: ['2', '3'],
    skills: ['Setup/Teardown', 'Registration'],
    location: 'Main Entrance',
    status: 'open'
  },
  {
    id: '2',
    eventId: '1',
    title: 'Audio/Visual Support',
    description: 'Assist with microphones, projectors, and technical equipment',
    startTime: '2025-03-15T08:00:00',
    endTime: '2025-03-15T17:00:00',
    requiredVolunteers: 2,
    assignedVolunteers: ['4'],
    skills: ['Audio/Visual'],
    location: 'Main Auditorium',
    status: 'open'
  },
  {
    id: '3',
    eventId: '2',
    title: 'Company Booth Assistance',
    description: 'Help companies set up booths and direct student traffic',
    startTime: '2025-02-28T09:00:00',
    endTime: '2025-02-28T15:00:00',
    requiredVolunteers: 6,
    assignedVolunteers: ['3', '4', '5'],
    skills: ['Guest Services'],
    location: 'Exhibition Hall',
    status: 'open'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    shiftId: '1',
    volunteerId: '2',
    title: 'Set up registration tables',
    description: 'Arrange tables, chairs, and registration materials at the main entrance',
    status: 'assigned',
    priority: 'high',
    dueTime: '2025-03-15T07:30:00'
  },
  {
    id: '2',
    shiftId: '1',
    volunteerId: '3',
    title: 'Prepare welcome packets',
    description: 'Organize welcome packets and badges for attendees',
    status: 'assigned',
    priority: 'medium',
    dueTime: '2025-03-15T08:00:00'
  },
  {
    id: '3',
    shiftId: '2',
    volunteerId: '4',
    title: 'Test microphone systems',
    description: 'Check all microphones and audio equipment in the main auditorium',
    status: 'in-progress',
    priority: 'high',
    dueTime: '2025-03-15T08:30:00'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    eventId: '1',
    title: 'Volunteer Orientation Reminder',
    message: 'Don\'t forget about the mandatory volunteer orientation this Friday at 3 PM in Room 205.',
    timestamp: '2025-01-20T10:00:00',
    priority: 'warning',
    targetAudience: 'volunteers'
  },
  {
    id: '2',
    eventId: '2',
    title: 'Additional Setup Help Needed',
    message: 'We need 2 more volunteers for the early morning setup shift. Please sign up if available!',
    timestamp: '2025-01-20T14:30:00',
    priority: 'urgent',
    targetAudience: 'volunteers'
  },
  {
    id: '3',
    eventId: '1',
    title: 'Menu Finalized for Volunteer Meals',
    message: 'The catered lunch menu has been finalized. Dietary restrictions will be accommodated.',
    timestamp: '2025-01-20T09:15:00',
    priority: 'info',
    targetAudience: 'all'
  }
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    volunteerId: '2',
    shiftId: '1',
    status: 'scheduled'
  },
  {
    id: '2',
    volunteerId: '3',
    shiftId: '1',
    status: 'scheduled'
  },
  {
    id: '3',
    volunteerId: '4',
    shiftId: '2',
    checkInTime: '2025-01-20T08:00:00',
    status: 'checked-in'
  }
];