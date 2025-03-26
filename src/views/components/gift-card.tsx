import React from "react";

const GiftCard = () => {
  return (
    <>
      <div className="card mb-3" style={{ width: "18rem" }}>
        <img
          src="https://itbook.store/img/books/9781839214110.png"
          className="card-img-top"
          alt="gift logo"
        />
        <div className="card-body">
          <h5 className="card-title">Node Js</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>

          <a
            href="https://www.kampusbiner.com/ebooks/20220724/Node.js%20Design%20Patterns.pdf"
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
