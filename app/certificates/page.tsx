'use client';

import React, { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { MOCK_CERTIFICATES } from '@/lib/mock-data';
import { Certificate } from '@/lib/types';
import { formatDate, getStatusBadgeClass } from '@/lib/utils';
import { 
  Award, 
  CheckCircle2, 
  Download, 
  Eye, 
  Search, 
  X
} from 'lucide-react';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>(MOCK_CERTIFICATES);
  const [statusFilter, setStatusFilter] = useState<'all' | 'awaiting_approval' | 'issued'>('awaiting_approval');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Preview Modal state
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  const handleApprove = (id: string) => {
    setCertificates(certificates.map(c => c.id === id ? {
      ...c,
      status: 'issued',
      issueDate: new Date().toISOString().slice(0, 10),
      downloadUrl: '#'
    } : c));
  };

  const handleBatchApprove = () => {
    setCertificates(certificates.map(c => c.status === 'awaiting_approval' ? {
      ...c,
      status: 'issued',
      issueDate: new Date().toISOString().slice(0, 10),
      downloadUrl: '#'
    } : c));
  };

  const handleRevoke = (id: string) => {
    if (confirm('Are you sure you want to revoke this certificate?')) {
      setCertificates(certificates.map(c => c.id === id ? {
        ...c,
        status: 'revoked'
      } : c));
    }
  };

  const filteredCertificates = certificates.filter(c => {
    const matchesSearch = c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const awaitingCount = certificates.filter(c => c.status === 'awaiting_approval').length;

  return (
    <div className="flex-1 flex flex-col">
      <TopNav title="Certificates" />

      <div className="p-8 max-w-7xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-stone-900 tracking-tight">
              Certificate approvals
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Approve verified course completions, preview branded certificates, and verify IDs.
            </p>
          </div>

          {awaitingCount > 0 && (
            <button
              onClick={handleBatchApprove}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#A70727] hover:bg-[#8E0621] text-white text-xs font-bold rounded-ctrl shadow-xs transition-all btn-press self-start sm:self-auto ring-1 ring-white/10"
            >
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Batch Approve ({awaitingCount})</span>
            </button>
          )}
        </div>

        {/* Tabs & Search Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center bg-white rounded-ctrl p-1 border border-stone-200/80 shadow-xs">
            <button
              onClick={() => setStatusFilter('awaiting_approval')}
              className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
                statusFilter === 'awaiting_approval'
                  ? 'bg-[#A70727] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Awaiting Approval ({awaitingCount})
            </button>
            <button
              onClick={() => setStatusFilter('issued')}
              className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
                statusFilter === 'issued'
                  ? 'bg-[#A70727] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Issued ({certificates.filter(c => c.status === 'issued').length})
            </button>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1 rounded-[7px] text-xs font-semibold transition-all btn-press ${
                statusFilter === 'all'
                  ? 'bg-[#A70727] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Certificates
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search student or certificate ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200/80 rounded-ctrl focus-ring text-stone-800 placeholder:text-stone-400 shadow-xs"
            />
          </div>
        </div>

        {/* Certificates Table */}
        <div className="bg-white rounded-card border border-stone-200/80 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                  <th className="py-3.5 px-5">Certificate ID</th>
                  <th className="py-3.5 px-4">Graduate Student</th>
                  <th className="py-3.5 px-4">Course Program</th>
                  <th className="py-3.5 px-4">Grade Achieved</th>
                  <th className="py-3.5 px-4">Completed Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                {filteredCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="font-mono font-bold text-stone-900 text-[11px] bg-stone-100/90 px-2.5 py-0.5 rounded-[5px] border border-stone-200/70 tabular-nums">
                        {cert.certificateNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-stone-900">{cert.studentName}</p>
                      <p className="text-[10px] text-stone-400">{cert.studentEmail}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-medium text-stone-800">{cert.courseTitle}</p>
                      <p className="text-[10px] text-stone-400">Instructor: {cert.instructorName}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-[5px] text-[11px] tabular-nums">
                        {cert.gradeAchieved}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-stone-500 text-[11px] tabular-nums">
                      {formatDate(cert.completionDate)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusBadgeClass(cert.status)}`}>
                        {cert.status === 'awaiting_approval' ? 'Pending' : cert.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setPreviewCert(cert)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-ctrl transition-colors btn-press border border-stone-200/60"
                          title="Live Certificate Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {cert.status === 'awaiting_approval' ? (
                          <button
                            onClick={() => handleApprove(cert.id)}
                            className="px-3 py-1 bg-[#A70727] text-white hover:bg-[#8E0621] rounded-ctrl text-xs font-semibold shadow-xs btn-press ring-1 ring-white/10"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRevoke(cert.id)}
                            className="text-[11px] text-rose-600 hover:underline font-medium btn-press"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Branded Certificate Live Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-3xl shadow-modal border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#A70727]" />
                <h3 className="font-heading font-bold text-sm text-stone-900">
                  Official Digital Certificate Preview
                </h3>
              </div>
              <button onClick={() => setPreviewCert(null)} className="p-1 text-stone-400 hover:text-stone-700 rounded btn-press">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8 bg-[#FAF8F5] flex items-center justify-center">
              <div className="w-full bg-white p-8 rounded-card border-8 border-stone-100 shadow-md text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#A70727] via-[#FEC00E] to-[#A70727]"></div>

                <div className="mb-4">
                  <span className="font-heading text-xl font-extrabold text-[#A70727] tracking-tight uppercase">
                    Jasper School of Data
                  </span>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold mt-0.5">
                    Accredited Data & AI Education Platform
                  </p>
                </div>

                <div className="my-6">
                  <span className="text-xs text-stone-500 uppercase tracking-widest font-medium">
                    This is to certify that
                  </span>
                  <h2 className="font-heading text-3xl font-extrabold text-stone-900 my-2 tracking-tight">
                    {previewCert.studentName}
                  </h2>
                  <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                    has successfully fulfilled all curriculum, project capstone, and exam requirements for
                  </p>
                  <h4 className="font-heading text-lg font-bold text-[#A70727] mt-2">
                    {previewCert.courseTitle}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-800 mt-1 tabular-nums">
                    Awarded with {previewCert.gradeAchieved}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-stone-100 mt-6 text-xs text-stone-600">
                  <div>
                    <div className="font-serif italic text-base text-stone-800">{previewCert.instructorName}</div>
                    <div className="h-px bg-stone-300 w-32 mx-auto my-1"></div>
                    <span className="text-[10px] text-stone-400 uppercase">Head of Instruction</span>
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold text-stone-800 tabular-nums">{previewCert.certificateNumber}</div>
                    <div className="h-px bg-stone-300 w-32 mx-auto my-1"></div>
                    <span className="text-[10px] text-stone-400 uppercase">Verified Issue Date: {formatDate(previewCert.issueDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-mono">
                Verification URL: https://jasperschool.io/verify/{previewCert.certificateNumber}
              </span>
              <button
                onClick={() => alert(`Downloading high-res PDF for ${previewCert.certificateNumber}`)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#A70727] text-white rounded-ctrl text-xs font-semibold hover:bg-[#8E0621] shadow-xs btn-press ring-1 ring-white/10"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
