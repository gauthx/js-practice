const createColumns = (...columns) =>
  columns.map((column) => {
    const td = document.createElement("td");
    td.textContent = column;
    return td;
  });

const createTableRows = (players) =>
  players.map(({ name, club, nation }) => {
    const row = document.createElement("tr");
    const tds = createColumns(name, club, nation);

    row.append(...tds);
    return row;
  });

const handleRegister = async (event) => {
  event.preventDefault();
  const form = document.querySelector("#player-data");
  const formData = new FormData(form);
  const playerData = JSON.stringify(Object.fromEntries(formData.entries()));

  const resp = await fetch("/register", {
    method: "post",
    body: playerData,
    headers: { "content-type": "application/json" },
  });

  console.log(resp);
  await createTable();
};

const createTable = async () => {
  const players = await fetch("/all-players").then((resp) => resp.json());
  const tbody = document.querySelector("tbody");
  tbody.querySelectorAll("tr").forEach((tr) => tbody.removeChild(tr));

  const rows = createTableRows(players);
  tbody.append(...rows);
};

window.onload = async () => {
  const registerBtn = document.querySelector("#register");
  await createTable();
  registerBtn.addEventListener("click", handleRegister);
};
