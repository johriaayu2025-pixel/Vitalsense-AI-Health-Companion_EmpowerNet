import { FamilyMember, HealthRecord, Appointment, Reminder } from '@/types/health';

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    relation: 'Mother',
    avatar: '👩',
    heartRate: 72,
    bloodPressure: { systolic: 120, diastolic: 80 },
    spO2: 98,
    temperature: 36.6,
    lastUpdated: new Date('2025-01-15T10:30:00')
  },
  {
    id: '2',
    name: 'Michael Johnson',
    relation: 'Father',
    avatar: '👨',
    heartRate: 68,
    bloodPressure: { systolic: 118, diastolic: 78 },
    spO2: 97,
    temperature: 36.8,
    lastUpdated: new Date('2025-01-15T09:15:00')
  },
  {
    id: '3',
    name: 'Emma Johnson',
    relation: 'Daughter',
    avatar: '👧',
    heartRate: 85,
    bloodPressure: { systolic: 110, diastolic: 70 },
    spO2: 99,
    temperature: 36.5,
    lastUpdated: new Date('2025-01-15T11:00:00')
  },
  {
    id: '4',
    name: 'James Johnson',
    relation: 'Son',
    avatar: '👦',
    heartRate: 80,
    bloodPressure: { systolic: 115, diastolic: 75 },
    spO2: 98,
    temperature: 36.7,
    lastUpdated: new Date('2025-01-15T08:45:00')
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    memberId: '1',
    doctorName: 'Dr. Smith',
    date: new Date('2025-01-20'),
    time: '10:00 AM',
    notes: 'Annual checkup',
    type: 'General Checkup'
  },
  {
    id: '2',
    memberId: '3',
    doctorName: 'Dr. Lee',
    date: new Date('2025-01-22'),
    time: '2:30 PM',
    notes: 'Dental cleaning',
    type: 'Dentist'
  }
];

export const mockReminders: Reminder[] = [
  {
    id: '1',
    memberId: '1',
    title: 'Blood Pressure Medication',
    type: 'medication',
    frequency: 'daily',
    time: '08:00',
    active: true
  },
  {
    id: '2',
    memberId: '2',
    title: 'Vitamin D Supplement',
    type: 'medication',
    frequency: 'daily',
    time: '09:00',
    active: true
  },
  {
    id: '3',
    memberId: '3',
    title: 'Drink Water',
    type: 'water',
    frequency: 'daily',
    time: '14:00',
    active: true
  }
];
