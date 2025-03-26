import React from "react";

const UnverifiedEmailNotification = () => {
  return (
    <div className="card text-center mb-3" style={{ width: "18rem" }}>
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/022/353/339/small_2x/3d-mail-email-message-envelope-png.png"
        className="card-img-top"
        alt="verify email image"
      />
      <div className="card-body">
        <h5 className="card-title">Verify your email</h5>
        <p className="card-text">
          You have limited access. Please check and verify your email .
        </p>

        <a href="/send" className="btn btn-dark">
          Send verification email again
        </a>
      </div>
    </div>
  );
};

export default UnverifiedEmailNotification;
