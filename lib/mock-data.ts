import { 
  Course, 
  LiveClass, 
  Assignment, 
  AssignmentSubmission, 
  CapstoneProject, 
  ProjectSubmission, 
  Exam, 
  Transaction, 
  Certificate, 
  Student, 
  AttentionItem,
  Instructor,
  Cohort 
} from './types';

export const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    fullName: 'Dr. Kelechi Okafor',
    role: 'Head of Data Science & Lead Instructor',
    email: 'k.okafor@jasperschool.io',
    phone: '+234 802 334 1122',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    specialization: 'Data Analytics',
    bio: 'Former Staff Data Scientist at Shell & MTN. PhD in Computational Statistics from Imperial College London. Over 10 years of experience teaching enterprise SQL and production data pipelines.',
    assignedCourses: [
      { courseId: 'course-1', courseTitle: 'Full-Stack Data Analytics Immersive', activeCohort: 'Cohort 2026-A' }
    ],
    totalStudentsTaught: 540,
    classesDelivered: 86,
    rating: 4.95,
    status: 'active',
    joinedDate: '2024-01-15'
  },
  {
    id: 'inst-2',
    fullName: 'Engr. Damilola Adebayo',
    role: 'Principal AI Engineer & Curriculum Lead',
    email: 'd.adebayo@jasperschool.io',
    phone: '+234 813 556 7788',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    specialization: 'Machine Learning & AI',
    bio: 'Specialist in Large Language Models, PyTorch architectures, and production MLOps pipelines. Built core recommendation engines for leading African fintech apps.',
    assignedCourses: [
      { courseId: 'course-2', courseTitle: 'Applied Machine Learning & AI Engineering', activeCohort: 'Cohort 2026-B' },
      { courseId: 'course-5', courseTitle: 'Generative AI & LLM Applications Bootcamp', activeCohort: 'Cohort 2026-Upcoming' }
    ],
    totalStudentsTaught: 380,
    classesDelivered: 64,
    rating: 4.88,
    status: 'active',
    joinedDate: '2024-03-10'
  },
  {
    id: 'inst-3',
    fullName: 'Ngozi Ezekwesili',
    role: 'Staff Data Architect & Cloud Lead',
    email: 'n.ezekwesili@jasperschool.io',
    phone: '+234 809 112 4455',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    specialization: 'Data Engineering',
    bio: 'Cloud data warehousing architect with deep specialization in Snowflake, Apache Airflow, dbt, and BigQuery. Built data infrastructure processing over 50M events daily.',
    assignedCourses: [
      { courseId: 'course-3', courseTitle: 'Modern Data Engineering & Cloud Warehousing', activeCohort: 'Cohort 2026-A' }
    ],
    totalStudentsTaught: 295,
    classesDelivered: 42,
    rating: 4.92,
    status: 'active',
    joinedDate: '2024-06-01'
  },
  {
    id: 'inst-4',
    fullName: 'Tunde Adeleke',
    role: 'Senior BI Consultant & DAX Specialist',
    email: 't.adeleke@jasperschool.io',
    phone: '+234 818 776 2233',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    specialization: 'Power BI & SQL',
    bio: 'Microsoft Certified Power BI Data Analyst. Consulted for tier-1 banking institutions on executive reporting, DAX semantic models, and automated business KPI pipelines.',
    assignedCourses: [
      { courseId: 'course-4', courseTitle: 'Power BI & SQL Masterclass for Business Leaders', activeCohort: 'Cohort 2026-C' }
    ],
    totalStudentsTaught: 420,
    classesDelivered: 58,
    rating: 4.90,
    status: 'active',
    joinedDate: '2024-02-20'
  }
];


