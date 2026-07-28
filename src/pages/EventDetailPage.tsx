import React, { useState } from 'react';
import { Calendar, MapPin, QrCode, Download, CheckCircle2 } from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const [registered, setRegistered] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Banner Card */}
        <div className="bg-purple-700 text-white rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="z-10 max-w-lg">
            <span className="px-3 py-1 bg-white/20 text-xs rounded-full font-semibold uppercase tracking-wider">Bootcamp & Hackathon</span>
            <h1 className="text-4xl font-extrabold mt-4">Switch Session 2</h1>
            <p className="mt-2 text-purple-100 text-sm">Five days of learning, teamwork and building your own startup from scratch.</p>
          </div>
          
          <div className="mt-6 md:mt-0 bg-white text-slate-900 p-6 rounded-2xl w-full md:w-64 text-center z-10 shadow-lg">
            <div className="text-2xl font-bold text-purple-700">35 / 50</div>
            <div className="text-xs text-slate-500 mb-4">Seats Left</div>
            <div className="text-xl font-extrabold">15,000 UZS</div>
            <div className="text-xs text-slate-400 mb-4">Application Fee</div>
            <button 
              onClick={() => setRegistered(true)}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition"
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Content Section & Ticket */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="text-lg font-bold">About Event</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Switch Session 2 is a two-day intensive event where girls will learn, collaborate, and build their own startup ideas from scratch.
              </p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>Guest speakers & startup journey</li>
                <li>Team activities & icebreakers</li>
                <li>Build your MVP (startup to team)</li>
                <li>Present your idea and win prizes</li>
              </ul>
            </div>
          </div>

          {/* Registration / Ticket Card */}
          <div>
            {registered ? (
              <div className="bg-white p-6 rounded-2xl border border-purple-200 text-center space-y-4 shadow-sm">
                <div className="text-xs font-semibold text-purple-600">Your Ticket</div>
                <h4 className="font-bold text-slate-900">Switch Session 2</h4>
                <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex justify-center">
                  <QrCode className="w-32 h-32 text-slate-800" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Amina Karimova</div>
                  <div className="text-xs text-slate-400">Ticket #SW-2026-087</div>
                </div>
                <button className="w-full py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition">
                  <Download className="w-4 h-4" /> Download Ticket
                </button>
              </div>
            ) : (
              <div className="bg-slate-100 p-6 rounded-2xl text-center text-slate-500 text-sm">
                Fill the form or click Register to generate your personal ticket & QR code.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};