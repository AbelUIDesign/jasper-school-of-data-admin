'use client';

import React from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { NeedsAttention } from '@/components/dashboard/NeedsAttention';
import { RevenueTrend } from '@/components/dashboard/RevenueTrend';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ChevronDown } from 'lucide-react';

export default function DashboardOverviewPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header Bar */}
      <TopNav title="Overview" />

      {/* Main Canvas Area */}
      <div className="p-8 max-w-7xl w-full mx-auto">
        {/* Welcome Subheader with Date Range Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-stone-900 tracking-tight">
              Executive dashboard
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Overview of enrollments, revenue, and what needs your attention.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-stone-200/90 rounded-ctrl text-xs font-medium text-stone-700 hover:border-stone-300 shadow-xs transition-all btn-press">
              <span>Last 30 days</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>
        </div>

        {/* 4 KPI Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <MetricCard
            title="Active Students"
            value="1,284"
            change="8.2%"
            isPositive={true}
            periodLabel="vs last month"
          />
          <MetricCard
            title="Revenue This Month"
            value="£24,650"
            change="14.6%"
            isPositive={true}
            periodLabel="vs last month"
          />
          <MetricCard
            title="New Enrollments (7d)"
            value="37"
            change="3.1%"
            isPositive={false}
            periodLabel="vs prior week"
          />
          <MetricCard
            title="Course Completion Rate"
            value="72%"
            change="2.4%"
            isPositive={true}
            periodLabel="vs last cohort"
          />
        </div>

        {/* Middle Two-Column Grid: Needs Attention & Revenue Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <NeedsAttention />
          <RevenueTrend />
        </div>

        {/* Lower Section: Active Students Progress & Recent Enrollments */}
        <RecentActivity />
      </div>
    </div>
  );
}
