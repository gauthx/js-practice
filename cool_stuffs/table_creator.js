function createColumns() {
  let isColNoConfirmed = false;
  let noOfCols;
  while (!isColNoConfirmed) {
    noOfCols = parseInt(prompt("Enter no. of columns required for your table: "), 10);
    isColNoConfirmed = confirm(`Are you sure you need only ${noOfCols} columns`);
  }

  const columnNames = [];
  for (let colCount = 1; colCount <= noOfCols; colCount++) {
    const colName = prompt(`Enter name of column${colCount}:`);
    columnNames.push(colName);
  }
  return columnNames;
}

function isInvalidCell(col, row, colRange, rowRange, data) {
  const isUndefined = data === undefined;
  const isInvalidColRange = col < 0 || col > colRange;
  const isInvalidRowRange = row < 0 || row > rowRange;

  return isUndefined || isInvalidColRange || isInvalidRowRange;
}

function editRow(rows, cols) {
  let isInvalidInput = true;

  let rowNo, colNo, data;

  while (isInvalidInput) {
    rowNo = parseInt(prompt(`Enter row no to edit(0-${rows.length - 1}):`), 10);
    colNo = parseInt(prompt(`Enter column to edit:(0-${cols.length - 1}):`), 10);
    data = prompt("Enter new data");

    isInvalidInput = isInvalidCell(colNo, rowNo, cols.length, rows.length, data);
  }

  rows[rowNo][colNo] = data;

  return rows;

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

function longestLenInCol(rows, colNo) {
  let longest = 0;
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const currentCelldataLength = (rows[rowIndex][colNo]).length;

    if (currentCelldataLength > longest) {
      longest = currentCelldataLength;
    }
  }

  return longest;
}

function isColHeaderLongest(cols, longest) {
  const longestDatArr = []
  for (let colCount = 0; colCount < cols.length; colCount++) {
    const largerNumber = cols[colCount].length > longest[colCount] ? cols[colCount].length : longest[colCount];
    longestDatArr.push(largerNumber);
  }
  return longestDatArr;
}

function longestLeninEachCol(rows, cols) {
  const longestDatArr = [];
  for (let colCount = 0; colCount < cols.length; colCount++) {
    const longest = longestLenInCol(rows, colCount);
    longestDatArr.push(longest);
  }

  return isColHeaderLongest(cols, longestDatArr);
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
  const longest = longestLeninEachCol(rows, cols);
  const dashes = "-".repeat(sumOfElements(longest) + cols.length)

  console.log("\n");

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
    console.log("\n");

}

function selectOption() {
  console.log(`${"–".repeat(18)}\n1. Add a new row
2. Modify existing row
3. View table
4. Exit\n`)
  const selectedOption = parseInt(prompt("Enter your option : "), 10);
  return selectedOption;
}

function createRows(rows, colHeaders) {
  const rowData = [];
  const noOfCols = colHeaders.length;

  for (let colCount = 0; colCount < noOfCols; colCount++) {
    const cellData = prompt(`Enter data for ${colHeaders[colCount]}:`);
    rowData.push(cellData);
  }
  rows.push(rowData);
  return rows;
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
  // let rows = [["1","apple"],["2","banana"]];
  // let columnHeaders=["no","item"]
  let columnHeaders = createColumns();

  while (true) {
    const selectedOption = selectOption();
    switch (selectedOption) {
      case 1:
        rows = createRows(rows, columnHeaders);
        break;
      case 2:
        rows = editRow(rows, columnHeaders);
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
