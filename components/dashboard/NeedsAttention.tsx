'use client';

import React from 'react';
import Link from 'next/link';
import { FileEdit, AlertTriangle, GraduationCap, Calendar, ChevronRight } from 'lucide-react';
import { MOCK_ATTENTION_ITEMS } from '@/lib/mock-data';

export function NeedsAttention() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'ungraded':
        return (
          <div className="w-8 h-8 rounded-[8px] bg-amber-50 text-amber-600 border border-amber-200/70 flex items-center justify-center flex-shrink-0">
            <FileEdit className="w-4 h-4" strokeWidth={1.75} />
          </div>
        );
      case 'failed_payment':
        return (
          <div className="w-8 h-8 rounded-[8px] bg-rose-50 text-rose-600 border border-rose-200/70 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4" strokeWidth={1.75} />
          </div>
        );
      case 'certificate':
        return (
          <div className="w-8 h-8 rounded-[8px] bg-purple-50 text-purple-600 border border-purple-200/70 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4 h-4" strokeWidth={1.75} />
          </div>
        );
      case 'class_starting':
        return (
          <div className="w-8 h-8 rounded-[8px] bg-blue-50 text-blue-600 border border-blue-200/70 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4" strokeWidth={1.75} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="surface-card p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-2">
        <div>
          <h3 className="font-heading font-bold text-[15px] text-[#1C1917] tracking-tight">
            Needs attention
          </h3>
        </div>
        <Link 
          href="/assessments" 
          className="text-xs font-semibold text-[#A70727] hover:text-[#8E0621] transition-colors btn-press"
        >
          View all
        </Link>
      </div>

      {/* Action Items List */}
      <div className="space-y-1.5">
        {MOCK_ATTENTION_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.actionHref}
            className="group flex items-center justify-between p-2 rounded-ctrl hover:bg-stone-50/80 transition-all duration-150 btn-press border border-transparent hover:border-stone-200/50"
          >
            <div className="flex items-center gap-3 min-w-0">
              {getIcon(item.iconType)}
              <span className="text-xs font-medium text-stone-800 group-hover:text-stone-900 truncate tracking-tight">
                {item.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-700 font-sans tabular-nums px-2 py-0.5 rounded-[6px] bg-stone-100 group-hover:bg-white group-hover:shadow-xs border border-stone-200/40 transition-all">
                {item.count}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-500 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