export const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'PowerBI For Business Intelligence',
    slug: 'powerbi-business-intelligence',
    category: 'Power BI & SQL',
    format: 'Self-paced',
    tags: ['Intermediate', 'Power BI'],
    shortDescription: 'Master DAX, Power Query, and executive reporting in Microsoft Power BI.',
    description: 'Transform raw data into actionable executive insights with advanced statistical querying and high-impact storytelling dashboards.',
    duration: '12 wks',
    priceNGN: 280000,
    priceGBP: 349,
    instructorName: 'Tunde Adeleke',
    instructorRole: 'Senior BI Consultant',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    learningOutcomes: [
      'Write complex DAX measures and calculated tables',
      'Design interactive executive dashboards in Microsoft Power BI',
      'Build automated ETL pipelines in Power Query'
    ],
    requirements: ['Basic familiarity with Excel'],
    startDate: '2026-09-15',
    status: 'published',
    enrolledCount: 211,
    maxSeats: 500,
    rating: 4.9,
    modulesCount: 8,
    assignmentsCount: 6,
    projectsCount: 2
  },
  {
    id: 'course-2',
    title: 'Full Stack: Excel + PowerBI + SQL',
    slug: 'full-stack-excel-powerbi-sql',
    category: 'Data Analytics',
    format: 'Self-paced',
    tags: ['Intermediate', 'Excel · SQL'],
    shortDescription: 'Master spreadsheet modeling, relational SQL querying, and Power BI visualization.',
    description: 'Comprehensive end-to-end data analytics track covering advanced Excel, PostgreSQL data modeling, and Power BI dashboards.',
    duration: '12 wks',
    priceNGN: 240000,
    priceGBP: 299,
    instructorName: 'Dr. Kelechi Okafor',
    instructorRole: 'Head of Data Science',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    learningOutcomes: [
      'Write production SQL queries with CTEs and Window Functions',
      'Model relational databases from scratch',
      'Build executive dashboards'
    ],
    requirements: ['Laptop with 8GB RAM'],
    startDate: '2026-09-18',
    status: 'published',
    enrolledCount: 184,
    maxSeats: 400,
    rating: 4.88,
    modulesCount: 10,
    assignmentsCount: 8,
    projectsCount: 3
  },
  {
    id: 'course-3',
    title: 'Data Science Track: SQL + Python',
    slug: 'data-science-sql-python',
    category: 'Data Science',
    format: 'Self-paced',
    tags: ['Intermediate', 'SQL · Python'],
    shortDescription: 'From SQL querying to Python pandas, exploratory data analysis, and predictive modeling.',
    description: 'Comprehensive curriculum covering PostgreSQL, Pandas, NumPy, Scikit-learn, and statistical hypothesis testing.',
    duration: '12 wks',
    priceNGN: 240000,
    priceGBP: 299,
    instructorName: 'Engr. Damilola Adebayo',
    instructorRole: 'Principal AI Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    learningOutcomes: [
      'Build end-to-end data analysis scripts in Python',
      'Train and validate machine learning models',
      'Perform advanced SQL statistical queries'
    ],
    requirements: ['Foundational math and computer literacy'],
    startDate: '2026-09-22',
    status: 'published',
    enrolledCount: 97,
    maxSeats: 300,
    rating: 4.92,
    modulesCount: 9,
    assignmentsCount: 7,
    projectsCount: 2
  },
  {
    id: 'course-4',
    title: 'Data Analytics Menu',
    slug: 'data-analytics-menu',
    category: 'Data Analytics',
    format: 'Customizable',
    tags: ['Customizable'],
    shortDescription: 'Custom corporate training track tailored to enterprise data team needs.',
    description: 'Bespoke syllabus combining SQL, cloud warehousing, Python, and BI reporting tailored for corporate teams.',
    duration: 'TBC',
    priceNGN: 0,
    priceGBP: 'TBC',
    instructorName: 'Dr. Kelechi Okafor',
    instructorRole: 'Head of Data Science',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    learningOutcomes: ['Customized for enterprise team workflows'],
    requirements: ['Consultation with lead instructor'],
    startDate: '2026-10-01',
    status: 'draft',
    enrolledCount: 0,
    maxSeats: 100,
    rating: 0,
    modulesCount: 5,
    assignmentsCount: 3,
    projectsCount: 1
  }
];

