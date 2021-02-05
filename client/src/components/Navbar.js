import React from "react"
import { Link } from "react-router-dom";

// Depending on the current path, this component sets the "active" className on the appropriate navigation link item
function Navbar() {

  return (  

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" href="#">AXOLOTL</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    <li className="nav-item">
              <Link
              to="/search"
              className={
                window.location.pathname === "/Search" || window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Search
            </Link>
      </li>
    </ul>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
      <Link
              to="/login"
              className={
                window.location.pathname === "/login" || window.location.pathname === "/"
                  ? "nav-link"
                  : "nav-link"
              }
            >
              Login
            </Link>
      </li>
      <li className="nav-item">
              <Link
              to="/signup"
              className={
                window.location.pathname === "/login" || window.location.pathname === "/"
                  ? "nav-link"
                  : "nav-link"
              }
            >
              Sign Up
            </Link>
      </li>
    </ul>
  </div>
</nav>

  );
}

export default Navbar;
