'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, Plus } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ElementType;
  };
}

export function Header({
  title = "Admin dashboard",
  subtitle = "Overview of enrollments, revenue, and what needs your attention.",
  actionButton
}: HeaderProps) {
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const ranges = ['Today', 'Last 7 days', 'Last 30 days', 'This Quarter', 'All time'];

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="font-heading text-2xl md:text-[28px] font-bold text-[#1C1917] tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs md:text-sm text-stone-500 font-normal mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Action Controls & Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search Quick Bar */}
        <div className="relative hidden lg:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search students, courses..."
            className="pl-8 pr-3 py-1.5 text-xs bg-white/90 border border-stone-200/90 rounded-ctrl focus-ring w-52 placeholder:text-stone-400 text-stone-800 shadow-xs transition-all"
          />
        </div>

        {/* Time Period Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-stone-200/90 rounded-ctrl text-xs font-medium text-stone-700 hover:border-stone-300 shadow-xs transition-all btn-press"
          >
            <span>{timeRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white border border-stone-200/90 rounded-ctrl shadow-dropdown py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              {ranges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                    timeRange === range
                      ? 'bg-stone-50 font-semibold text-[#A70727]'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#A70727] text-white rounded-ctrl text-xs font-semibold hover:bg-[#8E0621] shadow-xs transition-all btn-press ring-1 ring-white/10"
          >
            {actionButton.icon ? (
              React.createElement(actionButton.icon, { className: "w-3.5 h-3.5" })
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            <span>{actionButton.label}</span>
          </button>
        )}
      </div>
    </header>
  );
}
