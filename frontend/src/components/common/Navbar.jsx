import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const isLoggedIn = true;

  const [open, setOpen] = useState(false);        // profile dropdown
  const [mobileMenu, setMobileMenu] = useState(false); // hamburger menu

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About Us", path: "/about" },
    { name: "Parking Options", path: "/parking-rates" },
    { name: "Location", path: "/parking-status" },
  ];

  const handleLogout = () => {
    setOpen(false);
    setMobileMenu(false);
    navigate("/login");
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40">
      <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LEFT SPACER (for centering on mobile) */}
        <div className="md:hidden w-10"></div>

        {/* LOGO (CENTER ON MOBILE, LEFT ON DESKTOP) */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0
                     flex items-center gap-2 text-white"
        >
          <div className="grid grid-cols-2 gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <span className="text-xl font-bold">ParkEase</span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `hover:underline transition ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE ACTIONS */}
        <div
          className="flex items-center gap-4 relative"
          ref={dropdownRef}
        >
          {/* PROFILE ICON */}
          {isLoggedIn && (
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="hidden md:flex items-center gap-2 text-white"
            >
              <FaUserCircle size={28} />
              <FaChevronDown size={12} />
            </button>
          )}

          {/* HAMBURGER ICON (MOBILE ONLY) */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenu((prev) => !prev)}
          >
            {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* PROFILE DROPDOWN (DESKTOP) */}
          {open && (
            <div className="absolute right-0 top-12 w-60 bg-white rounded-xl 
                            shadow-lg text-gray-800 border z-50">
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                👤 Profile
              </button>

              <button
                onClick={() => {
                  navigate("/my-booking");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                📅 My Bookings
              </button>

              <button
                onClick={() => {
                  navigate("/payment-history");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                💳 Payment History
              </button>

              <div className="border-t" />

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 
                           text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {mobileMenu && (
        <div className="md:hidden bg-black/90 text-white px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenu(false)}
              className="block text-lg border-b border-white/20 pb-2"
            >
              {item.name}
            </NavLink>
          ))}

          {/* MOBILE PROFILE ACTIONS */}
          {isLoggedIn && (
            <>
              <NavLink
                to="/profile"
                onClick={() => setMobileMenu(false)}
                className="block text-lg border-b border-white/20 pb-2"
              >
                Profile
              </NavLink>

              <NavLink
                to="/my-booking"
                onClick={() => setMobileMenu(false)}
                className="block text-lg border-b border-white/20 pb-2"
              >
                My Bookings
              </NavLink>

              <NavLink
                to="/payment-history"
                onClick={() => setMobileMenu(false)}
                className="block text-lg border-b border-white/20 pb-2"
              >
                Payment History
              </NavLink>

              <button
                onClick={handleLogout}
                className="block text-left text-red-400 text-lg mt-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;