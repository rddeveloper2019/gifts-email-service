import React from "react";
import Layout from "./layout";

const SignInPage = ({ pageTitle }) => {
  return (
    <Layout>
      <h4 className="text-center mt-5 bm-3">{pageTitle}</h4>
      <div className="text-center mt-5 bm-3">
        <a href="/auth/sign-up" className="btn btn-outline-warning">
          Need a new account? Sign Up
        </a>
      </div>

      <form className="row align-items-center " action="/signin" method="POST">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="form-control"
            id="password"
          />
        </div>

        <ul className="list-group list-group-numbered  mt-3">
          <li className="list-group-item list-group-item-danger">
            Email is invalid
          </li>
          <li className="list-group-item list-group-item-danger">
            Email or password invalid
          </li>
        </ul>

        <button type="submit" className="btn btn-primary mb-3 mt-3">
          SignIn
        </button>
        <div className="btn btn-outline-dark " id="google-oauth-btn">
          <img
            src="https://www.shareicon.net/data/2016/07/10/119930_google_512x512.png"
            alt="google icon"
            width={24}
            className="mx-1"
          />
          SignIn With Google
        </div>
      </form>
    </Layout>
  );
};

export default SignInPage;
