const testCase1 = "L ZL Z"
const testCase2 = "ZL"
const testCase3 = "L     Z"
const testCase4 = "L L"
const testCase5 = "Z Z Z"
const testCase6 = "L ZL Z"
const testCase7 = "L ZZ L"
const testCase8 = "Z LL Z"
const testCase9 = " L ZL"
const testCase10 = "L Z LL"
const testCase11 = " "
const testCase12 = " L Z   ZL  Z" 
const testCase13 = " L L   LZ  L" 


const givenString = testCase13
const lengthOfGivenString = givenString.length;

let lastAnimal;
let shortestPath = -1;
let currentPath = 0;
let lastShortestPath = 100;
let currentAnimal;

for(let index = 0 ; index < lengthOfGivenString ; index++) {
    if(givenString[index] === "Z" || givenString[index] === "L") { //animal is found
        currentAnimal = givenString[index];
        if(lastAnimal && currentAnimal !== lastAnimal || currentAnimal === lastAnimal) { //killing happen condition and need to reset path when same animals are found
            if(currentPath < lastShortestPath) { 
                shortestPath = currentPath;
                lastShortestPath = shortestPath;
            }  
            currentPath = 0;
        }
        lastAnimal = currentAnimal;
    }
    else if(lastAnimal && givenString[index] === " ") {
        currentPath++;
    }
    //console.log("Current char",givenString[index],"LastAnimal",lastAnimal,"Current path",currentPath,"Lastshortestpath",lastShortestPath,"Shortest path",shortestPath);
}

console.log("Savannah",givenString,"Shortest path",shortestPath);



