import React from "react";

const GiftCard = ({ gift }) => {
  return (
    <>
      <div className="card mb-3" style={{ width: "18rem" }}>
        <img
          src={gift.logo || "/files/gift.png"}
          className="card-img-top"
          alt="gift logo"
        />
        <div className="card-body">
          <h5 className="card-title">{gift.title}</h5>
          <p className="card-text">{gift.description}</p>

          <a
            href={`/files/${gift.name}`}
            className="btn btn-outline-success "
            target="_blank"
          >
            Download
          </a>
        </div>
      </div>
    </>
  );
};

export default GiftCard;
