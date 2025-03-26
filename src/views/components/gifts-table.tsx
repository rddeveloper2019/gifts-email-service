import React from "react";

const GiftsTable = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">№1</th>
          <th scope="col">Logo</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-success">
          <th scope="row">1</th>
          <td>
            <img
              src="https://itbook.store/img/books/9781839214110.png"
              alt="gift logo"
              height={100}
              className="mx-1 "
            />
          </td>
          <td>Node js Book</td>
          <td>Node js Book</td>
          <td width={20}>
            <div className="d-flex gap-1">
              <form action="/edit-gift/2346694">
                <button className="btn btn-outline-warning" type="submit">
                  ✎
                </button>
              </form>
              <a
                href="https://www.kampusbiner.com/ebooks/20220724/Node.js%20Design%20Patterns.pdf"
                className="btn btn-outline-success "
                target="_blank"
              >
                👀
              </a>
              <form action="/delete-gift/2346694">
                <button className="btn btn-outline-danger" type="submit">
                  🗑️
                </button>
              </form>
            </div>
          </td>
        </tr>
        <tr className="table-success">
          <th scope="row">2</th>
          <td>
            <img
              src="https://kartinki-life.ru/articles/2018/09/24/krasivye-otkrytki-c-dnem-rozhdeniya-dlya-zhenshhin-chast-19-aya-2.jpg"
              alt="gift logo"
              height={100}
              className="mx-1"
            />
          </td>
          <td>Открытка</td>
          <td>Открытка с поздравлениями</td>
          <td width={20}>
            <div className="d-flex gap-1">
              <form action="/edit-gift/2346694">
                <button className="btn btn-outline-warning" type="submit">
                  ✎
                </button>
              </form>
              <a
                href="https://www.kampusbiner.com/ebooks/20220724/Node.js%20Design%20Patterns.pdf"
                className="btn btn-outline-success "
                target="_blank"
              >
                👀
              </a>
              <form action="/delete-gift/2346694">
                <button className="btn btn-outline-danger" type="submit">
                  🗑️
                </button>
              </form>
            </div>
          </td>
        </tr>
        <tr className="table-success">
          <th scope="row">3</th>
          <td>
            <img
              src="https://itbook.store/img/books/9781839214110.png"
              alt="gift logo"
              height={100}
              className="mx-1"
            />
          </td>
          <td>Node js Book</td>
          <td></td>
          <td width={20}>
            <div className="d-flex gap-1">
              <form action="/edit-gift/2346694">
                <button className="btn btn-outline-warning" type="submit">
                  ✎
                </button>
              </form>
              <a
                href="https://www.kampusbiner.com/ebooks/20220724/Node.js%20Design%20Patterns.pdf"
                className="btn btn-outline-success "
                target="_blank"
              >
                👀
              </a>
              <form action="/delete-gift/2346694">
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

export default GiftsTable;
