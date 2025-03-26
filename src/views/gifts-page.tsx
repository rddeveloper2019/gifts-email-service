import GiftForm from "./components/gift-form";
import GiftsTable from "./components/gifts-table";
import LiveMessages from "./components/live-messages";
import NavBar from "./components/nav-bar";
import Pagination from "./components/pagination";
import UnverifiedEmailNotification from "./components/unverified-email-notification";
import React from "react";
import { Links } from "./enums";

const GiftsPage = () => {
  return (
    <>
      <NavBar
        options={{
          [Links.MAILINGS]: false,
          [Links.GIFTS]: true,
        }}
      />

      <div className="d-flex align-items-center flex-column mb-3">
        <LiveMessages />
        <UnverifiedEmailNotification />
        <GiftForm method={"POST"} title={"Add a new gift"} button={"Add"} />
        <GiftsTable />
        <Pagination />
      </div>
    </>
  );
};

export default GiftsPage;