export const MOCK_LIVE_CLASSES: LiveClass[] = [
  {
    id: 'class-1',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    topic: 'Advanced SQL Window Functions & Churn Modeling',
    cohort: 'Cohort 2026-A',
    instructorName: 'Dr. Kelechi Okafor',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    scheduledAt: '2026-09-08T18:00:00.000Z', // within 48 hours
    durationMinutes: 90,
    zoomMeetingUrl: 'https://zoom.us/j/84920485921',
    meetingId: '849 2048 5921',
    passcode: 'JASPER2026',
    status: 'upcoming',
    enrolledStudentsCount: 142,
    resourcesUrls: [
      { name: 'Lecture Slides (PDF)', url: '#', type: 'slides' },
      { name: 'Telecom Churn Dataset (.csv)', url: '#', type: 'dataset' }
    ]
  },
  {
    id: 'class-2',
    courseId: 'course-2',
    courseTitle: 'Applied Machine Learning & AI Engineering',
    topic: 'Feature Scaling & Cross-Validation Strategies in PyTorch',
    cohort: 'Cohort 2026-B',
    instructorName: 'Engr. Damilola Adebayo',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    scheduledAt: '2026-09-09T17:30:00.000Z', // within 48 hours
    durationMinutes: 120,
    zoomMeetingUrl: 'https://zoom.us/j/93019284712',
    meetingId: '930 1928 4712',
    passcode: 'PYTORCH99',
    status: 'upcoming',
    enrolledStudentsCount: 88,
    resourcesUrls: [
      { name: 'Jupyter Notebook Template (.ipynb)', url: '#', type: 'dataset' }
    ]
  },
  {
    id: 'class-3',
    courseId: 'course-3',
    courseTitle: 'Modern Data Engineering & Cloud Warehousing',
    topic: 'Configuring dbt core with Snowflake Warehouses',
    cohort: 'Cohort 2026-A',
    instructorName: 'Ngozi Ezekwesili',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    scheduledAt: '2026-09-12T19:00:00.000Z',
    durationMinutes: 90,
    zoomMeetingUrl: 'https://zoom.us/j/71239840192',
    meetingId: '712 3984 0192',
    passcode: 'DBT2026',
    status: 'upcoming',
    enrolledStudentsCount: 110,
    resourcesUrls: [
      { name: 'dbt Project Schema (.yml)', url: '#', type: 'slides' }
    ]
  },
  {
    id: 'class-4',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    topic: 'Relational Database Normalization & ERDs',
    cohort: 'Cohort 2026-A',
    instructorName: 'Dr. Kelechi Okafor',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    scheduledAt: '2026-09-04T18:00:00.000Z',
    durationMinutes: 90,
    zoomMeetingUrl: 'https://zoom.us/j/84920485921',
    recordingUrl: 'https://drive.google.com/file/d/1xK98jasperschool-rec01/view',
    status: 'completed',
    enrolledStudentsCount: 140,
    resourcesUrls: [
      { name: 'Completed SQL Script (.sql)', url: '#', type: 'dataset' },
      { name: 'Session Whiteboard (.png)', url: '#', type: 'slides' }
    ]
  }
];

export const MOCK_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-1',
    title: 'Ungraded submissions',
    count: 18,
    iconType: 'ungraded',
    actionHref: '/assessments?tab=assignments&filter=pending',
    description: '18 student assignment and project submissions awaiting grading'
  },
  {
    id: 'att-2',
    title: 'Failed / pending payments',
    count: 5,
    iconType: 'failed_payment',
    actionHref: '/payments?status=failed_pending',
    description: '5 Paystack/Flutterwave transactions require manual review or retry'
  },
  {
    id: 'att-3',
    title: 'Certificates awaiting approval',
    count: 9,
    iconType: 'certificate',
    actionHref: '/certificates?status=awaiting_approval',
    description: '9 graduates have achieved 100% completion criteria'
  },
  {
    id: 'att-4',
    title: 'Classes starting in 48h',
    count: 2,
    iconType: 'class_starting',
    actionHref: '/classes?filter=upcoming_48h',
    description: '2 live Zoom sessions need meeting link verification'
  }
];

