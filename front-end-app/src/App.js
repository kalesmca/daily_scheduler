import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";


import Dashboard from "./pages/dashboard/Dashboard";
import TodoList from "./pages/todo-list/TodoList";
import Reports from "./pages/todo-list/TodoList";
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
          <Route path="list" element={<TodoList />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;