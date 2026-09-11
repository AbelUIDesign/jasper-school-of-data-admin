'use client';

import React, { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { 
  CreditCard, 
  Video, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

export default function SettingsPage() {
  const [paystackSecret, setPaystackSecret] = useState('sk_live_9482948201948201840284');
  const [flutterwaveSecret, setFlutterwaveSecret] = useState('FLWSECK-84920485921-X');
  const [zoomApiKey, setZoomApiKey] = useState('zm_live_auth_token_8892184');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <TopNav title="Settings" />

      <div className="p-8 max-w-4xl w-full mx-auto">
        <div className="mb-6">
          <h2 className="font-heading font-bold text-2xl text-stone-900 tracking-tight">
            Platform & system settings
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage payment gateway credentials, Zoom API integrations, and system triggers.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Payment Gateways */}
          <div className="bg-white rounded-card p-6 border border-stone-200/80 shadow-card">
            <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100 mb-5">
              <CreditCard className="w-5 h-5 text-[#A70727]" />
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900">Payment Gateway Integrations</h3>
                <p className="text-xs text-stone-500">Live API keys for automated checkout and instant enrollment.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Paystack Live Secret Key (NGN / African Cards)
                </label>
                <input
                  type="password"
                  value={paystackSecret}
                  onChange={(e) => setPaystackSecret(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200 rounded-ctrl focus-ring font-mono"
                />
                <p className="text-[11px] text-stone-400 mt-1">Webhook URL: https://api.jasperschool.io/webhooks/paystack</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Flutterwave Live Secret Key (GBP / USD / International)
                </label>
                <input
                  type="password"
                  value={flutterwaveSecret}
                  onChange={(e) => setFlutterwaveSecret(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200 rounded-ctrl focus-ring font-mono"
                />
                <p className="text-[11px] text-stone-400 mt-1">Webhook URL: https://api.jasperschool.io/webhooks/flutterwave</p>
              </div>
            </div>
          </div>

          {/* Zoom Integration */}
          <div className="bg-white rounded-card p-6 border border-stone-200/80 shadow-card">
            <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100 mb-5">
              <Video className="w-5 h-5 text-[#A70727]" />
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900">Zoom Live Classroom API</h3>
                <p className="text-xs text-stone-500">Auto-create Zoom meeting rooms and retrieve cloud recordings.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Zoom Server-to-Server OAuth Secret
              </label>
              <input
                type="password"
                value={zoomApiKey}
                onChange={(e) => setZoomApiKey(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50/80 border border-stone-200 rounded-ctrl focus-ring font-mono"
              />
            </div>
          </div>

          {/* Save Action */}
          <div className="flex items-center justify-between">
            {isSaved ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Settings saved successfully!
              </span>
            ) : <div></div>}

            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 bg-[#A70727] text-white rounded-ctrl text-xs font-semibold hover:bg-[#8E0621] shadow-xs transition-colors btn-press ring-1 ring-white/10"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
