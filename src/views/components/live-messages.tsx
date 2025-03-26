import React from "react";

const LiveMessages = () => {
  return (
    <div
      id="live-messages"
      className="mt-3 mb-3 d-flex align-items-center flex-column gap-2"
    >
      <div
        className="toast align-items-center text-bg-danger border-0 show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
      </div>
      <div
        className="toast align-items-center text-bg-success border-0 show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
      </div>
    </div>
  );
};

export default LiveMessages;

{
  /* <div
    className="toast align-items-center text-bg-primary border-0"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    >
    <div className="d-flex">
    <div className="toast-body">Hello, world! This is a toast message.</div>
    <button
        type="button"
        className="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
    >

    </button>
</div> */
}
