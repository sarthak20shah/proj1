import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="nav bg-dark d-flex justify-content-right">
      <Link className="nav-link" to="/">
        <Button
          className="btn btn-raised bg-light"
          style={{ borderRadius: "50px" }}
        >
          Home
        </Button>
      </Link>

      <Link className="nav-link" to="/login">
        <Button
          className="btn btn-raised bg-light"
          style={{ borderRadius: "50px" }}
        >
          Login
        </Button>
      </Link>
      {/* <Link className="nav-link" to="/signup">
        Register
      </Link> */}
    </div>
  );
}

export default Home;
