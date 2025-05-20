
// Types
export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  course: string;
  year: number;
  totalFees: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string;
  paymentMethod: 'cash' | 'online' | 'upi' | 'bank transfer' | 'check';
  status: 'success' | 'pending' | 'failed';
  receiptNumber: string;
}

export interface FinancialSummary {
  totalRevenue: number;
  collectedFees: number;
  pendingFees: number;
  overdueAmount: number;
  totalStudents: number;
  feesPaidStudents: number;
  monthlyCollection: {
    month: string;
    amount: number;
  }[];
  courseDistribution: {
    course: string;
    students: number;
    totalFees: number;
    collected: number;
  }[];
}

// Mock data
export const students: Student[] = [
  {
    id: '1',
    rollNumber: 'CSE001',
    name: 'Aarav Sharma',
    course: 'B.Tech CSE',
    year: 3,
    totalFees: 95000,
    paidAmount: 95000,
    pendingAmount: 0,
    dueDate: '2023-08-15',
    status: 'paid'
  },
  {
    id: '2',
    rollNumber: 'ECE002',
    name: 'Priya Patel',
    course: 'B.Tech ECE',
    year: 2,
    totalFees: 90000,
    paidAmount: 45000,
    pendingAmount: 45000,
    dueDate: '2023-09-20',
    status: 'partial'
  },
  {
    id: '3',
    rollNumber: 'MEC003',
    name: 'Arjun Singh',
    course: 'B.Tech Mechanical',
    year: 4,
    totalFees: 85000,
    paidAmount: 0,
    pendingAmount: 85000,
    dueDate: '2023-07-30',
    status: 'overdue'
  },
  {
    id: '4',
    rollNumber: 'CSE004',
    name: 'Ananya Reddy',
    course: 'B.Tech CSE',
    year: 1,
    totalFees: 100000,
    paidAmount: 100000,
    pendingAmount: 0,
    dueDate: '2023-08-10',
    status: 'paid'
  },
  {
    id: '5',
    rollNumber: 'CIV005',
    name: 'Vikram Kumar',
    course: 'B.Tech Civil',
    year: 3,
    totalFees: 80000,
    paidAmount: 40000,
    pendingAmount: 40000,
    dueDate: '2023-10-05',
    status: 'partial'
  },
  {
    id: '6',
    rollNumber: 'MCA006',
    name: 'Neha Gupta',
    course: 'MCA',
    year: 2,
    totalFees: 75000,
    paidAmount: 0,
    pendingAmount: 75000,
    dueDate: '2023-07-25',
    status: 'overdue'
  },
  {
    id: '7',
    rollNumber: 'MBA007',
    name: 'Rahul Verma',
    course: 'MBA',
    year: 1,
    totalFees: 120000,
    paidAmount: 120000,
    pendingAmount: 0,
    dueDate: '2023-08-20',
    status: 'paid'
  },
  {
    id: '8',
    rollNumber: 'CSE008',
    name: 'Sneha Kapoor',
    course: 'B.Tech CSE',
    year: 2,
    totalFees: 95000,
    paidAmount: 95000,
    pendingAmount: 0,
    dueDate: '2023-09-10',
    status: 'paid'
  }
];

export const payments: Payment[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Aarav Sharma',
    amount: 95000,
    date: '2023-07-15',
    paymentMethod: 'online',
    status: 'success',
    receiptNumber: 'REC-2023-001'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Priya Patel',
    amount: 45000,
    date: '2023-08-05',
    paymentMethod: 'upi',
    status: 'success',
    receiptNumber: 'REC-2023-002'
  },
  {
    id: '3',
    studentId: '4',
    studentName: 'Ananya Reddy',
    amount: 100000,
    date: '2023-07-30',
    paymentMethod: 'bank transfer',
    status: 'success',
    receiptNumber: 'REC-2023-003'
  },
  {
    id: '4',
    studentId: '5',
    studentName: 'Vikram Kumar',
    amount: 40000,
    date: '2023-08-10',
    paymentMethod: 'cash',
    status: 'success',
    receiptNumber: 'REC-2023-004'
  },
  {
    id: '5',
    studentId: '7',
    studentName: 'Rahul Verma',
    amount: 120000,
    date: '2023-08-02',
    paymentMethod: 'check',
    status: 'success',
    receiptNumber: 'REC-2023-005'
  },
  {
    id: '6',
    studentId: '8',
    studentName: 'Sneha Kapoor',
    amount: 95000,
    date: '2023-08-12',
    paymentMethod: 'online',
    status: 'success',
    receiptNumber: 'REC-2023-006'
  }
];

export const financialSummary: FinancialSummary = {
  totalRevenue: 495000,
  collectedFees: 495000,
  pendingFees: 245000,
  overdueAmount: 160000,
  totalStudents: 8,
  feesPaidStudents: 4,
  monthlyCollection: [
    { month: 'Jan', amount: 0 },
    { month: 'Feb', amount: 0 },
    { month: 'Mar', amount: 0 },
    { month: 'Apr', amount: 0 },
    { month: 'May', amount: 0 },
    { month: 'Jun', amount: 0 },
    { month: 'Jul', amount: 260000 },
    { month: 'Aug', amount: 235000 },
    { month: 'Sep', amount: 0 },
    { month: 'Oct', amount: 0 },
    { month: 'Nov', amount: 0 },
    { month: 'Dec', amount: 0 }
  ],
  courseDistribution: [
    {
      course: 'B.Tech CSE',
      students: 3,
      totalFees: 290000,
      collected: 290000
    },
    {
      course: 'B.Tech ECE',
      students: 1,
      totalFees: 90000,
      collected: 45000
    },
    {
      course: 'B.Tech Mechanical',
      students: 1,
      totalFees: 85000,
      collected: 0
    },
    {
      course: 'B.Tech Civil',
      students: 1,
      totalFees: 80000,
      collected: 40000
    },
    {
      course: 'MCA',
      students: 1,
      totalFees: 75000,
      collected: 0
    },
    {
      course: 'MBA',
      students: 1,
      totalFees: 120000,
      collected: 120000
    }
  ]
};

// Helper functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    case 'partial':
      return 'bg-blue-100 text-blue-800';
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getPaymentMethodIcon(method: string): string {
  switch (method) {
    case 'cash':
      return '💵';
    case 'online':
      return '💻';
    case 'upi':
      return '📱';
    case 'bank transfer':
      return '🏦';
    case 'check':
      return '📝';
    default:
      return '💰';
  }
}
