import React from "react";

const MailingsTable = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">№1</th>
          <th scope="col">Recipient email</th>
          <th scope="col">Gift</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-success">
          <th scope="row">1</th>
          <td>Mark@kfd.ro</td>
          <td>
            <img
              src="https://itbook.store/img/books/9781839214110.png"
              alt="gift logo"
              height={40}
              className="mx-1"
            />
            <span>Node js Book</span>
          </td>
          <td>02.02.2025</td>
          <td>Sent</td>
          <td width={20}>
            <div className="d-flex gap-1">
              <form action="/edit-mailing/2346694">
                <button className="btn btn-outline-warning" type="submit">
                  ✎
                </button>
              </form>
              <form action="/delete-mailing/2346694">
                <button className="btn btn-outline-danger" type="submit">
                  🗑️
                </button>
              </form>
            </div>
          </td>
        </tr>
        <tr className="table-warning">
          <th scope="row">2</th>
          <td>Mark@kfd.ro</td>
          <td>
            <img
              src="https://itbook.store/img/books/9781839214110.png"
              alt="gift logo"
              height={40}
              className="mx-1"
            />
            <span>Node js Book</span>
          </td>
          <td>02.12.2025</td>
          <td>On Time</td>
          <td width={20}>
            <div className="d-flex gap-1">
              <form action="/edit-mailing/2346694">
                <button className="btn btn-outline-warning" type="submit">
                  ✎
                </button>
              </form>
              <form action="/delete-mailing/2346694">
                <button className="btn btn-outline-danger" type="submit">
                  🗑️
                </button>
              </form>
            </div>
          </td>
        </tr>
        <tr className="table-warning">
          <th scope="row">3</th>
          <td>Mark@kfd.ro</td>
          <td>
            <img
              src="https://itbook.store/img/books/9781839214110.png"
              alt="gift logo"
              height={40}
              className="mx-1"
            />
            <span>Node js Book</span>
          </td>
          <td>02.11.2025</td>
          <td>On Time</td>
          <td width={20}>
            <div className="d-flex gap-1">
              <form action="/edit-mailing/2346694">
                <button className="btn btn-outline-warning" type="submit">
                  ✎
                </button>
              </form>
              <form action="/delete-mailing/2346694">
                <button className="btn btn-outline-danger" type="submit">
                  🗑️
                </button>
              </form>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MailingsTable;
