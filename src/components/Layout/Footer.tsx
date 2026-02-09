import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold">🎼</span>
              <span className="text-xl font-bold">Zoe Music Academy</span>
            </div>
            <p className="text-gray-400">
              Music is a Language, Let's Speak It!
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Our Courses */}
          <div>
            <h3 className="font-semibold mb-4">Our Courses</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/courses?instrument=keyboard&level=beginner&lang=tamil" className="hover:text-white transition">
                  Keyboard - Beginners (Tamil)
                </Link>
              </li>
              <li>
                <Link to="/courses?instrument=keyboard&level=beginner&lang=english" className="hover:text-white transition">
                  Keyboard - Beginners (English)
                </Link>
              </li>
              <li>
                <Link to="/courses?instrument=guitar&level=beginner&lang=tamil" className="hover:text-white transition">
                  Guitar - Beginners (Tamil)
                </Link>
              </li>
              <li>
                <Link to="/courses?instrument=keyboard&level=advanced&lang=tamil" className="hover:text-white transition">
                  Keyboard - Advanced (Tamil)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/free-resources" className="hover:text-white transition">
                  Free Resources
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-white transition">
                  Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="hover:text-white transition">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>Copyrights © 2025. All rights reserved. Web Developed by PRIWIL</p>
        </div>
      </div>
    </footer>
  );
}

