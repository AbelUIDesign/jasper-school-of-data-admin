'use client';

import React, { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { MOCK_LIVE_CLASSES, MOCK_COURSES } from '@/lib/mock-data';
import { LiveClass } from '@/lib/types';
import { formatDateTime, getStatusBadgeClass } from '@/lib/utils';
import { 
  Plus, 
  Video, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Link2, 
  Trash2, 
  X
} from 'lucide-react';

export default function ClassesPage() {
  const [classes, setClasses] = useState<LiveClass[]>(MOCK_LIVE_CLASSES);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [selectedClassForRec, setSelectedClassForRec] = useState<LiveClass | null>(null);

  // Scheduler Form state
  const [formCourseId, setFormCourseId] = useState('course-1');
  const [formTopic, setFormTopic] = useState('');
  const [formCohort, setFormCohort] = useState('Cohort 2026-A');
  const [formScheduledAt, setFormScheduledAt] = useState('2026-09-10T18:00');
  const [formDuration, setFormDuration] = useState(90);
  const [formZoomUrl, setFormZoomUrl] = useState('https://zoom.us/j/84920485921');
  const [formPasscode, setFormPasscode] = useState('JASPER2026');
  
  // Recording Form state
  const [recordingUrlInput, setRecordingUrlInput] = useState('');

  const openScheduleModal = () => {
    setFormTopic('');
    setFormScheduledAt('2026-09-10T18:00');
    setFormDuration(90);
    setFormZoomUrl('https://zoom.us/j/84920485921');
    setFormPasscode('JASPER2026');
    setIsModalOpen(true);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = MOCK_COURSES.find(c => c.id === formCourseId) || MOCK_COURSES[0];
    const newClass: LiveClass = {
      id: `class-${Date.now()}`,
      courseId: course.id,
      courseTitle: course.title,
      topic: formTopic,
      cohort: formCohort,
      instructorName: course.instructorName,
      instructorAvatar: course.instructorAvatar,
      scheduledAt: new Date(formScheduledAt).toISOString(),
      durationMinutes: Number(formDuration),
      zoomMeetingUrl: formZoomUrl,
      meetingId: '849 2048 5921',
      passcode: formPasscode,
      status: 'upcoming',
      enrolledStudentsCount: course.enrolledCount,
      resourcesUrls: [
        { name: 'Lecture Slides (PDF)', url: '#', type: 'slides' }
      ]
    };
    setClasses([newClass, ...classes]);
    setIsModalOpen(false);
  };

  const handleSaveRecording = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassForRec) return;
    setClasses(classes.map(c => c.id === selectedClassForRec.id ? {
      ...c,
      recordingUrl: recordingUrlInput,
      status: 'completed'
    } : c));
    setIsRecordingModalOpen(false);
    setSelectedClassForRec(null);
    setRecordingUrlInput('');
  };

  const handleDeleteClass = (id: string) => {
    if (confirm('Are you sure you want to cancel and remove this scheduled class?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const filteredClasses = classes.filter(c => {
    if (activeTab === 'upcoming') return c.status === 'upcoming' || c.status === 'live';
    if (activeTab === 'completed') return c.status === 'completed';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col">
      <TopNav title="Classes" />

      <div className="p-8 max-w-7xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-stone-900 tracking-tight">
              Live classes & recordings
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Schedule live Zoom sessions, manage cohort timetables, and link recordings.
            </p>
          </div>

          <button
            onClick={openScheduleModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#A70727] hover:bg-[#8E0621] text-white text-xs font-bold rounded-ctrl shadow-xs transition-all btn-press self-start sm:self-auto ring-1 ring-white/10"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Schedule Class</span>
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center bg-white rounded-ctrl p-1 border border-stone-200/80 shadow-xs">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
                activeTab === 'upcoming'
                  ? 'bg-[#A70727] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Upcoming ({classes.filter(c => c.status === 'upcoming' || c.status === 'live').length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
                activeTab === 'completed'
                  ? 'bg-[#A70727] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Recordings ({classes.filter(c => c.status === 'completed').length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
                activeTab === 'all'
                  ? 'bg-[#A70727] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Classes
            </button>
          </div>

          <div className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Zoom API Connected</span>
          </div>
        </div>

        {/* Classes List */}
        <div className="space-y-3.5">
          {filteredClasses.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-card p-5 border border-stone-200/80 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5 group"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-11 h-11 rounded-[8px] bg-stone-50 border border-stone-200/70 flex flex-col items-center justify-center flex-shrink-0 text-stone-700">
                  <Calendar className="w-5 h-5 text-[#A70727]" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusBadgeClass(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-600 px-2 py-0.5 bg-stone-100 rounded-[5px] border border-stone-200/50">
                      {item.cohort}
                    </span>
                    <span className="text-[11px] font-medium text-stone-400">
                      {item.courseTitle}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-stone-900 line-clamp-1 tracking-tight">
                    {item.topic}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-stone-500 mt-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{formatDateTime(item.scheduledAt)} ({item.durationMinutes} mins)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <img
                        src={item.instructorAvatar}
                        alt={item.instructorName}
                        className="w-4 h-4 rounded-full object-cover img-outline"
                      />
                      <span>{item.instructorName}</span>
                    </div>
                    <span className="tabular-nums">· {item.enrolledStudentsCount} learners enrolled</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5 flex-shrink-0 self-end md:self-center">
                {item.status === 'upcoming' && (
                  <>
                    <a
                      href={item.zoomMeetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-[#A70727] text-white rounded-ctrl text-xs font-semibold hover:bg-[#8E0621] transition-all shadow-xs btn-press ring-1 ring-white/10"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Launch Zoom</span>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedClassForRec(item);
                        setRecordingUrlInput(item.recordingUrl || '');
                        setIsRecordingModalOpen(true);
                      }}
                      className="flex items-center gap-1 px-3 py-2 bg-stone-100/80 text-stone-700 hover:bg-stone-200 rounded-ctrl text-xs font-medium transition-colors btn-press border border-stone-200/60"
                    >
                      <Link2 className="w-3.5 h-3.5 text-stone-500" />
                      <span>Attach Recording</span>
                    </button>
                  </>
                )}

                {item.status === 'completed' && (
                  <>
                    {item.recordingUrl ? (
                      <a
                        href={item.recordingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-ctrl text-xs font-semibold hover:bg-emerald-100 transition-colors btn-press"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Watch Recording</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedClassForRec(item);
                          setRecordingUrlInput('');
                          setIsRecordingModalOpen(true);
                        }}
                        className="flex items-center gap-1 px-3 py-2 bg-amber-50 text-amber-800 border border-amber-200 rounded-ctrl text-xs font-semibold hover:bg-amber-100 btn-press"
                      >
                        <span>Upload Recording Link</span>
                      </button>
                    )}
                  </>
                )}

                <button
                  onClick={() => handleDeleteClass(item.id)}
                  className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-ctrl transition-colors btn-press"
                  title="Cancel Session"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-lg shadow-modal border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-stone-900">Schedule Live Class</h3>
                <p className="text-xs text-stone-500">Configure meeting time and automated Zoom link.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-ctrl btn-press">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Target Course</label>
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
                <label className="block text-xs font-semibold text-stone-700 mb-1">Topic / Lesson Agenda</label>
                <input
                  type="text"
                  required
                  value={formTopic}
                  onChange={(e) => setFormTopic(e.target.value)}
                  placeholder="e.g. Advanced Window Functions & CTEs Deep Dive"
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={formScheduledAt}
                    onChange={(e) => setFormScheduledAt(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    required
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Zoom Meeting URL</label>
                <input
                  type="url"
                  required
                  value={formZoomUrl}
                  onChange={(e) => setFormZoomUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

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
                  Schedule & Notify Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attach Recording Modal */}
      {isRecordingModalOpen && selectedClassForRec && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md shadow-modal border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900">Attach Session Recording</h3>
                <p className="text-xs text-stone-500">Google Drive, OneDrive, or Cloud link for students.</p>
              </div>
              <button onClick={() => setIsRecordingModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-ctrl btn-press">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRecording} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Recording Shareable Link</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/..."
                  value={recordingUrlInput}
                  onChange={(e) => setRecordingUrlInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRecordingModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 rounded-ctrl btn-press"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#A70727] hover:bg-[#8E0621] rounded-ctrl btn-press ring-1 ring-white/10"
                >
                  Save & Publish Recording
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
