import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { isAuthenticated, getUser, logout } from '../../utils/auth';
import { isAdmin } from '../../utils/admin';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authenticated = isAuthenticated();
  const user = getUser();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-purple-600">🎼</span>
            <span className="text-xl font-bold text-gray-800">Zoe Music Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/courses" className="text-gray-700 hover:text-purple-600 transition">
              Courses
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition">
              About Us
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-purple-600 transition">
              FAQ
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition">
              Contact
            </Link>
            
            {authenticated ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name || 'Dashboard'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Join Now
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link
              to="/courses"
              className="block text-gray-700 hover:text-purple-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-purple-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/faq"
              className="block text-gray-700 hover:text-purple-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-purple-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {authenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-purple-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-gray-700 hover:text-red-600 transition w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Now
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

