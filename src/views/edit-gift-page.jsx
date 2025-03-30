import GiftCard from "./components/gift-card";
import GiftForm from "./components/gift-form";
import NavBar from "./components/nav-bar";
import React from "react";
import ToastNotifications from "./components/toast-notifications";
import Layout from "./layout";

const EditGiftPage = ({ gift }) => {
  return (
    <Layout>
      <NavBar />
      <div className="d-flex align-items-center flex-column mb-3">
        <ToastNotifications />
        <GiftCard gift={gift} />
        <GiftForm
          method={"POST"}
          title={"Edit gift"}
          button={"Save"}
          action={`/gifts/${gift.id}?_method=PATCH`}
          gift={gift}
        />
      </div>
    </Layout>
  );
};

export default EditGiftPage;