export const MOCK_ASSIGNMENT_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: 'sub-1',
    assignmentId: 'asg-101',
    assignmentTitle: 'SQL E-Commerce Sales Performance & Cohort Analysis',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    studentId: 'stu-101',
    studentName: 'Chiamaka Nnamdi',
    studentEmail: 'c.nnamdi@gmail.com',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    submittedAt: '2026-09-06T20:15:00.000Z',
    fileUrl: '#',
    fileName: 'chiamaka_ecommerce_cohort_analysis.sql',
    fileSize: '2.4 MB',
    status: 'pending_review'
  },
  {
    id: 'sub-2',
    assignmentId: 'asg-101',
    assignmentTitle: 'SQL E-Commerce Sales Performance & Cohort Analysis',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    studentId: 'stu-102',
    studentName: 'Babatunde Fashola',
    studentEmail: 'b.fashola@yahoo.com',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    submittedAt: '2026-09-06T18:40:00.000Z',
    fileUrl: '#',
    fileName: 'babatunde_sql_queries_final.sql',
    fileSize: '1.8 MB',
    status: 'pending_review'
  },
  {
    id: 'sub-3',
    assignmentId: 'asg-102',
    assignmentTitle: 'EDA & Feature Engineering Pipeline in Pandas',
    courseTitle: 'Applied Machine Learning & AI Engineering',
    studentId: 'stu-103',
    studentName: 'Zainab Al-Hassan',
    studentEmail: 'zainab.alhassan@outlook.com',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    submittedAt: '2026-09-06T14:20:00.000Z',
    fileUrl: '#',
    fileName: 'zainab_pandas_eda_pipeline.ipynb',
    fileSize: '4.6 MB',
    status: 'pending_review'
  },
  {
    id: 'sub-4',
    assignmentId: 'asg-103',
    assignmentTitle: 'Executive Sales & Margin Power BI Dashboard',
    courseTitle: 'Power BI & SQL Masterclass for Business Leaders',
    studentId: 'stu-104',
    studentName: 'Emeka Obi',
    studentEmail: 'emeka.obi@financialcorp.ng',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    submittedAt: '2026-09-05T19:00:00.000Z',
    fileUrl: '#',
    fileName: 'emeka_executive_report.pbix',
    fileSize: '18.2 MB',
    status: 'graded',
    score: 96,
    feedback: 'Outstanding DAX model structure and clean executive visual hierarchy.',
    gradedAt: '2026-09-06T09:30:00.000Z',
    gradedBy: 'Tunde Adeleke'
  },
  {
    id: 'sub-5',
    assignmentId: 'asg-101',
    assignmentTitle: 'SQL E-Commerce Sales Performance & Cohort Analysis',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    studentId: 'stu-105',
    studentName: 'Farida Musa',
    studentEmail: 'farida.musa@gmail.com',
    studentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    submittedAt: '2026-09-05T11:15:00.000Z',
    fileUrl: '#',
    fileName: 'farida_cohort_query_v2.sql',
    fileSize: '1.2 MB',
    status: 'graded',
    score: 88,
    feedback: 'Good use of Window functions; remember to add comments explaining the retention partition logic.',
    gradedAt: '2026-09-05T16:00:00.000Z',
    gradedBy: 'Dr. Kelechi Okafor'
  }
];

