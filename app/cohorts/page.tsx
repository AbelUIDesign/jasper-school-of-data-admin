'use client';

import React, { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { MOCK_COHORTS, MOCK_INSTRUCTORS, MOCK_COURSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { Cohort, CohortStatus, Student } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  Clock, 
  Video, 
  MessageSquare, 
  AlertCircle, 
  X, 
  Grid, 
  List, 
  UserPlus, 
  Download, 
  Layers,
  Sparkles
} from 'lucide-react';

export default function CohortsPage() {
  const [cohorts, setCohorts] = useState<Cohort[]>(MOCK_COHORTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CohortStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Selected cohort for Roster Drawer
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);

  // Create / Edit Cohort Drawer
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCohort, setEditingCohort] = useState<Cohort | null>(null);

  // Form Fields
  const [formCode, setFormCode] = useState('');
  const [formName, setFormName] = useState('');
  const [formCourseId, setFormCourseId] = useState('course-1');
  const [formInstructorId, setFormInstructorId] = useState('inst-1');
  const [formStartDate, setFormStartDate] = useState('2026-10-05');
  const [formEndDate, setFormEndDate] = useState('2026-12-22');
  const [formDeadline, setFormDeadline] = useState('2026-09-30');
  const [formStatus, setFormStatus] = useState<CohortStatus>('enrolling');
  const [formMaxSeats, setFormMaxSeats] = useState(50);
  const [formScheduleDays, setFormScheduleDays] = useState('Tue & Thu');
  const [formTimeWAT, setFormTimeWAT] = useState('6:00 PM – 8:00 PM WAT');
  const [formTimeBST, setFormTimeBST] = useState('5:00 PM – 7:00 PM BST');
  const [formFormat, setFormFormat] = useState<'Live Online' | 'Hybrid' | 'Weekend Intensive'>('Live Online');
  const [formZoomUrl, setFormZoomUrl] = useState('https://zoom.us/j/95588127701');

  // Open Create Drawer
  const openCreateModal = () => {
    setEditingCohort(null);
    setFormCode('COH-2026-D1');
    setFormName('Cohort 2026-D · Winter Analytics');
    setFormCourseId(MOCK_COURSES[0].id);
    setFormInstructorId(MOCK_INSTRUCTORS[0].id);
    setFormStartDate('2026-11-02');
    setFormEndDate('2027-01-25');
    setFormDeadline('2026-10-25');
    setFormStatus('enrolling');
    setFormMaxSeats(50);
    setFormScheduleDays('Tue & Thu');
    setFormTimeWAT('6:00 PM – 8:00 PM WAT');
    setFormTimeBST('5:00 PM – 7:00 PM BST');
    setFormFormat('Live Online');
    setFormZoomUrl('https://zoom.us/j/95588127701');
    setIsFormOpen(true);
  };

  // Open Edit Drawer
  const openEditModal = (cohort: Cohort) => {
    setEditingCohort(cohort);
    setFormCode(cohort.code);
    setFormName(cohort.name);
    setFormCourseId(cohort.courseId);
    setFormInstructorId(cohort.instructorId);
    setFormStartDate(cohort.startDate);
    setFormEndDate(cohort.endDate);
    setFormDeadline(cohort.enrollmentDeadline);
    setFormStatus(cohort.status);
    setFormMaxSeats(cohort.maxSeats);
    setFormScheduleDays(cohort.scheduleDays);
    setFormTimeWAT(cohort.scheduleTimeWAT);
    setFormTimeBST(cohort.scheduleTimeBST);
    setFormFormat(cohort.format);
    setFormZoomUrl(cohort.zoomRecurringUrl || '');
    setIsFormOpen(true);
  };

  // Save Cohort Handler
  const handleSaveCohort = (e: React.FormEvent) => {
    e.preventDefault();
    const course = MOCK_COURSES.find(c => c.id === formCourseId) || MOCK_COURSES[0];
    const instructor = MOCK_INSTRUCTORS.find(i => i.id === formInstructorId) || MOCK_INSTRUCTORS[0];

    if (editingCohort) {
      setCohorts(cohorts.map(c => {
        if (c.id === editingCohort.id) {
          return {
            ...c,
            code: formCode,
            name: formName,
            courseId: course.id,
            courseTitle: course.title,
            category: course.category,
            instructorId: instructor.id,
            instructorName: instructor.fullName,
            instructorAvatar: instructor.avatar,
            instructorRole: instructor.role,
            startDate: formStartDate,
            endDate: formEndDate,
            enrollmentDeadline: formDeadline,
            status: formStatus,
            maxSeats: Number(formMaxSeats),
            scheduleDays: formScheduleDays,
            scheduleTimeWAT: formTimeWAT,
            scheduleTimeBST: formTimeBST,
            format: formFormat,
            zoomRecurringUrl: formZoomUrl,
          };
        }
        return c;
      }));
    } else {
      const newCohort: Cohort = {
        id: `cohort-${Date.now()}`,
        code: formCode,
        name: formName,
        courseId: course.id,
        courseTitle: course.title,
        category: course.category,
        instructorId: instructor.id,
        instructorName: instructor.fullName,
        instructorAvatar: instructor.avatar,
        instructorRole: instructor.role,
        startDate: formStartDate,
        endDate: formEndDate,
        enrollmentDeadline: formDeadline,
        status: formStatus,
        seatsFilled: 0,
        maxSeats: Number(formMaxSeats),
        waitlistCount: 0,
        scheduleDays: formScheduleDays,
        scheduleTimeWAT: formTimeWAT,
        scheduleTimeBST: formTimeBST,
        format: formFormat,
        zoomRecurringUrl: formZoomUrl,
        totalWeeks: 12
      };
      setCohorts([newCohort, ...cohorts]);
    }

    setIsFormOpen(false);
  };

  // Filter cohorts
  const filteredCohorts = cohorts.filter(cohort => {
    const matchesSearch = 
      cohort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cohort.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cohort.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cohort.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || cohort.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || cohort.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate Metrics
  const activeCohortsCount = cohorts.filter(c => c.status === 'active').length;
  const enrollingCohortsCount = cohorts.filter(c => c.status === 'enrolling').length;
  const totalEnrolledAcrossAll = cohorts.reduce((acc, c) => acc + c.seatsFilled, 0);
  const totalCapacityAcrossAll = cohorts.reduce((acc, c) => acc + c.maxSeats, 0);
  const avgUtilizationRate = totalCapacityAcrossAll > 0 
    ? Math.round((totalEnrolledAcrossAll / totalCapacityAcrossAll) * 100) 
    : 0;
  const totalWaitlisted = cohorts.reduce((acc, c) => acc + (c.waitlistCount || 0), 0);

  // Status helper badge styles
  const getStatusPill = (status: CohortStatus, waitlistCount: number = 0) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Active Batch
          </span>
        );
      case 'enrolling':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FEC00E]"></span>
            Enrolling {waitlistCount > 0 && `(Waitlist: ${waitlistCount})`}
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Upcoming
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
            Completed
          </span>
        );
    }
  };

  // Get enrolled students for the selected cohort roster
  const getCohortStudents = (cohort: Cohort): Student[] => {
    return MOCK_STUDENTS.filter(s => 
      s.enrolledCourses.some(c => 
        c.cohort.toLowerCase().includes(cohort.code.toLowerCase()) ||
        cohort.name.toLowerCase().includes(c.cohort.toLowerCase()) ||
        c.courseId === cohort.courseId
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <TopNav title="Cohorts & Intakes" />

      <main className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Header Title & Top Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A70727] bg-[#FDF2F4] px-2.5 py-0.5 rounded-full">
                Academic Management
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-stone-500 font-medium">Session 2026/2027</span>
            </div>
            <h1 className="text-2xl font-bold font-heading text-stone-900 tracking-tight mt-1">
              Cohorts & Intakes
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Monitor batch capacity, class timetables, lead faculty assignments, and real-time student rosters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="inline-flex p-0.5 bg-stone-100 rounded-ctrl border border-stone-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-[8px] transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-stone-900 shadow-sm' 
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-[8px] transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-white text-stone-900 shadow-sm' 
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => alert('Exporting cohort master CSV...')}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-ctrl hover:bg-stone-50 transition-colors btn-press shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Export Roster</span>
            </button>

            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#A70727] rounded-ctrl hover:bg-[#8B0620] transition-colors shadow-sm btn-press"
            >
              <Plus className="w-4 h-4" />
              <span>New Cohort</span>
            </button>
          </div>
        </div>

        {/* 4 Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border border-stone-200/80 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                Active Batches
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold font-heading text-stone-900 tabular-nums">
                {activeCohortsCount}
              </span>
              <span className="text-xs text-stone-500 font-medium ml-1.5">cohorts running</span>
            </div>
            <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>118 students currently in session</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border border-stone-200/80 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                Total Enrolled
              </span>
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold font-heading text-stone-900 tabular-nums">
                {totalEnrolledAcrossAll}
              </span>
              <span className="text-xs text-stone-500 font-medium ml-1.5">students</span>
            </div>
            <div className="mt-2 text-[11px] text-stone-500">
              Across <span className="font-semibold text-stone-800">{cohorts.length} cohorts</span> (historic + active)
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border border-stone-200/80 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                Seat Utilization
              </span>
              <div className="w-8 h-8 rounded-full bg-[#FDF2F4] text-[#A70727] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-heading text-stone-900 tabular-nums">
                {avgUtilizationRate}%
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold">+4.2% MoM</span>
            </div>
            <div className="mt-2.5 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#A70727] h-full rounded-full transition-all duration-300"
                style={{ width: `${avgUtilizationRate}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border border-stone-200/80 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                Open Intakes & Waitlist
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold font-heading text-stone-900 tabular-nums">
                {enrollingCohortsCount}
              </span>
              <span className="text-xs text-stone-500 font-medium ml-1.5">intake enrolling</span>
            </div>
            <div className="mt-2 text-[11px] text-amber-800 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FEC00E]"></span>
              <span>{totalWaitlisted} learners in waitlist queue</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-3 rounded-card border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Status Segmented Pills */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: `All (${cohorts.length})` },
              { id: 'active', label: `Active (${activeCohortsCount})` },
              { id: 'enrolling', label: `Enrolling (${enrollingCohortsCount})` },
              { id: 'upcoming', label: `Upcoming (${cohorts.filter(c => c.status === 'upcoming').length})` },
              { id: 'completed', label: `Completed (${cohorts.filter(c => c.status === 'completed').length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-ctrl text-xs font-medium whitespace-nowrap transition-all duration-150 btn-press ${
                  statusFilter === tab.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 rounded-ctrl px-3 py-1.5 text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#A70727]"
            >
              <option value="all">All Disciplines</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Machine Learning & AI">Machine Learning & AI</option>
              <option value="Data Engineering">Data Engineering</option>
              <option value="Power BI & SQL">Power BI & SQL</option>
            </select>

            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cohort, instructor, program..."
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-ctrl placeholder:text-stone-400 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#A70727] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area: Grid View vs Table View */}
        {filteredCohorts.length === 0 ? (
          <div className="bg-white rounded-card border border-stone-200/80 p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold font-heading text-stone-800">No cohorts found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              No academic cohorts matched your current search filters. Try adjusting your query or clear filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('all'); setCategoryFilter('all'); }}
              className="mt-4 px-3.5 py-1.5 text-xs font-semibold text-[#A70727] bg-[#FDF2F4] rounded-ctrl hover:bg-[#F9E2E6] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCohorts.map((cohort) => {
              const fillPct = Math.round((cohort.seatsFilled / cohort.maxSeats) * 100);
              const isAlmostFull = fillPct >= 90 && cohort.status === 'enrolling';
              const isSoldOut = cohort.seatsFilled >= cohort.maxSeats;

              return (
                <div
                  key={cohort.id}
                  className="bg-white rounded-card border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Card Header */}
                  <div className="p-5 pb-4 border-b border-stone-100">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                        {cohort.code}
                      </span>
                      {getStatusPill(cohort.status, cohort.waitlistCount)}
                    </div>

                    <h3 className="text-base font-bold font-heading text-stone-900 tracking-tight leading-snug group-hover:text-[#A70727] transition-colors">
                      {cohort.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                      {cohort.courseTitle}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        {cohort.format}
                      </span>
                      {cohort.activeWeek && cohort.totalWeeks && (
                        <span className="text-[11px] text-emerald-700 font-medium">
                          Week {cohort.activeWeek} of {cohort.totalWeeks}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 py-4 space-y-3.5 flex-1 text-xs">
                    {/* Instructor Row */}
                    <div className="flex items-center gap-3 p-2.5 rounded-ctrl bg-stone-50/80 border border-stone-100">
                      <img
                        src={cohort.instructorAvatar}
                        alt={cohort.instructorName}
                        className="w-9 h-9 rounded-full object-cover border border-stone-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-stone-800 truncate">
                          {cohort.instructorName}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate">
                          {cohort.instructorRole}
                        </div>
                      </div>
                    </div>

                    {/* Schedule & Dual Timezones */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-stone-500">
                        <span className="font-medium text-stone-700 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          {cohort.scheduleDays}
                        </span>
                        <span>{formatDate(cohort.startDate)} – {formatDate(cohort.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap text-[11px]">
                        <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono font-medium">
                          {cohort.scheduleTimeWAT}
                        </span>
                        <span className="bg-[#FAF8F5] text-stone-600 px-2 py-0.5 rounded font-mono border border-stone-200 text-[10px]">
                          {cohort.scheduleTimeBST}
                        </span>
                      </div>
                    </div>

                    {/* Seat Capacity Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-600 font-medium flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-stone-400" />
                          Seats Filled
                        </span>
                        <span className="font-bold tabular-nums text-stone-900">
                          {cohort.seatsFilled} / {cohort.maxSeats}{' '}
                          <span className="text-stone-400 font-normal">({fillPct}%)</span>
                        </span>
                      </div>

                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isSoldOut
                              ? 'bg-rose-600'
                              : isAlmostFull
                              ? 'bg-[#FEC00E]'
                              : 'bg-emerald-600'
                          }`}
                          style={{ width: `${Math.min(fillPct, 100)}%` }}
                        ></div>
                      </div>

                      {/* Warnings / Highlights */}
                      <div className="flex items-center justify-between text-[11px]">
                        {isSoldOut ? (
                          <span className="text-rose-700 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Cohort Sold Out
                          </span>
                        ) : isAlmostFull ? (
                          <span className="text-amber-800 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Only {cohort.maxSeats - cohort.seatsFilled} seats left!
                          </span>
                        ) : (
                          <span className="text-stone-500">
                            {cohort.maxSeats - cohort.seatsFilled} seats available
                          </span>
                        )}

                        {cohort.waitlistCount > 0 && (
                          <span className="text-stone-600 font-medium">
                            Waitlist: <strong className="text-[#A70727]">{cohort.waitlistCount}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedCohort(cohort)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-800 bg-white border border-stone-200 rounded-ctrl hover:bg-stone-100 hover:text-stone-900 transition-colors btn-press shadow-2xs"
                    >
                      <Users className="w-3.5 h-3.5 text-stone-500" />
                      <span>Roster ({cohort.seatsFilled})</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {cohort.zoomRecurringUrl && (
                        <a
                          href={cohort.zoomRecurringUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-ctrl transition-colors"
                          title="Launch Zoom Session"
                        >
                          <Video className="w-4 h-4 text-blue-600" />
                        </a>
                      )}

                      <button
                        onClick={() => openEditModal(cohort)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-[#A70727] hover:bg-[#FDF2F4] rounded-ctrl transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Dense Table View */
          <div className="bg-white rounded-card border border-stone-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    <th className="py-3 px-4">COHORT</th>
                    <th className="py-3 px-4">PROGRAM</th>
                    <th className="py-3 px-4">LEAD INSTRUCTOR</th>
                    <th className="py-3 px-4">TIMETABLE (WAT / BST)</th>
                    <th className="py-3 px-4">SEATS & CAPACITY</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                  {filteredCohorts.map((cohort) => {
                    const fillPct = Math.round((cohort.seatsFilled / cohort.maxSeats) * 100);
                    return (
                      <tr key={cohort.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-stone-900">{cohort.name}</div>
                          <div className="font-mono text-[10px] text-stone-400 mt-0.5">{cohort.code}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-stone-800">{cohort.courseTitle}</div>
                          <div className="text-[10px] text-stone-400">{cohort.format}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={cohort.instructorAvatar}
                              alt={cohort.instructorName}
                              className="w-7 h-7 rounded-full object-cover border border-stone-200"
                            />
                            <span className="font-medium text-stone-800">{cohort.instructorName}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-stone-800">{cohort.scheduleDays}</div>
                          <div className="text-[11px] text-stone-500 font-mono">{cohort.scheduleTimeWAT}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-stone-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  fillPct >= 95 ? 'bg-rose-600' : fillPct >= 80 ? 'bg-[#FEC00E]' : 'bg-emerald-600'
                                }`}
                                style={{ width: `${Math.min(fillPct, 100)}%` }}
                              ></div>
                            </div>
                            <span className="font-bold tabular-nums">{cohort.seatsFilled}/{cohort.maxSeats}</span>
                          </div>
                          {cohort.waitlistCount > 0 && (
                            <div className="text-[10px] text-amber-800 font-medium mt-0.5">
                              {cohort.waitlistCount} waitlisted
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusPill(cohort.status, cohort.waitlistCount)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedCohort(cohort)}
                              className="px-2.5 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-ctrl transition-colors"
                            >
                              Roster
                            </button>
                            <button
                              onClick={() => openEditModal(cohort)}
                              className="px-2.5 py-1 text-xs font-semibold text-[#A70727] hover:bg-[#FDF2F4] rounded-ctrl transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* SLIDE-OVER DRAWER: COHORT 360° ROSTER */}
      {selectedCohort && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedCohort(null)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md md:max-w-lg bg-white shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="p-6 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-600 bg-stone-200 px-2 py-0.5 rounded">
                      {selectedCohort.code}
                    </span>
                    {getStatusPill(selectedCohort.status)}
                  </div>
                  <h2 className="text-lg font-bold font-heading text-stone-900 mt-1">
                    {selectedCohort.name}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {selectedCohort.courseTitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCohort(null)}
                  className="p-1.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Stats Bar in Drawer */}
              <div className="px-6 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500">Lead Faculty: </span>
                  <strong className="text-stone-800 font-semibold">{selectedCohort.instructorName}</strong>
                </div>
                <div>
                  <span className="text-stone-500">Enrolled: </span>
                  <strong className="text-[#A70727] font-bold tabular-nums">
                    {selectedCohort.seatsFilled} / {selectedCohort.maxSeats}
                  </strong>
                </div>
              </div>

              {/* Drawer Student Roster List */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Enrolled Students ({getCohortStudents(selectedCohort).length})
                  </h3>
                  <button
                    onClick={() => alert('Add student dialog opened')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#A70727] hover:underline"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Student</span>
                  </button>
                </div>

                {getCohortStudents(selectedCohort).length === 0 ? (
                  <div className="p-8 text-center bg-stone-50 rounded-ctrl border border-stone-200">
                    <p className="text-xs text-stone-500">No students enrolled directly in this cohort yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {getCohortStudents(selectedCohort).map((student) => (
                      <div
                        key={student.id}
                        className="p-3 bg-white rounded-ctrl border border-stone-200/80 shadow-2xs hover:border-stone-300 transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.fullName}
                            className="w-8 h-8 rounded-full object-cover border border-stone-200"
                          />
                          <div>
                            <div className="text-xs font-bold text-stone-900">{student.fullName}</div>
                            <div className="text-[11px] text-stone-500">{student.email}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Paid · Verified
                          </span>
                          <div className="text-[10px] text-stone-400 mt-0.5">
                            {student.enrolledCourses[0]?.progressPercent || 0}% completed
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => alert(`Email broadcast queued for ${selectedCohort.name}`)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-ctrl hover:bg-stone-100 transition-colors shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
                  <span>Broadcast Notice</span>
                </button>
                <button
                  onClick={() => setSelectedCohort(null)}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-ctrl transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT COHORT SLIDE-OVER DRAWER */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsFormOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="p-6 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-heading text-stone-900">
                    {editingCohort ? 'Edit Cohort' : 'Create New Cohort'}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Configure schedule, capacity limits, and faculty assignment.
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCohort} className="p-6 flex-1 overflow-y-auto space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cohort Code</label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="e.g. COH-2026-D1"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cohort Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Cohort 2026-D · Winter Analytics"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Associated Program</label>
                  <select
                    value={formCourseId}
                    onChange={(e) => setFormCourseId(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                  >
                    {MOCK_COURSES.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Lead Instructor</label>
                  <select
                    value={formInstructorId}
                    onChange={(e) => setFormInstructorId(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                  >
                    {MOCK_INSTRUCTORS.map(instructor => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.fullName} ({instructor.specialization})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={formStartDate}
                      onChange={(e) => setFormStartDate(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={formEndDate}
                      onChange={(e) => setFormEndDate(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Max Seat Capacity</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={formMaxSeats}
                      onChange={(e) => setFormMaxSeats(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as CohortStatus)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                    >
                      <option value="enrolling">Enrolling</option>
                      <option value="active">Active</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Schedule Days</label>
                    <input
                      type="text"
                      required
                      value={formScheduleDays}
                      onChange={(e) => setFormScheduleDays(e.target.value)}
                      placeholder="e.g. Tue & Thu"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">WAT Time</label>
                    <input
                      type="text"
                      required
                      value={formTimeWAT}
                      onChange={(e) => setFormTimeWAT(e.target.value)}
                      placeholder="e.g. 6:00 PM – 8:00 PM WAT"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Zoom Meeting Link</label>
                  <input
                    type="url"
                    value={formZoomUrl}
                    onChange={(e) => setFormZoomUrl(e.target.value)}
                    placeholder="https://zoom.us/j/..."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-ctrl focus:outline-none focus:ring-1 focus:ring-[#A70727]"
                  />
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-ctrl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#A70727] hover:bg-[#8B0620] rounded-ctrl transition-colors shadow-sm btn-press"
                  >
                    {editingCohort ? 'Update Cohort' : 'Create Cohort'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
