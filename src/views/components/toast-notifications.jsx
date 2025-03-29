import React from "react";

const ToastNotifications = ({ roomId = "" }) => {
  return (
    <>
      <div
        id="toast-notifications"
        className="mt-3 mb-3 d-flex align-items-center flex-column gap-2"
      ></div>
      <div id="roomId" style={{ display: "none" }}>
        {roomId}
      </div>
    </>
  );
};

export default ToastNotifications;
