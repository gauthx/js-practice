function createColumns() {
  const noOfCols = parseInt(prompt("Enter no. of columns in the: "), 10);

  const columnNames = [];
  for (let colCount = 1; colCount <= noOfCols; colCount++) {
    const colName = prompt(`Enter name of column${colCount}`);
    columnNames.push(colName);
  }
  return columnNames;
}

function editRow(row) {
  const rowNo = prompt("Which row no to edit")
  const colNo = prompt("Which column to edit");

  const data = prompt("Enter new data");

  row[rowNo][colNo] = data;

  return row;

}

function headerSeperator(longest) {
  let separator = "";
  for (let index = 0; index < longest.length; index++) {
    const dashCount = longest[index];
    const firstDash = index === 0 ? "|" : "";

    separator += firstDash + "-".repeat(dashCount) + "|";
  }

  console.log(separator);
}

function padData(data, length) {
  const dataLength = data.length;
  const padLength = (length - dataLength) / 2;

  let padded = data.padStart(dataLength + padLength, " ");

  padded = padded.padEnd(dataLength + padLength * 2, " ");

  return padded;
}

function longestDataInCol(rows, colNo) {
  let longest = 0;
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const currentCelldataLength = (rows[rowIndex][colNo]).length;

    if (currentCelldataLength > longest) {
      longest = currentCelldataLength;
    }
  }

  return longest;
}

function longestDatainEachCol(rows, cols) {
  const longestDatArr = [];
  for (let colCount = 0; colCount < cols.length; colCount++) {
    const longest = longestDataInCol(rows, colCount);
    longestDatArr.push(longest);
  }

  return isColHeaderLongest(cols, longestDatArr);
}

function isColHeaderLongest(cols, longest) {
  const longestDatArr = []
  for (let colCount = 0; colCount < cols.length; colCount++) {
    const largerNumber = cols[colCount].length > longest[colCount] ? cols[colCount].length : longest[colCount];
    longestDatArr.push(largerNumber);
  }
  return longestDatArr;
}

function sumOfElements(array) {
  let sum = 0;
  for (let index = 0; index < array.length; index++) {
    sum += array[index];
  }

  return sum;
}

function printColumns(cols, longest) {
  let colHeaders = "";
  for (let colCount = 0; colCount < cols.length; colCount++) {
    const firstDash = colCount === 0 ? "|" : "";
    colHeaders += firstDash + padData(cols[colCount], longest[colCount]) + "|"

  }
  console.log(colHeaders);
}
function viewTable(cols, rows) {
  const longest = longestDatainEachCol(rows, cols);
  const dashes = "-".repeat(sumOfElements(longest) + cols.length)
  console.log(dashes);

  printColumns(cols, longest);
  headerSeperator(longest);

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    let rowData = "";
    const currentRow = rows[rowIndex];

    for (let colCount = 0; colCount < cols.length; colCount++) {
      const firstDash = colCount === 0 ? "|" : "";
      const currentCol = currentRow[colCount];
      rowData += firstDash + padData(currentCol, longest[colCount]) + "|";
    }

    console.log(rowData);
  }
  console.log(dashes);


}

function selectOption() {
  console.log(`${"–".repeat(18)}\n1. Add a new row
2. Modify existing row
3. View table
4. Exit`)
  const selectedOption = parseInt(prompt("Enter your option : "), 10);
  return selectedOption;
}

function createRows(rows, noOfCols) {
  const rowData = [];

  for (let colCount = 0; colCount < noOfCols; colCount++) {
    const cellData = prompt("Enter data for row");
    rowData.push(cellData);
  }
  rows.push(rowData);
  return rows;
}

function isInvalidNumber(number) {
  const isNaN = number + "" === "NaN";
  const isInvalid = typeof number !== "number" || isNaN;

  return isInvalid;
}

function columnSize(array) {
  let size = 0;
  for (let index = 0; index < array.length; index++) {
    size += array[index].length;
  }
  return size;
}

function displayDescription() {
  console.log("This program creates a simple table. You can use it to create md table \n");
}

function main() {

  displayDescription();

  let rows = [];

  let columnHeaders = createColumns();

  while (true) {
    const selectedOption = selectOption();
    switch (selectedOption) {
      case 1:
        rows = createRows(rows, columnHeaders.length);
        break;
      case 2:
        rows = editRow(rows);
        break;
      case 3:
        viewTable(columnHeaders, rows);
        break;
      case 4:
        return;
      default:
        console.log("Invalid Option");
        break;
    }

  }

}

main();
