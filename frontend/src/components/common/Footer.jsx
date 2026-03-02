import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black/80 text-gray-300 pt-12 pb-6 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            PARK <span className="tracking-widest text-sm">SMART</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            ParkEase helps drivers find and book parking slots in real time,
            saving time, fuel, and reducing congestion in smart cities.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/book-parking" className="hover:text-white transition">
                Book Parking
              </Link>
            </li>
            <li>
              <Link to="/my-booking" className="hover:text-white transition">
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/parking-status"
                className="hover:text-white transition"
              >
                Parking Status
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-white transition">
                Help
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="hover:text-white transition">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* PARTNERS */}
        <div>
          <h3 className="text-white font-semibold mb-3">For Partners</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">
              List Your Parking Space
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Partner Login
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Business Solutions
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Contact for Partnership
            </li>
          </ul>

          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            Become a Partner
          </button>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Your City / College</li>
            <li>📧 support@parkease.com</li>
            <li>📞 +91 9XXXXXXXXX</li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>

          <div className="flex gap-4 mt-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#1877F2] text-white hover:scale-110 transition"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:scale-110 transition"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#0A66C2] text-white hover:scale-110 transition"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-black text-white border border-gray-600 hover:scale-110 transition"
            >
              <FaXTwitter size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © 2026 <span className="text-white font-semibold">ParkEase</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
