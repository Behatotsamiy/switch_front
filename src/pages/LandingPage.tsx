import React from 'react';
import { Calendar, Users, Briefcase, Award, MapPin, ArrowRight, Star } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-black tracking-wider text-purple-700">SWITCH</div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#events" className="hover:text-purple-600 transition">Events</a>
          <a href="#community" className="hover:text-purple-600 transition">Community</a>
          <a href="#projects" className="hover:text-purple-600 transition">Projects</a>
          <a href="#mentors" className="hover:text-purple-600 transition">Mentors</a>
          <a href="#about" className="hover:text-purple-600 transition">About</a>
        </nav>
        <div className="flex gap-4">
          <button className="px-5 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50 rounded-full transition">Login</button>
          <button className="px-5 py-2 text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 rounded-full shadow-md shadow-purple-200 transition">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
            Empowering Girls. <br />
            <span className="text-purple-600">Building Futures.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-lg">
            SWITCH is a community for girls who want to learn, build, and launch startup projects.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 shadow-lg shadow-purple-200 transition">Join Community</button>
            <button className="px-6 py-3 border border-slate-200 font-semibold rounded-full hover:bg-slate-100 transition">Upcoming Events</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Members', value: '1,200+', icon: Users },
            { label: 'Events', value: '35', icon: Calendar },
            { label: 'Projects', value: '70+', icon: Briefcase },
            { label: 'Mentors', value: '20', icon: Award },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Upcoming Events</h2>
            <p className="text-slate-500 mt-2">Join our workshops, session bootcamps and pitch days</p>
          </div>
          <a href="#" className="text-purple-600 font-semibold flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Switch Session 2', date: '25-26 Jun, 2024', location: 'Westminster University', seats: '35 / 50', tag: 'Bootcamp & Hackathon' },
            { title: 'UI/UX Design Workshop', date: '10 August, 2024', location: 'IT Park Tashkent', seats: '22 / 30', tag: 'Tech Workshop' },
            { title: 'Pitch Your Startup', date: '20 August, 2024', location: 'Impact Hub', seats: '18 / 20', tag: 'Competition' },
          ].map((event, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="h-48 bg-purple-100 relative">
                <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">{event.tag}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-600" /> {event.date}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-purple-600" /> {event.location}</div>
                  <div className="flex items-center gap-2"><Users className="w-4 h-4 text-purple-600" /> {event.seats} seats</div>
                </div>
                <button className="w-full mt-6 py-2.5 bg-purple-50 text-purple-700 font-semibold rounded-xl hover:bg-purple-100 transition">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="text-2xl font-black text-white">SWITCH</div>
            <p className="mt-2 text-sm max-w-xs">Empowering girls to build the future through technology and startups.</p>
          </div>
          <div className="text-xs text-slate-500">
            © 2026 SWITCH Community. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};