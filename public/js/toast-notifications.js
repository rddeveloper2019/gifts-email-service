const socket = io();

const messages = document.querySelector("#toast-notifications");

const generateToast = ({ type = "success", body = "" }) => {
  return `
  <div class="toast align-items-center text-bg-${type} border-0 show">
    <div class="d-flex">
        <div class="toast-body">${body}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
            aria-label="Close"></button>
    </div>
  </div>`;
};

const subscribe = () => {
  socket.on("message", ({ data }) => {
    const { type, body } = JSON.parse(data);

    messages.innerHTML += generateToast({ type, body });
  });
};

socket.on("init", subscribe);
