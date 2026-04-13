import { Link, useLocation } from "react-router-dom";

function Navbar() {
  // useLocation lets us detect the current URL path
  const location = useLocation();

  // Navigation links configuration
  const links = [
    { to: "/", label: "Today" },
    { to: "/upcoming", label: "Upcoming" },
    { to: "/completed", label: "Completed" },
  ];

  return (
    <nav className="flex items-center gap-5 px-6 py-4 border-b border-gray-300">
      <h2 className="m-0 text-3xl font-bold font-[Boldonse]">Get It Done!</h2>

      {/* Navigation links aligned to the right */}
      <div className="flex gap-4 ml-auto">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`no-underline text-2xl font-[Zain] transition-colors ${
              location.pathname === link.to
                ? "text-blue-600"
                : "text-gray-900 hover:text-blue-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
