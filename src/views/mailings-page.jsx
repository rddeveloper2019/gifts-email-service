import NavBar from "./components/nav-bar";
import UnverifiedEmailNotification from "./components/unverified-email-notification";
import React from "react";
import MailingsTable from "./components/mailnings-table";
import MailningForm from "./components/mailing-form";
import Pagination from "./components/pagination";
import ToastNotifications from "./components/toast-notifications";
import Layout from "./layout";

const Links = {
  GIFTS: "gifts",
  MAILINGS: "mailings",
};
const MailnigsPage = ({ roomId }) => {
  return (
    <Layout>
      <NavBar
        options={{
          [Links.MAILINGS]: true,
          [Links.GIFTS]: false,
        }}
      />

      <div className="d-flex align-items-center flex-column mb-3">
        <ToastNotifications roomId={roomId} />
        {/* <UnverifiedEmailNotification /> */}
        <MailningForm
          method={"POST"}
          button={"Create"}
          title={"Create a gift emailing"}
        />
        <MailingsTable />
        <Pagination />
      </div>
    </Layout>
  );
};

export default MailnigsPage;
