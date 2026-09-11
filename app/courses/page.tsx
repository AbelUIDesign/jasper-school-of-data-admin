'use client';

import React, { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { MOCK_COURSES } from '@/lib/mock-data';
import { Course, CourseStatus, CourseCategory } from '@/lib/types';
import { 
  Plus, 
  Search, 
  Clock, 
  Edit3, 
  Trash2, 
  X,
  FileText
} from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  // Drawer / Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<CourseCategory>('Power BI & SQL');
  const [formFormat, setFormFormat] = useState<'Self-paced' | 'Live Cohort' | 'Customizable'>('Self-paced');
  const [formTags, setFormTags] = useState('Intermediate, Power BI');
  const [formDuration, setFormDuration] = useState('12 wks');
  const [formPriceGBP, setFormPriceGBP] = useState<number | 'TBC'>(349);
  const [formStatus, setFormStatus] = useState<CourseStatus>('published');

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormTitle('');
    setFormCategory('Power BI & SQL');
    setFormFormat('Self-paced');
    setFormTags('Intermediate, Power BI');
    setFormDuration('12 wks');
    setFormPriceGBP(349);
    setFormStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setFormTitle(course.title);
    setFormCategory(course.category);
    setFormFormat(course.format || 'Self-paced');
    setFormTags(course.tags ? course.tags.join(', ') : 'Intermediate');
    setFormDuration(course.duration);
    setFormPriceGBP(course.priceGBP);
    setFormStatus(course.status);
    setIsModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = formTags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? {
        ...c,
        title: formTitle,
        category: formCategory,
        format: formFormat,
        tags: tagArray,
        duration: formDuration,
        priceGBP: formPriceGBP === 'TBC' ? 'TBC' : Number(formPriceGBP),
        status: formStatus
      } : c));
    } else {
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: formTitle,
        slug: formTitle.toLowerCase().replace(/\s+/g, '-'),
        category: formCategory,
        format: formFormat,
        tags: tagArray,
        shortDescription: formTitle,
        description: formTitle,
        duration: formDuration,
        priceNGN: 250000,
        priceGBP: formPriceGBP === 'TBC' ? 'TBC' : Number(formPriceGBP),
        instructorName: 'Dr. Kelechi Okafor',
        instructorRole: 'Lead Instructor',
        instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        learningOutcomes: ['Core foundational concepts'],
        requirements: ['Laptop with 8GB RAM'],
        startDate: '2026-09-20',
        status: formStatus,
        enrolledCount: 0,
        maxSeats: 250,
        rating: 5.0,
        modulesCount: 6,
        assignmentsCount: 4,
        projectsCount: 1
      };
      setCourses([newCourse, ...courses]);
    }
    setIsModalOpen(false);
  };

  const toggleCourseStatus = (id: string) => {
    setCourses(courses.map(c => {
      if (c.id === id) {
        const nextStatus: CourseStatus = c.status === 'published' ? 'draft' : 'published';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.tags && c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header Bar */}
      <TopNav title="Courses" />

      {/* Main Content Area */}
      <div className="p-8 max-w-7xl w-full mx-auto">
        {/* Course catalogue Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-stone-900 tracking-tight">
              Course catalogue
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Create, edit, price and publish the courses learners see on the site.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#A70727] hover:bg-[#8E0621] text-white text-xs font-bold rounded-ctrl shadow-xs transition-all btn-press self-start sm:self-auto ring-1 ring-white/10"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New course</span>
          </button>
        </div>

        {/* Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          {/* Segmented Pills */}
          <div className="flex items-center bg-white rounded-ctrl p-1 border border-stone-200/80 shadow-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
                statusFilter === 'all'
                  ? 'bg-[#A70727] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All courses
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
                statusFilter === 'published'
                  ? 'bg-[#A70727] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
                statusFilter === 'draft'
                  ? 'bg-[#A70727] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Draft
            </button>
          </div>

          {/* Right Filter By Name */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Filter by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200/80 rounded-ctrl focus-ring text-stone-800 placeholder:text-stone-400 shadow-xs"
            />
          </div>
        </div>

        {/* Course Table Surface */}
        <div className="bg-white rounded-card border border-stone-200/80 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                  <th className="py-3.5 px-5">Course</th>
                  <th className="py-3.5 px-4">Format</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Enrolled</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                {filteredCourses.map((course) => {
                  const isPublished = course.status === 'published';

                  return (
                    <tr key={course.id} className="hover:bg-stone-50/50 transition-colors group">
                      {/* COURSE Title & Badges */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          {/* Placeholder Icon / Thumbnail */}
                          <div className="w-10 h-10 rounded-[8px] bg-stone-50 border border-stone-200/70 flex items-center justify-center text-stone-400 flex-shrink-0">
                            {course.format === 'Customizable' ? (
                              <Plus className="w-4 h-4 text-stone-400" />
                            ) : (
                              <Clock className="w-4 h-4 text-stone-400" />
                            )}
                          </div>

                          <div>
                            <p className="font-heading font-bold text-stone-900 text-sm tracking-tight leading-tight">
                              {course.title}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                              {course.tags && course.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-medium px-2 py-0.5 rounded-[5px] bg-stone-100 text-stone-600 border border-stone-200/50"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* FORMAT */}
                      <td className="py-4 px-4 text-stone-600 font-medium">
                        {course.format || 'Self-paced'}
                      </td>

                      {/* DURATION */}
                      <td className="py-4 px-4 text-stone-600 font-medium">
                        {course.duration}
                      </td>

                      {/* PRICE */}
                      <td className="py-4 px-4">
                        {course.priceGBP === 'TBC' ? (
                          <span className="italic text-stone-400 font-medium">TBC</span>
                        ) : (
                          <span className="font-bold text-stone-900 font-mono text-sm tabular-nums">
                            £{course.priceGBP}
                          </span>
                        )}
                      </td>

                      {/* ENROLLED */}
                      <td className="py-4 px-4 text-stone-700 font-medium tabular-nums">
                        {course.enrolledCount}
                      </td>

                      {/* STATUS (Switch Toggle) */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => toggleCourseStatus(course.id)}
                            className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out btn-press ${
                              isPublished ? 'bg-emerald-700' : 'bg-stone-300'
                            }`}
                          >
                            <div
                              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                isPublished ? 'translate-x-4' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <span className={`text-xs font-semibold ${isPublished ? 'text-emerald-800' : 'text-stone-400'}`}>
                            {isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(course)}
                            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-ctrl border border-stone-200 transition-colors btn-press"
                            title="Edit course"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-ctrl border border-stone-200 transition-colors btn-press"
                            title="Delete course"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
      </div>

      {/* Modal / Drawer for Course Create & Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-modal border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-heading font-bold text-lg text-stone-900">
                  {editingCourse ? 'Edit Course' : 'Create New Course'}
                </h3>
                <p className="text-xs text-stone-500">Configure catalog details, pricing, format, and tags.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-ctrl hover:bg-stone-100 btn-press"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. PowerBI For Business Intelligence"
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CourseCategory)}
                    className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                  >
                    <option value="Power BI & SQL">Power BI & SQL</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Machine Learning & AI">Machine Learning & AI</option>
                    <option value="Data Engineering">Data Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Format</label>
                  <select
                    value={formFormat}
                    onChange={(e) => setFormFormat(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                  >
                    <option value="Self-paced">Self-paced</option>
                    <option value="Live Cohort">Live Cohort</option>
                    <option value="Customizable">Customizable</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="e.g. 12 wks"
                    className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price (GBP £)</label>
                  <input
                    type="text"
                    required
                    value={formPriceGBP}
                    onChange={(e) => setFormPriceGBP(e.target.value === 'TBC' ? 'TBC' : Number(e.target.value) || 0)}
                    placeholder="349 or TBC"
                    className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="Intermediate, Power BI, SQL"
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={formStatus === 'published'}
                      onChange={() => setFormStatus('published')}
                      className="text-[#A70727] focus:ring-[#A70727]"
                    />
                    <span>Published</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={formStatus === 'draft'}
                      onChange={() => setFormStatus('draft')}
                      className="text-[#A70727] focus:ring-[#A70727]"
                    />
                    <span>Draft</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-ctrl btn-press"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#A70727] hover:bg-[#8E0621] rounded-ctrl shadow-xs btn-press ring-1 ring-white/10"
                >
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
