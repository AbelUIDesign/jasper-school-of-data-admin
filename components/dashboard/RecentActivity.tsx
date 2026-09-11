'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_STUDENTS, MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { formatCurrency, getStatusBadgeClass } from '@/lib/utils';

export function RecentActivity() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
      {/* Active Students & Course Progress */}
      <div className="surface-card p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-2">
          <div>
            <h3 className="font-heading font-bold text-[15px] text-[#1C1917] tracking-tight">
              Active students
            </h3>
            <p className="text-[11px] text-stone-500">Real-time learning progression</p>
          </div>
          <Link
            href="/students"
            className="text-xs font-semibold text-[#A70727] hover:text-[#8E0621] transition-colors btn-press"
          >
            View all roster
          </Link>
        </div>

        <div className="divide-y divide-stone-100">
          {MOCK_STUDENTS.slice(0, 4).map((student) => {
            const primaryCourse = student.enrolledCourses[0];
            return (
              <div key={student.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={student.avatar}
                    alt={student.fullName}
                    className="w-8 h-8 rounded-full object-cover img-outline flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-stone-900 truncate">
                      {student.fullName}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">
                      {primaryCourse ? primaryCourse.courseTitle : 'No course'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-24 hidden sm:block">
                    <div className="flex justify-between text-[10px] text-stone-500 mb-1">
                      <span>Progress</span>
                      <span className="font-semibold text-stone-800 tabular-nums">{primaryCourse?.progressPercent || 0}%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#A70727] h-full rounded-full transition-all duration-300"
                        style={{ width: `${primaryCourse?.progressPercent || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-[5px] uppercase bg-stone-100 text-stone-600 border border-stone-200/50">
                    {primaryCourse?.cohort || '2026-A'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions & Gateways */}
      <div className="surface-card p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-2">
          <div>
            <h3 className="font-heading font-bold text-[15px] text-[#1C1917] tracking-tight">
              Recent enrollments & payments
            </h3>
            <p className="text-[11px] text-stone-500">Paystack & Flutterwave automated webhooks</p>
          </div>
          <Link
            href="/payments"
            className="text-xs font-semibold text-[#A70727] hover:text-[#8E0621] transition-colors btn-press"
          >
            Ledger
          </Link>
        </div>

        <div className="divide-y divide-stone-100">
          {MOCK_TRANSACTIONS.slice(0, 4).map((txn) => (
            <div key={txn.id} className="py-2.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-stone-900 truncate">
                    {txn.studentName}
                  </p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-[4px] border ${getStatusBadgeClass(txn.status)}`}>
                    {txn.status}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 truncate">
                  {txn.courseTitle} · <span className="font-mono text-[10px] text-stone-400">{txn.reference}</span>
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-xs font-bold text-stone-900 font-mono tabular-nums">
                  {formatCurrency(txn.amount, txn.currency)}
                </p>
                <div className="flex items-center gap-1 justify-end text-[10px] text-stone-400">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                  <span>{txn.gateway}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