export const MOCK_PROJECT_SUBMISSIONS: ProjectSubmission[] = [
  {
    id: 'p-sub-1',
    projectId: 'proj-1',
    projectTitle: 'Bank Customer Churn & Retention Machine Learning Engine',
    courseTitle: 'Applied Machine Learning & AI Engineering',
    studentId: 'stu-103',
    studentName: 'Zainab Al-Hassan',
    studentEmail: 'zainab.alhassan@outlook.com',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    submittedAt: '2026-09-05T22:10:00.000Z',
    githubUrl: 'https://github.com/zainab-data/bank-churn-ml',
    dashboardUrl: 'https://streamlit-churn-predictor.app',
    videoDemoUrl: 'https://loom.com/share/982347918237',
    status: 'pending'
  },
  {
    id: 'p-sub-2',
    projectId: 'proj-2',
    projectTitle: 'Multi-Store Retail Revenue & Supply Chain Analytics System',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    studentId: 'stu-101',
    studentName: 'Chiamaka Nnamdi',
    studentEmail: 'c.nnamdi@gmail.com',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    submittedAt: '2026-09-06T08:30:00.000Z',
    githubUrl: 'https://github.com/chiamaka-data/retail-supply-chain-bi',
    dashboardUrl: 'https://app.powerbi.com/view?r=jasper-demo-1',
    videoDemoUrl: 'https://youtube.com/watch?v=sample-demo',
    status: 'pending'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-1',
    reference: 'JSD-PAY-849204',
    studentId: 'stu-106',
    studentName: 'Oluwaseun Adeyemi',
    studentEmail: 'o.adeyemi@gmail.com',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    amount: 350000,
    currency: 'NGN',
    gateway: 'Paystack',
    status: 'paid',
    createdAt: '2026-09-07T03:15:00.000Z',
    channel: 'Card'
  },
  {
    id: 'txn-2',
    reference: 'JSD-FLW-920194',
    studentId: 'stu-107',
    studentName: 'Marcus Sterling',
    studentEmail: 'marcus.sterling@techuk.co.uk',
    courseId: 'course-2',
    courseTitle: 'Applied Machine Learning & AI Engineering',
    amount: 620,
    currency: 'GBP',
    gateway: 'Flutterwave',
    status: 'paid',
    createdAt: '2026-09-06T21:44:00.000Z',
    channel: 'Card'
  },
  {
    id: 'txn-3',
    reference: 'JSD-PAY-771829',
    studentId: 'stu-108',
    studentName: 'Amina Bello',
    studentEmail: 'amina.bello@heritagebank.ng',
    courseId: 'course-4',
    courseTitle: 'Power BI & SQL Masterclass for Business Leaders',
    amount: 220000,
    currency: 'NGN',
    gateway: 'Paystack',
    status: 'pending',
    createdAt: '2026-09-06T19:20:00.000Z',
    channel: 'Bank Transfer'
  },
  {
    id: 'txn-4',
    reference: 'JSD-PAY-301924',
    studentId: 'stu-109',
    studentName: 'David Kalu',
    studentEmail: 'david.kalu@workmail.com',
    courseId: 'course-3',
    courseTitle: 'Modern Data Engineering & Cloud Warehousing',
    amount: 420000,
    currency: 'NGN',
    gateway: 'Paystack',
    status: 'failed',
    createdAt: '2026-09-06T16:05:00.000Z',
    channel: 'Card'
  },
  {
    id: 'txn-5',
    reference: 'JSD-FLW-109284',
    studentId: 'stu-110',
    studentName: 'Sophia Jenkins',
    studentEmail: 's.jenkins@londonanalytics.io',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    amount: 450,
    currency: 'GBP',
    gateway: 'Flutterwave',
    status: 'paid',
    createdAt: '2026-09-06T13:30:00.000Z',
    channel: 'Card'
  },
  {
    id: 'txn-6',
    reference: 'JSD-PAY-551029',
    studentId: 'stu-111',
    studentName: 'Ibrahim Danjuma',
    studentEmail: 'i.danjuma@kadavcorp.ng',
    courseId: 'course-2',
    courseTitle: 'Applied Machine Learning & AI Engineering',
    amount: 480000,
    currency: 'NGN',
    gateway: 'Paystack',
    status: 'paid',
    createdAt: '2026-09-05T18:12:00.000Z',
    channel: 'Bank Transfer'
  },
  {
    id: 'txn-7',
    reference: 'JSD-PAY-449102',
    studentId: 'stu-112',
    studentName: 'Grace Eze',
    studentEmail: 'grace.eze@yahoo.com',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    amount: 350000,
    currency: 'NGN',
    gateway: 'Paystack',
    status: 'failed',
    createdAt: '2026-09-05T10:45:00.000Z',
    channel: 'Card'
  }
];

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    certificateNumber: 'JSD-2026-9041',
    studentId: 'stu-201',
    studentName: 'Fola Somorin',
    studentEmail: 'fola.somorin@gmail.com',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    issueDate: '2026-09-07',
    status: 'awaiting_approval',
    instructorName: 'Dr. Kelechi Okafor',
    gradeAchieved: 'Distinction (96%)',
    completionDate: '2026-09-05'
  },
  {
    id: 'cert-2',
    certificateNumber: 'JSD-2026-9042',
    studentId: 'stu-202',
    studentName: 'Chidiogo Nwankwo',
    studentEmail: 'c.nwankwo@techcorp.ng',
    courseId: 'course-4',
    courseTitle: 'Power BI & SQL Masterclass for Business Leaders',
    issueDate: '2026-09-07',
    status: 'awaiting_approval',
    instructorName: 'Tunde Adeleke',
    gradeAchieved: 'Excellence (92%)',
    completionDate: '2026-09-04'
  },
  {
    id: 'cert-3',
    certificateNumber: 'JSD-2026-9043',
    studentId: 'stu-203',
    studentName: 'Tariq Al-Mansoor',
    studentEmail: 'tariq.mansoor@gulfenergy.ae',
    courseId: 'course-3',
    courseTitle: 'Modern Data Engineering & Cloud Warehousing',
    issueDate: '2026-09-07',
    status: 'awaiting_approval',
    instructorName: 'Ngozi Ezekwesili',
    gradeAchieved: 'Distinction (98%)',
    completionDate: '2026-09-06'
  },
  {
    id: 'cert-4',
    certificateNumber: 'JSD-2026-8812',
    studentId: 'stu-204',
    studentName: 'Blessing Okonjo',
    studentEmail: 'blessing.okonjo@apexbank.com',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    issueDate: '2026-08-28',
    status: 'issued',
    instructorName: 'Dr. Kelechi Okafor',
    gradeAchieved: 'Distinction (94%)',
    completionDate: '2026-08-25',
    downloadUrl: '#'
  },
  {
    id: 'cert-5',
    certificateNumber: 'JSD-2026-8813',
    studentId: 'stu-205',
    studentName: 'Korede Balogun',
    studentEmail: 'korede.balogun@fintechlab.io',
    courseId: 'course-2',
    courseTitle: 'Applied Machine Learning & AI Engineering',
    issueDate: '2026-08-20',
    status: 'issued',
    instructorName: 'Engr. Damilola Adebayo',
    gradeAchieved: 'Pass with Merit (89%)',
    completionDate: '2026-08-18',
    downloadUrl: '#'
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'stu-101',
    fullName: 'Chiamaka Nnamdi',
    email: 'c.nnamdi@gmail.com',
    phone: '+234 803 123 4567',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    enrolledCourses: [
      {
        courseId: 'course-1',
        courseTitle: 'Full-Stack Data Analytics Immersive',
        cohort: 'Cohort 2026-A',
        progressPercent: 78,
        enrolledAt: '2026-06-15',
        status: 'in_progress'
      }
    ],
    joinedDate: '2026-06-15',
    totalPaid: 350000,
    currency: 'NGN',
    status: 'active'
  },
  {
    id: 'stu-102',
    fullName: 'Babatunde Fashola',
    email: 'b.fashola@yahoo.com',
    phone: '+234 812 987 6543',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    enrolledCourses: [
      {
        courseId: 'course-1',
        courseTitle: 'Full-Stack Data Analytics Immersive',
        cohort: 'Cohort 2026-A',
        progressPercent: 65,
        enrolledAt: '2026-06-18',
        status: 'in_progress'
      }
    ],
    joinedDate: '2026-06-18',
    totalPaid: 350000,
    currency: 'NGN',
    status: 'active'
  },
  {
    id: 'stu-103',
    fullName: 'Zainab Al-Hassan',
    email: 'zainab.alhassan@outlook.com',
    phone: '+234 809 334 5566',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    enrolledCourses: [
      {
        courseId: 'course-2',
        courseTitle: 'Applied Machine Learning & AI Engineering',
        cohort: 'Cohort 2026-B',
        progressPercent: 82,
        enrolledAt: '2026-05-10',
        status: 'in_progress'
      }
    ],
    joinedDate: '2026-05-10',
    totalPaid: 480000,
    currency: 'NGN',
    status: 'active'
  },
  {
    id: 'stu-107',
    fullName: 'Marcus Sterling',
    email: 'marcus.sterling@techuk.co.uk',
    phone: '+44 7911 123456',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    enrolledCourses: [
      {
        courseId: 'course-2',
        courseTitle: 'Applied Machine Learning & AI Engineering',
        cohort: 'Cohort 2026-B',
        progressPercent: 90,
        enrolledAt: '2026-05-12',
        status: 'in_progress'
      }
    ],
    joinedDate: '2026-05-12',
    totalPaid: 620,
    currency: 'GBP',
    status: 'active'
  },
  {
    id: 'stu-204',
    fullName: 'Blessing Okonjo',
    email: 'blessing.okonjo@apexbank.com',
    phone: '+234 802 445 9988',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    enrolledCourses: [
      {
        courseId: 'course-1',
        courseTitle: 'Full-Stack Data Analytics Immersive',
        cohort: 'Cohort 2026-Pre',
        progressPercent: 100,
        enrolledAt: '2026-04-01',
        status: 'completed'
      }
    ],
    joinedDate: '2026-04-01',
    totalPaid: 350000,
    currency: 'NGN',
    status: 'graduated'
  }
];

