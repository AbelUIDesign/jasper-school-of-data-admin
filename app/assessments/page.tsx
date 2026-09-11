'use client';

import React, { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { 
  MOCK_ASSIGNMENT_SUBMISSIONS, 
  MOCK_PROJECT_SUBMISSIONS 
} from '@/lib/mock-data';
import { AssignmentSubmission, ProjectSubmission } from '@/lib/types';
import { formatDateTime, getStatusBadgeClass } from '@/lib/utils';
import { 
  FileText, 
  Code, 
  Monitor, 
  Video,
  Send,
  X
} from 'lucide-react';

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<'assignments' | 'projects' | 'exams'>('assignments');
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(MOCK_ASSIGNMENT_SUBMISSIONS);
  const [projects, setProjects] = useState<ProjectSubmission[]>(MOCK_PROJECT_SUBMISSIONS);
  
  // Grading Modal state
  const [selectedSubmission, setSelectedSubmission] = useState<AssignmentSubmission | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(90);
  const [gradeFeedback, setGradeFeedback] = useState<string>('');

  const openGradingModal = (sub: AssignmentSubmission) => {
    setSelectedSubmission(sub);
    setGradeScore(sub.score || 90);
    setGradeFeedback(sub.feedback || 'Excellent execution on SQL CTEs and optimization.');
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;
    setSubmissions(submissions.map(s => s.id === selectedSubmission.id ? {
      ...s,
      status: 'graded',
      score: Number(gradeScore),
      feedback: gradeFeedback,
      gradedAt: new Date().toISOString(),
      gradedBy: 'Selor Admin'
    } : s));
    setSelectedSubmission(null);
  };

  return (
    <div className="flex-1 flex flex-col">
      <TopNav title="Assessments" />

      <div className="p-8 max-w-7xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-stone-900 tracking-tight">
              Assessments & grading
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Review coursework submissions, grade student SQL/Python capstones, and manage exams.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center bg-white rounded-ctrl p-1 border border-stone-200/80 shadow-xs mb-4">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
              activeTab === 'assignments'
                ? 'bg-[#A70727] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Assignments ({submissions.filter(s => s.status === 'pending_review').length} Pending)
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
              activeTab === 'projects'
                ? 'bg-[#A70727] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Capstones ({projects.filter(p => p.status === 'pending').length} Pending)
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
              activeTab === 'exams'
                ? 'bg-[#A70727] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Online Exams
          </button>
        </div>

        {/* TAB 1: Assignments */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-card border border-stone-200/80 shadow-card overflow-hidden">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-stone-900 tracking-tight">
                Student Submissions Queue
              </h3>
              <span className="text-xs text-stone-500 tabular-nums">
                Showing {submissions.length} total records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-100 text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                    <th className="py-3.5 px-5">Student</th>
                    <th className="py-3.5 px-4">Assignment / Course</th>
                    <th className="py-3.5 px-4">File</th>
                    <th className="py-3.5 px-4">Submitted Date</th>
                    <th className="py-3.5 px-4">Status & Grade</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={sub.studentAvatar}
                            alt={sub.studentName}
                            className="w-7 h-7 rounded-full object-cover img-outline flex-shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-stone-900">{sub.studentName}</p>
                            <p className="text-[10px] text-stone-400">{sub.studentEmail}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-medium text-stone-800 line-clamp-1">{sub.assignmentTitle}</p>
                        <p className="text-[11px] text-stone-400">{sub.courseTitle}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <a
                          href={sub.fileUrl}
                          className="inline-flex items-center gap-1 text-[11px] text-[#A70727] font-semibold hover:underline bg-stone-100/90 px-2 py-1 rounded-[6px] border border-stone-200/50"
                        >
                          <FileText className="w-3 h-3" />
                          <span className="truncate max-w-[140px] font-mono">{sub.fileName}</span>
                        </a>
                      </td>

                      <td className="py-3.5 px-4 text-stone-500 text-[11px] tabular-nums">
                        {formatDateTime(sub.submittedAt)}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeClass(sub.status)}`}>
                            {sub.status === 'pending_review' ? 'Pending' : sub.status}
                          </span>
                          {sub.score !== undefined && (
                            <span className="font-bold text-stone-900 text-xs tabular-nums">
                              {sub.score}/100
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => openGradingModal(sub)}
                          className="px-3.5 py-1.5 bg-[#A70727] text-white rounded-ctrl text-xs font-semibold hover:bg-[#8E0621] transition-all shadow-xs btn-press ring-1 ring-white/10"
                        >
                          {sub.status === 'graded' ? 'Edit Grade' : 'Grade'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-3.5">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-card p-5 border border-stone-200/80 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <img
                    src={proj.studentAvatar}
                    alt={proj.studentName}
                    className="w-10 h-10 rounded-full object-cover img-outline flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeClass(proj.status)}`}>
                        {proj.status}
                      </span>
                      <span className="text-xs text-stone-500">{proj.courseTitle}</span>
                    </div>
                    <h4 className="font-heading font-bold text-base text-stone-900 tracking-tight">
                      {proj.projectTitle}
                    </h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Submitted by <strong>{proj.studentName}</strong> ({proj.studentEmail})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-ctrl text-xs font-semibold text-stone-800 transition-colors btn-press border border-stone-200/60"
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {proj.dashboardUrl && (
                    <a
                      href={proj.dashboardUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-ctrl text-xs font-semibold transition-colors btn-press"
                    >
                      <Monitor className="w-3.5 h-3.5 text-amber-700" />
                      <span>Dashboard</span>
                    </a>
                  )}
                  {proj.videoDemoUrl && (
                    <a
                      href={proj.videoDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-ctrl text-xs font-semibold transition-colors btn-press"
                    >
                      <Video className="w-3.5 h-3.5 text-blue-600" />
                      <span>Demo</span>
                    </a>
                  )}
                  <button
                    onClick={() => alert(`Reviewing Capstone for ${proj.studentName}`)}
                    className="px-3.5 py-1.5 bg-[#A70727] text-white rounded-ctrl text-xs font-semibold hover:bg-[#8E0621] transition-all shadow-xs btn-press ring-1 ring-white/10"
                  >
                    Publish Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Exams */}
        {activeTab === 'exams' && (
          <div className="bg-white rounded-card p-6 border border-stone-200/80 shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-stone-900">Module Exams & Automated Scoring</h3>
                <p className="text-xs text-stone-500">Timed assessments with automated multiple-choice scoring and pass criteria.</p>
              </div>
              <button
                onClick={() => alert('Opening Exam Creator')}
                className="px-4 py-2 bg-[#A70727] text-white rounded-ctrl text-xs font-semibold hover:bg-[#8E0621] btn-press ring-1 ring-white/10 shadow-xs"
              >
                + Create New Exam
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-card border border-stone-200/80 bg-stone-50/60 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A70727]">Data Analytics</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">Active</span>
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 tracking-tight">PostgreSQL & Data Modeling Final Exam</h4>
                <p className="text-xs text-stone-500 mt-1">40 Questions · 60 Mins · 75% Pass Score</p>
                <div className="flex items-center justify-between text-xs text-stone-600 mt-4 pt-3 border-t border-stone-200/60 tabular-nums">
                  <span>Attempts: <strong>142</strong></span>
                  <span>Average Pass Rate: <strong className="text-emerald-700">89%</strong></span>
                </div>
              </div>

              <div className="p-4 rounded-card border border-stone-200/80 bg-stone-50/60 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A70727]">Machine Learning</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">Active</span>
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 tracking-tight">Supervised Algorithms & Validation Exam</h4>
                <p className="text-xs text-stone-500 mt-1">30 Questions · 45 Mins · 80% Pass Score</p>
                <div className="flex items-center justify-between text-xs text-stone-600 mt-4 pt-3 border-t border-stone-200/60 tabular-nums">
                  <span>Attempts: <strong>88</strong></span>
                  <span>Average Pass Rate: <strong className="text-emerald-700">84%</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grading Drawer / Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-lg shadow-modal border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900">Grade Assignment Submission</h3>
                <p className="text-xs text-stone-500">{selectedSubmission.studentName} · {selectedSubmission.assignmentTitle}</p>
              </div>
              <button onClick={() => setSelectedSubmission(null)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-ctrl btn-press">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="p-6 space-y-4">
              <div className="p-3 bg-stone-50/80 rounded-ctrl border border-stone-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#A70727]" />
                  <span className="font-mono font-medium text-stone-800">{selectedSubmission.fileName}</span>
                </div>
                <span className="text-stone-400 tabular-nums">{selectedSubmission.fileSize}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Score (Out of 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring font-bold tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Instructor Feedback</label>
                <textarea
                  rows={4}
                  required
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  placeholder="Provide constructive feedback for the learner..."
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200/90 rounded-ctrl focus-ring"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 rounded-ctrl btn-press"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#A70727] hover:bg-[#8E0621] rounded-ctrl shadow-xs btn-press ring-1 ring-white/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Release Grade</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
