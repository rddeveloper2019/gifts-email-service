import LiveMessages from "./components/live-messages";
import NavBar from "./components/nav-bar";
import UnverifiedEmailNotification from "./components/unverified-email-notification";
import React from "react";
import MailingsTable from "./components/mailnings-table";
import MailningForm from "./components/mailing-form";
import { Links } from "./enums";
import Pagination from "./components/pagination";

const MailnigsPage = () => {
  return (
    <>
      <NavBar
        options={{
          [Links.MAILINGS]: true,
          [Links.GIFTS]: false,
        }}
      />

      <div className="d-flex align-items-center flex-column mb-3">
        <LiveMessages />
        <UnverifiedEmailNotification />
        <MailningForm
          method={"POST"}
          button={"Create"}
          title={"Create a gift emailing"}
        />
        <MailingsTable />
        <Pagination />
      </div>
    </>
  );
};

export default MailnigsPage;
