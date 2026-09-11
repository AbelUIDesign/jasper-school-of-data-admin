export type CourseStatus = 'published' | 'draft' | 'archived';

export type CourseCategory = 
  | 'Data Analytics'
  | 'Data Science'
  | 'Data Engineering'
  | 'Power BI & SQL'
  | 'Machine Learning & AI'
  | 'Business Intelligence';

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  format?: 'Self-paced' | 'Live Cohort' | 'Customizable';
  tags?: string[];
  shortDescription: string;
  description: string;
  duration: string; // e.g. "12 wks"
  priceNGN: number;
  priceGBP: number | 'TBC';
  instructorName: string;
  instructorRole: string;
  instructorAvatar: string;
  thumbnail: string;
  learningOutcomes: string[];
  requirements: string[];
  startDate: string;
  status: CourseStatus;
  enrolledCount: number;
  maxSeats: number;
  rating: number;
  modulesCount: number;
  assignmentsCount: number;
  projectsCount: number;
}

export interface LiveClass {
  id: string;
  courseId: string;
  courseTitle: string;
  topic: string;
  cohort: string;
  instructorName: string;
  instructorAvatar: string;
  scheduledAt: string; // ISO string or datetime
  durationMinutes: number;
  zoomMeetingUrl: string;
  meetingId?: string;
  passcode?: string;
  recordingUrl?: string; // Google Drive, OneDrive, or Zoom Cloud link
  resourcesUrls?: { name: string; url: string; type: 'pdf' | 'dataset' | 'slides' }[];
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  enrolledStudentsCount: number;
}

export type SubmissionStatus = 'submitted' | 'graded' | 'late' | 'pending_review' | 'rejected';

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  submissionsCount: number;
  gradedCount: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  submittedAt: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  status: SubmissionStatus;
  score?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
}

export interface CapstoneProject {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  objective: string;
  deadline: string;
  submissionsCount: number;
  reviewedCount: number;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  projectTitle: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  submittedAt: string;
  githubUrl?: string;
  dashboardUrl?: string;
  videoDemoUrl?: string;
  reportUrl?: string;
  status: 'pending' | 'reviewed' | 'needs_revision';
  score?: number;
  feedback?: string;
}

export interface Exam {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScorePercent: number;
  status: 'active' | 'draft' | 'closed';
  attemptsCount: number;
  passRate: number;
}

export type PaymentGateway = 'Paystack' | 'Flutterwave';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface Transaction {
  id: string;
  reference: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: 'GBP' | 'NGN' | 'USD';
  gateway: PaymentGateway;
  status: PaymentStatus;
  createdAt: string;
  channel: 'Card' | 'Bank Transfer' | 'USSD';
  customerPhone?: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string; // e.g. "JSD-2026-8492"
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  status: 'awaiting_approval' | 'issued' | 'revoked';
  instructorName: string;
  gradeAchieved: string; // e.g. "Distinction (94%)"
  completionDate: string;
  downloadUrl?: string;
}

export interface Student {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  enrolledCourses: {
    courseId: string;
    courseTitle: string;
    cohort: string;
    progressPercent: number;
    enrolledAt: string;
    status: 'in_progress' | 'completed' | 'dropped';
  }[];
  joinedDate: string;
  totalPaid: number;
  currency: 'GBP' | 'NGN';
  status: 'active' | 'graduated' | 'inactive';
}

export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  periodLabel: string;
}

export interface Instructor {
  id: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  specialization: CourseCategory;
  bio: string;
  assignedCourses: {
    courseId: string;
    courseTitle: string;
    activeCohort: string;
  }[];
  totalStudentsTaught: number;
  classesDelivered: number;
  rating: number;
  status: 'active' | 'on_leave' | 'inactive';
  joinedDate: string;
}

export interface AttentionItem {
  id: string;
  title: string;
  count: number;
  iconType: 'ungraded' | 'failed_payment' | 'certificate' | 'class_starting';
  actionHref: string;
  description: string;
}

export type CohortStatus = 'active' | 'enrolling' | 'upcoming' | 'completed';

export interface Cohort {
  id: string;
  code: string; // e.g. "COH-2026-A"
  name: string; // e.g. "Cohort 2026-A · Q1 Spring"
  courseId: string;
  courseTitle: string;
  category: CourseCategory;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  instructorRole: string;
  startDate: string;
  endDate: string;
  enrollmentDeadline: string;
  status: CohortStatus;
  seatsFilled: number;
  maxSeats: number;
  waitlistCount: number;
  scheduleDays: string; // e.g. "Tue & Thu"
  scheduleTimeWAT: string; // e.g. "6:00 PM – 8:00 PM WAT"
  scheduleTimeBST: string; // e.g. "5:00 PM – 7:00 PM BST"
  format: 'Live Online' | 'Hybrid' | 'Weekend Intensive';
  zoomMeetingId?: string;
  zoomRecurringUrl?: string;
  communicationChannel?: {
    platform: 'Slack' | 'Discord' | 'WhatsApp';
    channelName: string;
    url: string;
  };
  completionRate?: number; // e.g. 92%
  averageAttendance?: number; // e.g. 88%
  activeWeek?: number; // e.g. Week 6 of 12
  totalWeeks?: number;
}