export const MOCK_REVENUE_CHART_DATA = [
  { date: 'Aug 10', gbp: 14200, ngn: 27500000 },
  { date: 'Aug 15', gbp: 16100, ngn: 31200000 },
  { date: 'Aug 20', gbp: 15400, ngn: 29800000 },
  { date: 'Aug 25', gbp: 18900, ngn: 36800000 },
  { date: 'Aug 30', gbp: 17800, ngn: 34500000 },
  { date: 'Sep 03', gbp: 21500, ngn: 42000000 },
  { date: 'Sep 07', gbp: 24650, ngn: 48200000 },
];

export const MOCK_COHORTS: Cohort[] = [
  {
    id: 'cohort-1',
    code: 'COH-2026-A1',
    name: 'Cohort 2026-A · Data Analytics',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    category: 'Data Analytics',
    instructorId: 'inst-1',
    instructorName: 'Dr. Kelechi Okafor',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    instructorRole: 'Head of Data Science & Lead Faculty',
    startDate: '2026-07-06',
    endDate: '2026-09-28',
    enrollmentDeadline: '2026-07-01',
    status: 'active',
    seatsFilled: 48,
    maxSeats: 50,
    waitlistCount: 0,
    scheduleDays: 'Tue & Thu',
    scheduleTimeWAT: '6:00 PM – 8:00 PM WAT',
    scheduleTimeBST: '5:00 PM – 7:00 PM BST',
    format: 'Live Online',
    zoomMeetingId: '984 2201 4492',
    zoomRecurringUrl: 'https://zoom.us/j/98422014492',
    communicationChannel: {
      platform: 'Slack',
      channelName: '#cohort-2026-a-analytics',
      url: 'https://slack.com'
    },
    completionRate: 91,
    averageAttendance: 94,
    activeWeek: 7,
    totalWeeks: 12
  },
  {
    id: 'cohort-2',
    code: 'COH-2026-B1',
    name: 'Cohort 2026-B · Applied AI',
    courseId: 'course-2',
    courseTitle: 'Applied Machine Learning & AI Engineering',
    category: 'Machine Learning & AI',
    instructorId: 'inst-2',
    instructorName: 'Engr. Damilola Adebayo',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    instructorRole: 'Principal AI Engineer & Curriculum Lead',
    startDate: '2026-08-03',
    endDate: '2026-11-20',
    enrollmentDeadline: '2026-07-28',
    status: 'active',
    seatsFilled: 38,
    maxSeats: 40,
    waitlistCount: 0,
    scheduleDays: 'Mon & Wed',
    scheduleTimeWAT: '7:00 PM – 9:00 PM WAT',
    scheduleTimeBST: '6:00 PM – 8:00 PM BST',
    format: 'Live Online',
    zoomMeetingId: '849 1102 9934',
    zoomRecurringUrl: 'https://zoom.us/j/84911029934',
    communicationChannel: {
      platform: 'Slack',
      channelName: '#cohort-2026-b-ai-eng',
      url: 'https://slack.com'
    },
    completionRate: 88,
    averageAttendance: 91,
    activeWeek: 4,
    totalWeeks: 16
  },
  {
    id: 'cohort-3',
    code: 'COH-2026-DE1',
    name: 'Cohort 2026-A · Cloud Engineering',
    courseId: 'course-3',
    courseTitle: 'Modern Data Engineering & Cloud Warehousing',
    category: 'Data Engineering',
    instructorId: 'inst-3',
    instructorName: 'Ngozi Ezekwesili',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    instructorRole: 'Staff Data Architect & Cloud Lead',
    startDate: '2026-07-18',
    endDate: '2026-10-24',
    enrollmentDeadline: '2026-07-12',
    status: 'active',
    seatsFilled: 32,
    maxSeats: 35,
    waitlistCount: 0,
    scheduleDays: 'Sat & Sun',
    scheduleTimeWAT: '10:00 AM – 1:00 PM WAT',
    scheduleTimeBST: '9:00 AM – 12:00 PM BST',
    format: 'Weekend Intensive',
    zoomMeetingId: '912 4001 8832',
    zoomRecurringUrl: 'https://zoom.us/j/91240018832',
    communicationChannel: {
      platform: 'Slack',
      channelName: '#cohort-2026-de-cloud',
      url: 'https://slack.com'
    },
    completionRate: 93,
    averageAttendance: 89,
    activeWeek: 5,
    totalWeeks: 14
  },
  {
    id: 'cohort-4',
    code: 'COH-2026-C1',
    name: 'Cohort 2026-C · Autumn Analytics',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Data Analytics Immersive',
    category: 'Data Analytics',
    instructorId: 'inst-1',
    instructorName: 'Dr. Kelechi Okafor',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    instructorRole: 'Head of Data Science & Lead Faculty',
    startDate: '2026-10-05',
    endDate: '2026-12-22',
    enrollmentDeadline: '2026-09-30',
    status: 'enrolling',
    seatsFilled: 47,
    maxSeats: 50,
    waitlistCount: 8,
    scheduleDays: 'Tue & Thu',
    scheduleTimeWAT: '6:00 PM – 8:00 PM WAT',
    scheduleTimeBST: '5:00 PM – 7:00 PM BST',
    format: 'Live Online',
    zoomMeetingId: '955 8812 7701',
    zoomRecurringUrl: 'https://zoom.us/j/95588127701',
    communicationChannel: {
      platform: 'WhatsApp',
      channelName: 'Jasper Analytics Cohort C Intake',
      url: 'https://chat.whatsapp.com'
    },
    totalWeeks: 12
  },
  {
    id: 'cohort-5',
    code: 'COH-2026-GENAI',
    name: 'Cohort 2026-Upcoming · GenAI & LLMs',
    courseId: 'course-5',
    courseTitle: 'Generative AI & LLM Applications Bootcamp',
    category: 'Machine Learning & AI',
    instructorId: 'inst-2',
    instructorName: 'Engr. Damilola Adebayo',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    instructorRole: 'Principal AI Engineer & Curriculum Lead',
    startDate: '2026-11-02',
    endDate: '2027-01-25',
    enrollmentDeadline: '2026-10-25',
    status: 'upcoming',
    seatsFilled: 19,
    maxSeats: 35,
    waitlistCount: 0,
    scheduleDays: 'Tue & Fri',
    scheduleTimeWAT: '7:00 PM – 9:00 PM WAT',
    scheduleTimeBST: '6:00 PM – 8:00 PM BST',
    format: 'Live Online',
    zoomMeetingId: '802 9911 3450',
    zoomRecurringUrl: 'https://zoom.us/j/80299113450',
    communicationChannel: {
      platform: 'Slack',
      channelName: '#cohort-2026-genai-bootcamp',
      url: 'https://slack.com'
    },
    totalWeeks: 10
  },
  {
    id: 'cohort-6',
    code: 'COH-2025-BI1',
    name: 'Cohort 2025-Fall · Power BI & SQL',
    courseId: 'course-4',
    courseTitle: 'Power BI & SQL Masterclass for Business Leaders',
    category: 'Power BI & SQL',
    instructorId: 'inst-4',
    instructorName: 'Tunde Adeleke',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    instructorRole: 'Senior BI Consultant & DAX Specialist',
    startDate: '2025-09-01',
    endDate: '2025-11-25',
    enrollmentDeadline: '2025-08-25',
    status: 'completed',
    seatsFilled: 45,
    maxSeats: 45,
    waitlistCount: 0,
    scheduleDays: 'Wed & Fri',
    scheduleTimeWAT: '6:30 PM – 8:30 PM WAT',
    scheduleTimeBST: '5:30 PM – 7:30 PM BST',
    format: 'Live Online',
    completionRate: 96,
    averageAttendance: 92,
    activeWeek: 10,
    totalWeeks: 10
  }
];

