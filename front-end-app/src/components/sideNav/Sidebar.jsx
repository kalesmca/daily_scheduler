import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "▦",
  },
  {
    label: "Users",
    path: "/users",
    icon: "♙",
  },
  {
    label: "Reports",
    path: "/reports",
    icon: "▤",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: "⚙",
  },
];

function Sidebar({ isOpen, onNavigate }) {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onNavigate}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-heading">MAIN MENU</div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onNavigate}
            >
              <span className="sidebar-icon" aria-hidden="true">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>MyApp v1.0.0</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;