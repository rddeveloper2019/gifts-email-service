import GiftForm from "./components/gift-form";
import GiftsTable from "./components/gifts-table";
import NavBar from "./components/nav-bar";
import React from "react";
import Layout from "./layout";
import ToastNotifications from "./components/toast-notifications";

const Links = {
  GIFTS: "gifts",
  MAILINGS: "mailings",
};

const GiftsPage = ({ roomId, messages, gifts }) => {
  return (
    <Layout>
      <NavBar
        options={{
          [Links.MAILINGS]: false,
          [Links.GIFTS]: true,
        }}
      />
      <div className="d-flex align-items-center flex-column mb-3">
        <ToastNotifications roomId={roomId} />
        <GiftForm
          method={"POST"}
          title={"Add a new gift"}
          button={"Add"}
          messages={messages}
        />
        <GiftsTable gifts={gifts} />
      </div>
    </Layout>
  );
};

export default GiftsPage;
