import React from "react";
import Layout from "./layout";

const SignUpPage = ({ pageTitle, messages = [] }) => {
  return (
    <Layout>
      <h4 className="text-center mt-5 bm-3">{pageTitle}</h4>
      <form
        className="row align-items-center "
        action="/auth/sign-up"
        method="POST"
      >
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
            className="form-control"
            id="password"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordConfirm" className="form-label">
            Repeat Password
          </label>
          <input
            name="passwordConfirm"
            type="password"
            className="form-control"
            id="passwordConfirm"
          />
        </div>

        <ul className="list-group list-group-numbered  mt-3">
          {messages.map((message, idx) => {
            return (
              <li key={idx} className="list-group-item list-group-item-danger">
                {message}
              </li>
            );
          })}
        </ul>

        <button type="submit" className="btn btn-primary mb-3 mt-3">
          SignUp
        </button>
      </form>
    </Layout>
  );
};

export default SignUpPage;
