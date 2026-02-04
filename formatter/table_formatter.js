const formatTag = (tag, data) => `<${tag}>${data}</${tag}>`;

const formatRow = (row, tag) => {
  const cells = row.match(/\b\w+\b/g);
  return cells.map((cell) => formatTag(tag, cell)).join("");
};

const format = (text) => {
  const [header, ...rows] = text.split("\n");
  const formattedHeader = formatTag("tr", formatRow(header, "th"));
  const tableContents = formattedHeader +
    rows.map((row) => formatTag("tr", formatRow(row, "td") + "\n")).join("");

  return formatTag("table", tableContents);
};

const main = () => {
  console.log(
    "This program wraps text in a html table\nAssumes first line as header",
  );
  const text = prompt("Enter text:");
  console.clear();
  console.log(format(text.trim()));
};

main();
