import React from "react";

const GiftsTable = ({ gifts = [] }) => {
  if (!gifts.length) {
    return null;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">№1</th>
          <th scope="col">Logo</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {gifts.map((gift, idx) => {
          return (
            <tr className="table-success" key={gift.name}>
              <th scope="row">{idx + 1}</th>
              <td>
                <img
                  src={gift.logo || "/files/gift.png"}
                  alt="gift logo"
                  height={100}
                  className="mx-1 "
                />
              </td>
              <td>{gift.title}</td>
              <td>{gift.description}</td>
              <td width={20}>
                <div className="d-flex gap-1">
                  <form action={`/edit-gift/${gift.id}`}>
                    <button className="btn btn-outline-warning" type="submit">
                      ✎
                    </button>
                  </form>
                  <a
                    href={`/files/${gift.name}`}
                    className="btn btn-outline-success "
                    target="_blank"
                  >
                    👀
                  </a>
                  <form
                    action={`/gifts/${gift.id}?_method=DELETE`}
                    method="POST"
                  >
                    <button className="btn btn-outline-danger" type="submit">
                      🗑️
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GiftsTable;
