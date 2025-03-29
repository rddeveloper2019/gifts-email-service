import React from "react";
import Layout from "./layout";

const ErrorPage = ({ pageTitle, messages = [], statusCode }) => {
  return (
    <Layout>
      <div className="d-flex align-items-center flex-column mt-3 mb-3 text-danger">
        <h2>{pageTitle}</h2>
        <ul className="list-group">
          {messages.map((message, idx) => {
            return (
              <li key={idx} className="list-group-item list-group-item-danger">
                {message}
              </li>
            );
          })}
        </ul>

        <h4>{statusCode}</h4>
        <a href="/">Back</a>
      </div>
    </Layout>
  );
};

export default ErrorPage;
