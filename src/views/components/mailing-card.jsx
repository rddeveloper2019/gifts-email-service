import React from "react";

const MailingCard = () => {
  return (
    <>
      <div className="card mb-3" style={{ width: "18rem" }}>
        <img
          src="https://itbook.store/img/books/9781839214110.png"
          className="card-img-top"
          alt="gift logo"
        />
        <div className="card-body">
          <h5 className="card-title">Recipient email</h5>
          <p className="card-text">Mark@kfd.ro</p>

          <h5 className="card-title">Date of receipt</h5>
          <p className="card-text">02.02.2025</p>

          <h5 className="card-title">Message for Recipient</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>

          <h5 className="card-title">Status</h5>
          <p className="card-text p-3  rounded success">Sent</p>
        </div>
      </div>
    </>
  );
};

export default MailingCard;
