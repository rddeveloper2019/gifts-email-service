import React from "react";
import { Links } from "../enums";

export interface NavBarProps {
  options?: Record<Links, boolean>;
}

const NavBar = ({ options }: NavBarProps) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <p className="navbar-brand">🎁 Gift Email Service</p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${options?.[Links.MAILINGS] && "active"}`}
                aria-current="page"
                href="/"
              >
                Mailings
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${options?.[Links.GIFTS] && "active"}`}
                href="/gifts"
              >
                Gifts
              </a>
            </li>
          </ul>
          <form className="d-flex" action="/auth/logout">
            <button className="btn btn-outline-dark" type="submit">
              ☹️ Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
