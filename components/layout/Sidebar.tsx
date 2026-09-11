'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  Video, 
  FileText, 
  CheckSquare, 
  Clock, 
  Award, 
  GraduationCap, 
  Settings, 
  ExternalLink 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: 'gold' | 'crimson' | 'stone';
}

const generalNav: NavItem[] = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Payments', href: '/payments', icon: CreditCard, badge: 3, badgeColor: 'gold' },
];

const learningNav: NavItem[] = [
  { name: 'Classes', href: '/classes', icon: Video, badge: '2', badgeColor: 'stone' },
  { name: 'Instructors', href: '/instructors', icon: GraduationCap },
  { name: 'Assignments', href: '/assessments?tab=assignments', icon: FileText, badge: 18, badgeColor: 'stone' },
  { name: 'Projects', href: '/assessments?tab=projects', icon: CheckSquare },
  { name: 'Exams', href: '/assessments?tab=exams', icon: Clock },
  { name: 'Certificates', href: '/certificates', icon: Award, badge: 9, badgeColor: 'stone' },
];

const systemNav: NavItem[] = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Student view', href: '/student-preview', icon: ExternalLink },
];

export function Sidebar() {
  const pathname = usePathname();

  const renderNavItem = (item: NavItem) => {
    const isActive = 
      item.href === '/' 
        ? pathname === '/' 
        : item.href.includes('?')
          ? pathname.startsWith(item.href.split('?')[0])
          : pathname === item.href || pathname.startsWith(item.href);

    const Icon = item.icon;

    return (
      <Link
        key={item.name}
        href={item.href}
        className={cn(
          "group flex items-center justify-between px-3.5 py-2 rounded-ctrl text-xs font-medium transition-all duration-150 btn-press",
          isActive
            ? "bg-[#FDF2F4] text-[#A70727] font-semibold"
            : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
        )}
      >
        <div className="flex items-center gap-2.5">
          <Icon 
            className={cn(
              "w-4 h-4 transition-colors flex-shrink-0", 
              isActive ? "text-[#A70727]" : "text-stone-400 group-hover:text-stone-600"
            )} 
            strokeWidth={isActive ? 2 : 1.75} 
          />
          <span className="tracking-tight">{item.name}</span>
        </div>

        {item.badge !== undefined && (
          <span className={cn(
            "text-[10px] px-2 py-0.5 rounded-full font-bold tabular-nums",
            item.badgeColor === 'gold'
              ? "bg-[#FEC00E] text-[#1C1917]"
              : "bg-stone-100 text-stone-600"
          )}>
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="w-60 bg-white text-stone-700 min-h-screen flex flex-col flex-shrink-0 border-r border-stone-200/80 select-none z-20">
      {/* Brand Header with Crimson "J" Emblem */}
      <div className="p-5 pb-6 flex items-center gap-3 border-b border-stone-100/80">
        <div className="w-8 h-8 rounded-[8px] bg-[#A70727] flex items-center justify-center text-white flex-shrink-0 shadow-xs font-heading font-extrabold text-base">
          J
        </div>
        <div className="flex flex-col">
          <span className="font-heading font-bold text-stone-900 text-sm leading-none tracking-tight">
            Jasper Admin
          </span>
          <span className="text-[11px] text-stone-400 font-medium tracking-tight mt-1">
            School of Data
          </span>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* GENERAL */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3.5 block mb-2">
            General
          </span>
          <div className="space-y-0.5">
            {generalNav.map(renderNavItem)}
          </div>
        </div>

        {/* LEARNING */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3.5 block mb-2">
            Learning
          </span>
          <div className="space-y-0.5">
            {learningNav.map(renderNavItem)}
          </div>
        </div>

        {/* SYSTEM */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3.5 block mb-2">
            System
          </span>
          <div className="space-y-0.5">
            {systemNav.map(renderNavItem)}
          </div>
        </div>
      </nav>

      {/* Footer System Status */}
      <div className="p-4 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between">
        <span className="font-mono text-[10px] text-stone-400">LMS Admin v2.0</span>
        <span className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Live
        </span>
      </div>
    </aside>
  );
}
