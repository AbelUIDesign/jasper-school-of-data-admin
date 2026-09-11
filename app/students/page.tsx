'use client';

import React, { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { MOCK_STUDENTS, MOCK_COURSES } from '@/lib/mock-data';
import { Student } from '@/lib/types';
import { formatDate, formatCurrency, getStatusBadgeClass } from '@/lib/utils';
import { 
  Search, 
  Plus, 
  X
} from 'lucide-react';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'graduated'>('all');
  
  // Drawer / Details modal state
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  // Manual Enroll Form
  const [enrollName, setEnrollName] = useState('');
  const [enrollEmail, setEnrollEmail] = useState('');
  const [enrollPhone, setEnrollPhone] = useState('');
  const [enrollCourseId, setEnrollCourseId] = useState('course-1');
  const [enrollCohort, setEnrollCohort] = useState('Cohort 2026-A');

  const handleManualEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    const course = MOCK_COURSES.find(c => c.id === enrollCourseId) || MOCK_COURSES[0];
    const newStudent: Student = {
      id: `stu-${Date.now()}`,
      fullName: enrollName,
      email: enrollEmail,
      phone: enrollPhone,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + students.length}?w=120&auto=format&fit=crop&q=80`,
      enrolledCourses: [
        {
          courseId: course.id,
          courseTitle: course.title,
          cohort: enrollCohort,
          progressPercent: 0,
          enrolledAt: new Date().toISOString().slice(0, 10),
          status: 'in_progress'
        }
      ],
      joinedDate: new Date().toISOString().slice(0, 10),
      totalPaid: course.priceNGN,
      currency: 'NGN',
      status: 'active'
    };

    setStudents([newStudent, ...students]);
    setIsEnrollModalOpen(false);
    setEnrollName('');
    setEnrollEmail('');
    setEnrollPhone('');
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.enrolledCourses.some(c => c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col">
      <TopNav title="Students" />

      <div className="p-8 max-w-7xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-stone-900 tracking-tight">
              Student directory
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Track individual learning progress, cohort distribution, and enrollments.
            </p>
          </div>

          <button
            onClick={() => setIsEnrollModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#A70727] hover:bg-[#8E0621] text-white text-xs font-bold rounded-ctrl shadow-xs transition-all btn-press self-start sm:self-auto ring-1 ring-white/10"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Enroll Student</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center bg-white rounded-ctrl p-1 border border-stone-200/80 shadow-xs">
            {['all', 'active', 'graduated'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s as any)}
                className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold capitalize transition-all btn-press ${
                  statusFilter === s
                    ? 'bg-[#A70727] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search students by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200/80 rounded-ctrl focus-ring text-stone-800 placeholder:text-stone-400 shadow-xs"
            />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-card border border-stone-200/80 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                  <th className="py-3.5 px-5">Learner</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Program & Cohort</th>
                  <th className="py-3.5 px-4">Progress</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                {filteredStudents.map((stu) => {
                  const primaryCourse = stu.enrolledCourses[0];
                  return (
                    <tr key={stu.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={stu.avatar}
                            alt={stu.fullName}
                            className="w-8 h-8 rounded-full object-cover img-outline flex-shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-stone-900">{stu.fullName}</p>
                            <p className="text-[10px] text-stone-400">Joined {formatDate(stu.joinedDate)}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="text-stone-800 font-medium">{stu.email}</p>
                        <p className="text-[10px] text-stone-400">{stu.phone}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-medium text-stone-900">{primaryCourse?.courseTitle || 'None'}</p>
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-[5px] bg-stone-100 text-stone-600 border border-stone-200/50">
                          {primaryCourse?.cohort || '2026-A'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="w-32">
                          <div className="flex justify-between text-[10px] text-stone-500 mb-1">
                            <span>Progress</span>
                            <span className="font-semibold text-stone-800 tabular-nums">{primaryCourse?.progressPercent || 0}%</span>
                          </div>
                          <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-[#A70727] h-full rounded-full transition-all duration-300"
                              style={{ width: `${primaryCourse?.progressPercent || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusBadgeClass(stu.status)}`}>
                          {stu.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => setSelectedStudent(stu)}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-ctrl text-xs font-semibold transition-colors btn-press border border-stone-200/60"
                        >
                          360° Profile
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 360 Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-lg shadow-modal border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.fullName}
                  className="w-10 h-10 rounded-full object-cover img-outline shadow-xs"
                />
                <div>
                  <h3 className="font-heading font-bold text-base text-stone-900">{selectedStudent.fullName}</h3>
                  <p className="text-xs text-stone-500">{selectedStudent.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-ctrl btn-press">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-stone-50/80 p-4 rounded-ctrl border border-stone-200/50">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Phone Number</span>
                  <span className="font-semibold text-stone-800">{selectedStudent.phone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Total Tuition Paid</span>
                  <span className="font-semibold text-stone-800 font-mono tabular-nums">
                    {formatCurrency(selectedStudent.totalPaid, selectedStudent.currency)}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-sm text-stone-900 mb-2">Enrolled Courses</h4>
                <div className="space-y-2">
                  {selectedStudent.enrolledCourses.map((c, i) => (
                    <div key={i} className="p-3 border border-stone-200/80 rounded-ctrl bg-white flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-stone-900">{c.courseTitle}</p>
                        <p className="text-[10px] text-stone-500">{c.cohort} · Enrolled {c.enrolledAt}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#A70727] tabular-nums">{c.progressPercent}% Complete</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => alert(`Reset password email sent to ${selectedStudent.email}`)}
                  className="text-stone-600 hover:text-stone-900 font-semibold btn-press"
                >
                  Send Password Reset
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 bg-[#A70727] text-white font-semibold rounded-ctrl hover:bg-[#8E0621] btn-press ring-1 ring-white/10"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Enrollment Modal */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md shadow-modal border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900">Manual Student Enrollment</h3>
                <p className="text-xs text-stone-500">Register learner and grant immediate course access.</p>
              </div>
              <button onClick={() => setIsEnrollModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-ctrl btn-press">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleManualEnroll} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adeola Johnson"
                  value={enrollName}
                  onChange={(e) => setEnrollName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="adeola.j@gmail.com"
                  value={enrollEmail}
                  onChange={(e) => setEnrollEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 803 000 0000"
                  value={enrollPhone}
                  onChange={(e) => setEnrollPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Assign Course</label>
                <select
                  value={enrollCourseId}
                  onChange={(e) => setEnrollCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                >
                  {MOCK_COURSES.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 rounded-ctrl btn-press"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#A70727] hover:bg-[#8E0621] rounded-ctrl shadow-xs btn-press ring-1 ring-white/10"
                >
                  Enroll Learner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
