import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) return null;

  return (
    <footer className="w-full bg-dark text-white text-sm py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tighter uppercase text-white">LUNA<span className="text-gray-500">RIA</span></h1>
          </div>

          {/* Admin Access Button */}
          <button
            onClick={() => window.open(window.location.origin + '/login', '_blank')}
            className="px-4 py-2 bg-gray-800 hover:bg-primary text-gray-400 hover:text-dark rounded-lg font-semibold text-sm transition-all flex items-center gap-2 group cursor-pointer"
          >
            <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin
          </button>
        </div>
      </div>
      <div className="text-center text-gray-600 text-xs mt-8">
        © {new Date().getFullYear()} Lunaria. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;