const stringToBeReversed = "radiant";
const startingIndexOfString = 0;

let reversedString = ""

let endingIndexOfString = stringToBeReversed.length - 1;

while(endingIndexOfString >= startingIndexOfString) {
    reversedString = reversedString + stringToBeReversed[endingIndexOfString];
    endingIndexOfString-- ;
}

console.log("Reverse of ",stringToBeReversed,"is",reversedString);
