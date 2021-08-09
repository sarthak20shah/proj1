import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="nav bg-dark d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home
      </Link>

      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/signup">
        Register
      </Link>
    </div>
  );
}

export default Home;
