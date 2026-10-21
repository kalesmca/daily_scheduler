import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/header/Header";
import Sidebar from "./components/sideNav/Sidebar";

import "./Layout.css";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <Header
        onMenuClick={() => setSidebarOpen((open) => !open)}
      />

      <div className="layout-body">
        <Sidebar
          isOpen={sidebarOpen}
          onNavigate={closeSidebar}
        />

        <main className="main-content">
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;