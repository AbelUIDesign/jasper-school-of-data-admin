'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { 
  BookOpen, 
  Video, 
  Calendar, 
  CheckCircle2, 
  Award, 
  ArrowLeft,
  Clock,
  Download
} from 'lucide-react';

export default function StudentPreviewPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 bg-amber-50 border border-amber-200 rounded-card p-4 text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <span className="font-bold">Student View Simulator:</span>
          <span>This is how an enrolled student views their live classroom, assignments, and curriculum.</span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1 font-semibold text-[#A70727] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Admin</span>
        </Link>
      </div>

      <Header
        title="Welcome back, Chiamaka"
        subtitle="Cohort 2026-A · Full-Stack Data Analytics Immersive"
      />

      {/* Student Enrolled Course Hero */}
      <div className="bg-white rounded-card p-6 border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div>
            <span className="text-[11px] font-bold text-[#A70727] uppercase tracking-wider">Active Course</span>
            <h2 className="font-heading font-bold text-xl text-stone-900 mt-1">
              Full-Stack Data Analytics Immersive
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">Instructor: Dr. Kelechi Okafor</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-stone-500">Course Progress</span>
              <p className="font-heading font-bold text-lg text-stone-900">78%</p>
            </div>
            <div className="w-32 bg-stone-100 rounded-full h-2 overflow-hidden">
              <div className="bg-[#A70727] h-full w-[78%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Next Live Session */}
        <div className="mt-5 p-4 bg-[#FAF8F5] rounded-ctrl border border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-ctrl bg-[#A70727] text-white flex items-center justify-center flex-shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-stone-400">Next Live Class (Tomorrow at 6:00 PM)</span>
              <p className="font-heading font-bold text-sm text-stone-900">Advanced SQL Window Functions & Churn Modeling</p>
            </div>
          </div>

          <a
            href="https://zoom.us/j/84920485921"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-[#A70727] text-white text-xs font-semibold rounded-ctrl hover:bg-[#8E0621] text-center"
          >
            Join Zoom Class
          </a>
        </div>
      </div>

      {/* Quick Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-card p-5 border border-stone-200/80">
          <h3 className="font-heading font-bold text-base text-stone-900 mb-3">Course Modules</h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-stone-50 rounded-ctrl flex items-center justify-between">
              <span className="font-medium text-stone-800">Module 1: Relational SQL & Normalization</span>
              <span className="text-emerald-700 font-semibold">Completed</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-ctrl flex items-center justify-between">
              <span className="font-medium text-stone-800">Module 2: Python Data Wrangling (Pandas)</span>
              <span className="text-emerald-700 font-semibold">Completed</span>
            </div>
            <div className="p-3 bg-brand-crimson-light border border-brand-crimson-border rounded-ctrl flex items-center justify-between">
              <span className="font-semibold text-brand-crimson">Module 3: Window Functions & Aggregations</span>
              <span className="text-brand-crimson font-bold">In Progress</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card p-5 border border-stone-200/80">
          <h3 className="font-heading font-bold text-base text-stone-900 mb-3">Upcoming Deadlines</h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 border border-stone-200 rounded-ctrl flex items-center justify-between">
              <div>
                <p className="font-semibold text-stone-900">SQL Cohort Analysis Assignment</p>
                <p className="text-[10px] text-stone-500">Due Sep 10, 2026</p>
              </div>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Due in 3 days</span>
            </div>
            <div className="p-3 border border-stone-200 rounded-ctrl flex items-center justify-between">
              <div>
                <p className="font-semibold text-stone-900">Retail Revenue Capstone Project</p>
                <p className="text-[10px] text-stone-500">Due Sep 25, 2026</p>
              </div>
              <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-[10px] font-bold rounded">In 18 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
