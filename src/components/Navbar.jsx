import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        BlogHub
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/create">
          Create Post
        </Link>

        <Link to="/my-posts">
          My Posts
        </Link>

      </div>

      <Link to="/login" className="login-button">
        Login
      </Link>

    </nav>
  );
}

export default Navbar;