import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, User, LogOut, ChevronDown, LayoutDashboard, UserCog } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isLandingPage = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-40 ${isLandingPage ? 'relative w-full' : ''}`}>
      <nav className={`${isLandingPage ? 'bg-slate-950/90 border-b border-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(2,6,23,0.45)] text-white' : 'bg-gradient-to-r from-slate-950 via-sky-950 to-sky-900 text-white shadow-[0_8px_30px_rgba(8,47,73,0.25)]'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-white/40 transition-all duration-200">
                <Eye className="h-5 w-5 text-sky-700" />
              </div>
              <div className="leading-tight">
                <div className="text-lg font-black tracking-tight text-white">
                  Cataract<span className="text-cyan-300">AI</span>
                </div>
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-sky-100/90">
                  Clinical Imaging
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {!isAuthenticated ? (
                <>
                  {isLandingPage && (
                    <>
                      <a href="#features" className="text-sm font-medium text-sky-100 transition-colors hover:text-white">
                        Features
                      </a>
                      <a href="#how-it-works" className="text-sm font-medium text-sky-100 transition-colors hover:text-white">
                        How It Works
                      </a>
                    </>
                  )}
                  <Link
                    to="/login"
                    className="text-sm font-medium text-sky-100 transition-colors hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/20 transition-all"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/upload"
                    className={`text-sm font-medium ${location.pathname === '/upload' ? 'text-cyan-200' : 'text-sky-100 hover:text-white'} transition-colors`}
                  >
                    Upload Scan
                  </Link>

                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-white/10"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-sky-500 ring-2 ring-white/60 shadow-sm">
                        <span className="text-sm font-semibold text-slate-900">
                          {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="hidden text-sm font-medium text-white sm:block">
                        {user?.fullName?.split(' ')[0] || 'User'}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-sky-100 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl animate-scale-in">
                        <div className="border-b border-slate-100 px-4 py-3">
                          <p className="text-sm font-semibold text-slate-900">{user?.fullName}</p>
                          <p className="text-xs text-slate-500">{user?.email}</p>
                          <span className="mt-2 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-700 capitalize">
                            {user?.role}
                          </span>
                        </div>

                        <Link
                          to="/upload"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>

                        <Link
                          to="/history"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          History
                        </Link>

                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          Profile
                        </Link>

                        {user?.role === 'admin' && (
                          <Link
                            to="/admin/users"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <UserCog className="h-4 w-4" />
                            Admin Panel
                          </Link>
                        )}

                        <div className="border-t border-slate-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-danger-600 hover:bg-danger-50 w-full transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="md:hidden">
              {isAuthenticated ? (
                <Link
                  to="/upload"
                  className="bg-gradient-to-r from-primary-500 to-cyan-500 text-white px-3 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/20"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-primary-500 to-cyan-500 text-white px-3 py-2 rounded-xl text-sm font-semibold"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
