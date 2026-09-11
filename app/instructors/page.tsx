'use client';

import React, { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { MOCK_INSTRUCTORS, MOCK_COURSES } from '@/lib/mock-data';
import { Instructor, CourseCategory } from '@/lib/types';
import { getStatusBadgeClass } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Star, 
  Video, 
  Users, 
  X
} from 'lucide-react';

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>(MOCK_INSTRUCTORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Drawer / Modals
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignTargetInstructor, setAssignTargetInstructor] = useState<Instructor | null>(null);

  // Add Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('Lead Instructor & Data Specialist');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSpecialization, setFormSpecialization] = useState<CourseCategory>('Data Analytics');
  const [formBio, setFormBio] = useState('');
  const [formCourseId, setFormCourseId] = useState('course-1');

  // Assign Form State
  const [newAssignedCourseId, setNewAssignedCourseId] = useState('course-1');
  const [newAssignedCohort, setNewAssignedCohort] = useState('Cohort 2026-B');

  const openAddModal = () => {
    setFormName('');
    setFormRole('Lead Instructor & Data Specialist');
    setFormEmail('');
    setFormPhone('');
    setFormSpecialization('Data Analytics');
    setFormBio('');
    setFormCourseId('course-1');
    setIsAddModalOpen(true);
  };

  const handleCreateInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    const course = MOCK_COURSES.find(c => c.id === formCourseId) || MOCK_COURSES[0];
    const newInst: Instructor = {
      id: `inst-${Date.now()}`,
      fullName: formName,
      role: formRole,
      email: formEmail,
      phone: formPhone,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + instructors.length}?w=300&auto=format&fit=crop&q=80`,
      specialization: formSpecialization,
      bio: formBio || 'Experienced data science professional and technical mentor at Jasper School of Data.',
      assignedCourses: [
        {
          courseId: course.id,
          courseTitle: course.title,
          activeCohort: 'Cohort 2026-A'
        }
      ],
      totalStudentsTaught: 0,
      classesDelivered: 0,
      rating: 5.0,
      status: 'active',
      joinedDate: new Date().toISOString().slice(0, 10)
    };

    setInstructors([newInst, ...instructors]);
    setIsAddModalOpen(false);
  };

  const handleAssignCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTargetInstructor) return;
    const course = MOCK_COURSES.find(c => c.id === newAssignedCourseId) || MOCK_COURSES[0];

    setInstructors(instructors.map(inst => {
      if (inst.id === assignTargetInstructor.id) {
        return {
          ...inst,
          assignedCourses: [
            ...inst.assignedCourses,
            {
              courseId: course.id,
              courseTitle: course.title,
              activeCohort: newAssignedCohort
            }
          ]
        };
      }
      return inst;
    }));

    setIsAssignModalOpen(false);
    setAssignTargetInstructor(null);
  };

  const filteredInstructors = instructors.filter(inst => {
    const matchesSearch = inst.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inst.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inst.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = specializationFilter === 'all' || inst.specialization === specializationFilter;
    const matchesStatus = statusFilter === 'all' || inst.status === statusFilter;
    return matchesSearch && matchesSpec && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col">
      <TopNav title="Instructors" />

      <div className="p-8 max-w-7xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-stone-900 tracking-tight">
              Faculty & instructors
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage lead instructors, student reviews, course assignments, and teaching schedules.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#A70727] hover:bg-[#8E0621] text-white text-xs font-bold rounded-ctrl shadow-xs transition-all btn-press self-start sm:self-auto ring-1 ring-white/10"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Instructor</span>
          </button>
        </div>

        {/* KPI Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="surface-card p-5">
            <span className="text-[11px] font-medium text-stone-500 uppercase">Total Faculty</span>
            <p className="font-heading font-bold text-2xl text-stone-900 mt-2 tabular-nums">{instructors.length}</p>
            <span className="text-[11px] text-stone-400 mt-1 block">Lead & Adjunct Mentors</span>
          </div>

          <div className="surface-card p-5">
            <span className="text-[11px] font-medium text-stone-500 uppercase">Active Teaching</span>
            <p className="font-heading font-bold text-2xl text-emerald-700 mt-2 tabular-nums">
              {instructors.filter(i => i.status === 'active').length}
            </p>
            <span className="text-[11px] text-stone-400 mt-1 block">Assigned to active cohorts</span>
          </div>

          <div className="surface-card p-5">
            <span className="text-[11px] font-medium text-stone-500 uppercase">Avg Faculty Rating</span>
            <div className="flex items-center gap-1.5 mt-2">
              <p className="font-heading font-bold text-2xl text-stone-900 tabular-nums">4.91</p>
              <div className="flex items-center text-[#FEC00E]">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">▲ 98.6% positive reviews</span>
          </div>

          <div className="surface-card p-5">
            <span className="text-[11px] font-medium text-stone-500 uppercase">Live Sessions Delivered</span>
            <p className="font-heading font-bold text-2xl text-[#A70727] mt-2 tabular-nums">250+</p>
            <span className="text-[11px] text-stone-400 mt-1 block">Live Zoom masterclasses</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1 flex-wrap">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by instructor name, role, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200/90 rounded-ctrl focus-ring text-stone-800 shadow-xs"
              />
            </div>

            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-stone-200/90 rounded-ctrl text-xs font-medium text-stone-700 focus-ring shadow-xs"
            >
              <option value="all">All Disciplines</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Machine Learning & AI">Machine Learning & AI</option>
              <option value="Data Engineering">Data Engineering</option>
              <option value="Power BI & SQL">Power BI & SQL</option>
            </select>
          </div>

          <div className="flex items-center bg-white p-1 rounded-ctrl text-xs border border-stone-200/80 shadow-xs">
            {['all', 'active', 'on_leave'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3.5 py-1 rounded-[7px] capitalize font-semibold transition-all btn-press ${
                  statusFilter === s
                    ? 'bg-[#A70727] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredInstructors.map((inst) => (
            <div
              key={inst.id}
              className="surface-card p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Photo, Name, Badge, Rating */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3.5">
                    <div className="relative">
                      <img
                        src={inst.avatar}
                        alt={inst.fullName}
                        className="w-14 h-14 rounded-media object-cover img-outline shadow-xs flex-shrink-0"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-base text-stone-900 tracking-tight">
                          {inst.fullName}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusBadgeClass(inst.status)}`}>
                          {inst.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#A70727] font-semibold mt-0.5">
                        {inst.role}
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded-[5px] border border-stone-200/50">
                        {inst.specialization}
                      </span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 bg-[#FFFBEB] border border-[#FEC00E]/40 px-2.5 py-1 rounded-[7px] flex-shrink-0 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-[#FEC00E] text-[#FEC00E]" />
                    <span className="font-heading font-bold text-xs text-stone-900 tabular-nums">{inst.rating.toFixed(2)}</span>
                  </div>
                </div>

                {/* Bio Summary */}
                <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                  {inst.bio}
                </p>

                {/* Assigned Courses Section */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider block mb-1.5">
                    Assigned Programs & Cohorts
                  </span>
                  <div className="space-y-1.5">
                    {inst.assignedCourses.map((c, i) => (
                      <div key={i} className="p-2 bg-stone-50/80 rounded-ctrl border border-stone-200/60 flex items-center justify-between text-xs">
                        <span className="font-medium text-stone-800 truncate max-w-[240px]">{c.courseTitle}</span>
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-[5px] bg-white text-stone-700 border border-stone-200 flex-shrink-0 shadow-xs">
                          {c.activeCohort}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-100 text-xs text-stone-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-stone-400" />
                    <span><strong className="tabular-nums">{inst.totalStudentsTaught}</strong> Learners Mentored</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-stone-400" />
                    <span><strong className="tabular-nums">{inst.classesDelivered}</strong> Live Classes</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <a href={`mailto:${inst.email}`} className="p-1.5 bg-stone-100 hover:bg-stone-200 rounded-ctrl text-stone-600 transition-colors btn-press border border-stone-200/40" title={inst.email}>
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <a href={`tel:${inst.phone}`} className="p-1.5 bg-stone-100 hover:bg-stone-200 rounded-ctrl text-stone-600 transition-colors btn-press border border-stone-200/40" title={inst.phone}>
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setAssignTargetInstructor(inst);
                      setIsAssignModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-ctrl transition-colors btn-press border border-stone-200/60"
                  >
                    + Assign Course
                  </button>
                  <button
                    onClick={() => setSelectedInstructor(inst)}
                    className="px-3.5 py-1.5 bg-[#A70727] hover:bg-[#8E0621] text-white text-xs font-semibold rounded-ctrl shadow-xs transition-all btn-press ring-1 ring-white/10"
                  >
                    360° Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 360° Profile Modal */}
      {selectedInstructor && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-modal border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <img
                  src={selectedInstructor.avatar}
                  alt={selectedInstructor.fullName}
                  className="w-12 h-12 rounded-media object-cover img-outline shadow-xs"
                />
                <div>
                  <h3 className="font-heading font-bold text-base text-stone-900 tracking-tight">{selectedInstructor.fullName}</h3>
                  <p className="text-xs text-[#A70727] font-semibold">{selectedInstructor.role}</p>
                </div>
              </div>
              <button onClick={() => setSelectedInstructor(null)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-ctrl btn-press">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-stone-700">
              <div>
                <h4 className="font-heading font-bold text-sm text-stone-900 mb-1.5">Biography & Professional Background</h4>
                <p className="text-stone-600 leading-relaxed bg-stone-50/80 p-3.5 rounded-ctrl border border-stone-200/60">
                  {selectedInstructor.bio}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50/80 rounded-ctrl border border-stone-200/50 text-center">
                  <span className="text-stone-400 block text-[10px] uppercase">Rating</span>
                  <span className="font-heading font-bold text-base text-stone-900 tabular-nums">★ {selectedInstructor.rating.toFixed(2)}</span>
                </div>
                <div className="p-3 bg-stone-50/80 rounded-ctrl border border-stone-200/50 text-center">
                  <span className="text-stone-400 block text-[10px] uppercase">Students Mentored</span>
                  <span className="font-heading font-bold text-base text-stone-900 tabular-nums">{selectedInstructor.totalStudentsTaught}</span>
                </div>
                <div className="p-3 bg-stone-50/80 rounded-ctrl border border-stone-200/50 text-center">
                  <span className="text-stone-400 block text-[10px] uppercase">Classes Delivered</span>
                  <span className="font-heading font-bold text-base text-stone-900 tabular-nums">{selectedInstructor.classesDelivered}</span>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-sm text-stone-900 mb-2">Active Teaching Roster</h4>
                <div className="space-y-2">
                  {selectedInstructor.assignedCourses.map((c, i) => (
                    <div key={i} className="p-3 bg-white border border-stone-200 rounded-ctrl flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-stone-900">{c.courseTitle}</p>
                        <p className="text-[10px] text-stone-500">Assigned Cohort: {c.activeCohort}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-[5px]">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-stone-600">
                <span>Email: <strong>{selectedInstructor.email}</strong></span>
                <span>Phone: <strong>{selectedInstructor.phone}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Instructor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-lg shadow-modal border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900">Add New Faculty Instructor</h3>
                <p className="text-xs text-stone-500">Create profile and assign to curriculum cohorts.</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-ctrl btn-press">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInstructor} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name with Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Kelechi Okafor"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Academic / Industry Role</label>
                  <input
                    type="text"
                    required
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Specialization</label>
                  <select
                    value={formSpecialization}
                    onChange={(e) => setFormSpecialization(e.target.value as CourseCategory)}
                    className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                  >
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Machine Learning & AI">Machine Learning & AI</option>
                    <option value="Data Engineering">Data Engineering</option>
                    <option value="Power BI & SQL">Power BI & SQL</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="instructor@jasperschool.io"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Assign Initial Program</label>
                <select
                  value={formCourseId}
                  onChange={(e) => setFormCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                >
                  {MOCK_COURSES.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Biography & Credentials</label>
                <textarea
                  rows={3}
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  placeholder="Industry background, research experience, or certifications..."
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 rounded-ctrl btn-press"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#A70727] hover:bg-[#8E0621] rounded-ctrl shadow-xs btn-press ring-1 ring-white/10"
                >
                  Create Faculty Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Course Modal */}
      {isAssignModalOpen && assignTargetInstructor && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md shadow-modal border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900">Assign Program & Cohort</h3>
                <p className="text-xs text-stone-500">Instructor: {assignTargetInstructor.fullName}</p>
              </div>
              <button onClick={() => setIsAssignModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-ctrl btn-press">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Select Program</label>
                <select
                  value={newAssignedCourseId}
                  onChange={(e) => setNewAssignedCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                >
                  {MOCK_COURSES.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Target Cohort</label>
                <input
                  type="text"
                  required
                  value={newAssignedCohort}
                  onChange={(e) => setNewAssignedCohort(e.target.value)}
                  placeholder="e.g. Cohort 2026-B"
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 rounded-ctrl btn-press"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#A70727] hover:bg-[#8E0621] rounded-ctrl shadow-xs btn-press ring-1 ring-white/10"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
