import React from "react";

const GiftForm = ({ method, title, button, messages = [] }) => {
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
            {messages.map((message, idx) => {
              return (
                <li
                  key={idx}
                  className="list-group-item list-group-item-danger"
                >
                  {message}
                </li>
              );
            })}
          </ul>
          <form
            className="row align-items-center mt-3"
            action="/gifts/gift-form"
            method={method}
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="logo" className="form-label">
                Logo (url)
              </label>
              <input
                type="text"
                name="logo"
                className="form-control"
                id="logo"
                aria-describedby="logolHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Gift Title
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                id="title"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                File
              </label>
              <input
                name="file"
                type="file"
                className="form-control"
                id="file"
                required
                accept="image/png, image/jpeg, image/jpg, image/bmp, application/pdf"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                className="form-control"
                id="description"
              />
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

export default GiftForm;
