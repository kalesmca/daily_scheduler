import "./Header.css";

function Header({ onMenuClick }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <a href="/dashboard" className="header-logo">
          <span className="logo-icon">K</span>
          <span>MyApp</span>
        </a>
      </div>

      <div className="header-right">
        <button className="header-icon" aria-label="Notifications">
          ♧
        </button>

        <div className="user-profile">
          <div className="avatar">K</div>

          <div className="user-details">
            <span className="user-name">Admin User</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;