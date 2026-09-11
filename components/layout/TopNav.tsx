'use client';

import React from 'react';
import { Search, Bell } from 'lucide-react';

interface TopNavProps {
  title: string;
}

export function TopNav({ title }: TopNavProps) {
  return (
    <div className="bg-white border-b border-stone-200/80 px-8 py-3.5 flex items-center justify-between sticky top-0 z-10">
      {/* Page Title */}
      <h1 className="font-heading font-bold text-xl text-stone-900 tracking-tight">
        {title}
      </h1>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="relative w-72 hidden md:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search students, courses, payments..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50/70 border border-stone-200 rounded-ctrl focus-ring text-stone-800 placeholder:text-stone-400"
          />
        </div>

        {/* Notification Bell */}
        <button className="w-8 h-8 rounded-ctrl border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors btn-press relative">
          <Bell className="w-4 h-4" strokeWidth={1.75} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#A70727] absolute top-2 right-2"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-2">
          <div className="w-8 h-8 rounded-full bg-[#FBE7EB] text-[#A70727] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#F6CED5]">
            AD
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-stone-900 leading-tight">Admin User</span>
            <span className="text-[10px] text-stone-400 font-medium leading-tight">Super Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
