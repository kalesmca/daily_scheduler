import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <p>The requested page does not exist.</p>
      <Link to="/dashboard">Return to Dashboard</Link>
    </section>
  );
}

export default NotFound;