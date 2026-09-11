import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  periodLabel: string;
}

export function MetricCard({
  title,
  value,
  change,
  isPositive,
  periodLabel
}: MetricCardProps) {
  return (
    <div className="surface-card p-5 flex flex-col justify-between group">
      <span className="text-[11px] font-medium text-stone-500 tracking-tight uppercase">
        {title}
      </span>
      
      <div className="my-2">
        <span className="font-heading text-[28px] font-bold text-[#1C1917] tracking-tight leading-none tabular-nums">
          {value}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-xs">
        <span
          className={cn(
            "font-semibold flex items-center gap-0.5 tabular-nums text-[11px] px-1.5 py-0.5 rounded-[5px]",
            isPositive 
              ? "text-emerald-700 bg-emerald-50 border border-emerald-200/60" 
              : "text-rose-700 bg-rose-50 border border-rose-200/60"
          )}
        >
          {isPositive ? "▲" : "▼"} {change}
        </span>
        <span className="text-stone-400 font-normal text-[11px]">
          {periodLabel}
        </span>
      </div>
    </div>
  );
}
