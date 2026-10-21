import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";


import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import Reports from "./pages/users/Users";
import Settings from "./pages/settings/Settings";
import NotFound from "./pages/notFound/NotFount";
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Navigate to="/dashboard" replace />}
          />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;