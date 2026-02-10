import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white mt-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl font-bold animate-float">🎼</span>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Zoe Music Academy
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Music is a Language, Let's Speak It!
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all transform hover:scale-110 hover:rotate-12 backdrop-blur-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all transform hover:scale-110 hover:rotate-12 backdrop-blur-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all transform hover:scale-110 hover:rotate-12 backdrop-blur-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Our Courses */}
          <div>
            <h3 className="font-semibold mb-6 text-lg text-white">Our Courses</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                { to: '/courses?instrument=keyboard&level=beginner&lang=tamil', label: 'Keyboard - Beginners (Tamil)' },
                { to: '/courses?instrument=keyboard&level=beginner&lang=english', label: 'Keyboard - Beginners (English)' },
                { to: '/courses?instrument=guitar&level=beginner&lang=tamil', label: 'Guitar - Beginners (Tamil)' },
                { to: '/courses?instrument=keyboard&level=advanced&lang=tamil', label: 'Keyboard - Advanced (Tamil)' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6 text-lg text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                { to: '/free-resources', label: 'Free Resources' },
                { to: '/faq', label: 'FAQs' },
                { to: '/contact', label: 'Contact Us' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-6 text-lg text-white">Legal</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms & Conditions' },
                { to: '/refund', label: 'Refund & Return Policy' },
                { to: '/cancellation', label: 'Cancellation Policy' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            Copyrights © 2026. All rights reserved. Web Developed by{' '}
            <span className="text-purple-300 font-semibold">joel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

