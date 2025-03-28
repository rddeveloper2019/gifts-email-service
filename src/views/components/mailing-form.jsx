import React from "react";

const MailningForm = ({ method, button, title }) => {
  return (
    <div className="accordion  mb-3 w-100 success" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {title}
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <ul className="list-group list-group-numbered  mt-3">
            <li className="list-group-item list-group-item-danger">
              Email is invalid
            </li>
            <li className="list-group-item list-group-item-danger">
              Gift cannot be empty
            </li>
            <li className="list-group-item list-group-item-danger">
              Date cannot be empty
            </li>
          </ul>
          <form
            className="row align-items-center mt-3"
            action="/gift-form"
            method={method}
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Recipient email
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
              <label htmlFor="gift" className="form-label">
                Gift
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="gift"
                required
                id="gift"
              >
                <option>Open this select menu</option>
                <option value="1">
                  Node js Book
                  {": "}
                  Node js Book Description dwfef feofe fefekefe epfpef
                  lfepjfpefe
                </option>
                <option value="2">
                  Node js Book
                  {": "}
                  Node js Book Description dwfef feofe fefekefe epfpef
                  lfepjfpefe
                </option>
                <option value="3">
                  Node js Book
                  {": "}
                  Node js Book Description dwfef feofe fefekefe epfpef
                  lfepjfpefe
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="form-control"
                id="date"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message for Recipient
              </label>
              <textarea name="message" className="form-control" id="message" />
            </div>
            <button type="submit" className="btn btn-primary mb-3 mt-3">
              {button}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MailningForm;
