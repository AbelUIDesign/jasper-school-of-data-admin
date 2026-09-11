'use client';

import React, { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { Transaction } from '@/lib/types';
import { formatCurrency, formatDateTime, getStatusBadgeClass } from '@/lib/utils';
import { 
  Download, 
  Search, 
  RefreshCw 
} from 'lucide-react';

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [gatewayFilter, setGatewayFilter] = useState<string>('all');
  const [currencyFilter, setCurrencyFilter] = useState<'ALL' | 'GBP' | 'NGN'>('ALL');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesGateway = gatewayFilter === 'all' || t.gateway === gatewayFilter;
    const matchesCurrency = currencyFilter === 'ALL' || t.currency === currencyFilter;
    return matchesSearch && matchesStatus && matchesGateway && matchesCurrency;
  });

  const exportCSV = () => {
    const headers = ['Reference', 'Student Name', 'Email', 'Course', 'Amount', 'Currency', 'Gateway', 'Status', 'Date'];
    const rows = filteredTransactions.map(t => [
      t.reference,
      `"${t.studentName}"`,
      t.studentEmail,
      `"${t.courseTitle}"`,
      t.amount,
      t.currency,
      t.gateway,
      t.status,
      t.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jasper_transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const retryPaymentVerification = (ref: string) => {
    alert(`Querying webhook gateway status for reference: ${ref}`);
  };

  return (
    <div className="flex-1 flex flex-col">
      <TopNav title="Payments" />

      <div className="p-8 max-w-7xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-stone-900 tracking-tight">
              Payment transactions
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Real-time transaction log, Paystack & Flutterwave webhooks, and financial exports.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#A70727] hover:bg-[#8E0621] text-white text-xs font-bold rounded-ctrl shadow-xs transition-all btn-press self-start sm:self-auto ring-1 ring-white/10"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Financial Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="surface-card p-5">
            <div className="flex items-center justify-between text-[11px] font-medium text-stone-500 uppercase mb-2">
              <span>Paystack Volume (NGN)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="font-heading font-bold text-2xl text-stone-900 tabular-nums">
              ₦38,450,000
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              98.4% success rate across cards & bank transfers
            </p>
          </div>

          <div className="surface-card p-5">
            <div className="flex items-center justify-between text-[11px] font-medium text-stone-500 uppercase mb-2">
              <span>Flutterwave Volume (GBP)</span>
              <span className="w-2 h-2 rounded-full bg-[#FEC00E]"></span>
            </div>
            <p className="font-heading font-bold text-2xl text-stone-900 tabular-nums">
              £24,650
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              International diaspora cohort payments
            </p>
          </div>

          <div className="surface-card p-5">
            <div className="flex items-center justify-between text-[11px] font-medium text-stone-500 uppercase mb-2">
              <span>Pending & Failed Triage</span>
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            </div>
            <p className="font-heading font-bold text-2xl text-[#A70727] tabular-nums">
              5 Transactions
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              Awaiting bank reconciliation / retry
            </p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 flex-1 flex-wrap">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search reference, student name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200/90 rounded-ctrl focus-ring text-stone-800 shadow-xs"
              />
            </div>

            <select
              value={gatewayFilter}
              onChange={(e) => setGatewayFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-stone-200/90 rounded-ctrl text-xs font-medium text-stone-700 focus-ring shadow-xs"
            >
              <option value="all">All Gateways</option>
              <option value="Paystack">Paystack</option>
              <option value="Flutterwave">Flutterwave</option>
            </select>

            <select
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value as any)}
              className="px-3 py-2 bg-white border border-stone-200/90 rounded-ctrl text-xs font-medium text-stone-700 focus-ring shadow-xs"
            >
              <option value="ALL">All Currencies</option>
              <option value="GBP">GBP (£)</option>
              <option value="NGN">NGN (₦)</option>
            </select>
          </div>

          <div className="flex items-center bg-white p-1 rounded-ctrl text-xs border border-stone-200/80 shadow-xs">
            {['all', 'paid', 'pending', 'failed'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3.5 py-1 rounded-[7px] capitalize font-semibold transition-all btn-press ${
                  statusFilter === s
                    ? 'bg-[#A70727] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-card border border-stone-200/80 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                  <th className="py-3.5 px-5">Reference</th>
                  <th className="py-3.5 px-4">Student & Course</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Gateway</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="font-mono font-semibold text-stone-900 text-[11px] bg-stone-100/90 px-2.5 py-0.5 rounded-[5px] border border-stone-200/60">
                        {t.reference}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-stone-900">{t.studentName}</p>
                      <p className="text-[11px] text-stone-500">{t.courseTitle}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-stone-900 font-mono text-sm tabular-nums">
                        {formatCurrency(t.amount, t.currency)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-stone-800">{t.gateway}</span>
                        <span className="text-stone-400">({t.channel})</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-stone-500 text-[11px] tabular-nums">
                      {formatDateTime(t.createdAt)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusBadgeClass(t.status)}`}>
                        {t.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      {t.status === 'failed' || t.status === 'pending' ? (
                        <button
                          onClick={() => retryPaymentVerification(t.reference)}
                          className="flex items-center gap-1 ml-auto px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-ctrl border border-amber-200/70 btn-press"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Re-verify</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-stone-400 font-medium">Auto-enrolled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
