import GiftCard from "./components/gift-card";
import GiftForm from "./components/gift-form";
import LiveMessages from "./components/live-messages";
import NavBar from "./components/nav-bar";
import React from "react";

const EditGiftPage = () => {
  return (
    <>
      <NavBar />
      <div className="d-flex align-items-center flex-column mb-3">
        <LiveMessages />
        <GiftCard />
        <GiftForm method={"PUT"} title={"Edit gift"} button={"Save"} />
      </div>
    </>
  );
};

export default EditGiftPage;
