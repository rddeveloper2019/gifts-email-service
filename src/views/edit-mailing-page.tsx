import LiveMessages from "./components/live-messages";
import NavBar from "./components/nav-bar";
import React from "react";
import MailningForm from "./components/mailing-form";
import MailingCard from "./components/mailing-card";

const EditMailingPage = () => {
  return (
    <>
      <NavBar />
      <div className="d-flex align-items-center flex-column mb-3">
        <LiveMessages />
        <MailingCard />
        <MailningForm method={"PUT"} button={"Save"} title={"Edit mailing"} />
      </div>
    </>
  );
};

export default EditMailingPage;
