'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_REVENUE_CHART_DATA } from '@/lib/mock-data';

export function RevenueTrend() {
  const [currency, setCurrency] = useState<'GBP' | 'NGN'>('GBP');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const data = MOCK_REVENUE_CHART_DATA;
  const maxVal = Math.max(...data.map(d => currency === 'GBP' ? d.gbp : d.ngn));
  const minVal = Math.min(...data.map(d => currency === 'GBP' ? d.gbp : d.ngn)) * 0.9;

  // SVG dimensions
  const svgWidth = 500;
  const svgHeight = 120;
  const paddingX = 20;
  const paddingY = 15;

  const getCoordinates = (index: number, val: number) => {
    const x = paddingX + (index / (data.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((val - minVal) / (maxVal - minVal)) * (svgHeight - paddingY * 2);
    return { x, y };
  };

  const points = data.map((d, i) => getCoordinates(i, currency === 'GBP' ? d.gbp : d.ngn));
  const pathD = points.reduce((acc, curr, i) => (i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`), '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  return (
    <div className="surface-card p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-2">
        <div className="flex items-center gap-3">
          <h3 className="font-heading font-bold text-[15px] text-[#1C1917] tracking-tight">
            Revenue trend
          </h3>
          {/* Dual currency pill switch */}
          <div className="flex items-center bg-stone-100/80 rounded-[8px] p-0.5 text-[11px] font-semibold text-stone-600 border border-stone-200/50">
            <button
              onClick={() => setCurrency('GBP')}
              className={`px-2 py-0.5 rounded-[6px] transition-all btn-press ${
                currency === 'GBP' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              GBP (£)
            </button>
            <button
              onClick={() => setCurrency('NGN')}
              className={`px-2 py-0.5 rounded-[6px] transition-all btn-press ${
                currency === 'NGN' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              NGN (₦)
            </button>
          </div>
        </div>
        <Link 
          href="/payments" 
          className="text-xs font-semibold text-[#A70727] hover:text-[#8E0621] transition-colors btn-press"
        >
          Full report
        </Link>
      </div>

      {/* Figures */}
      <div className="mb-2">
        <span className="font-heading text-2xl font-bold text-[#1C1917] tabular-nums tracking-tight">
          {currency === 'GBP' ? '£24,650' : '₦48,200,000'}
        </span>
        <p className="text-[11px] text-stone-500 font-normal mt-0.5">
          This month · Paystack & Flutterwave combined
        </p>
      </div>

      {/* Responsive SVG Sparkline Chart */}
      <div className="relative w-full h-[120px] mt-1">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="crimsonGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A70727" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#A70727" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Background Grid Line */}
          <line
            x1={paddingX}
            y1={svgHeight - paddingY}
            x2={svgWidth - paddingX}
            y2={svgHeight - paddingY}
            stroke="#E7E5E4"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Area Fill */}
          <path d={areaD} fill="url(#crimsonGradient)" />

          {/* Line Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#A70727"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Dots */}
          {points.map((pt, i) => (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint === i || i === points.length - 1 ? 5 : 3.5}
                fill={i === points.length - 1 ? '#A70727' : '#FFFFFF'}
                stroke="#A70727"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </g>
          ))}
        </svg>

        {/* Hover Tooltip display */}
        {hoveredPoint !== null && (
          <div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1C1917] text-white text-[11px] px-2.5 py-1 rounded-[6px] shadow-dropdown pointer-events-none flex items-center gap-1.5 z-10 border border-white/10"
          >
            <span className="text-stone-300">{data[hoveredPoint].date}:</span>
            <span className="font-bold text-[#FEC00E] tabular-nums">
              {currency === 'GBP' ? `£${data[hoveredPoint].gbp.toLocaleString()}` : `₦${data[hoveredPoint].ngn.toLocaleString()}`}
            </span>
          </div>
        )}
      </div>

      {/* Date Axis */}
      <div className="flex justify-between items-center text-[10px] text-stone-400 font-medium px-1 mt-1 border-t border-stone-100 pt-1.5 tabular-nums">
        <span>{data[0].date}</span>
        <span>{data[Math.floor(data.length / 2)].date}</span>
        <span>{data[data.length - 1].date}</span>
      </div>
    </div>
  );
}
