const myWord = "malayalam"

let countOfVowels = 0;

for(let index = 0; index <= myWord.length ; index++) {
    if(myWord[index]=== "a" || myWord[index] === "e" || myWord[index] === "i" || myWord[index] === "o" || myWord[index] === "u") {
        countOfVowels = countOfVowels + 1;
    }
}

console.log("Number of vowels in",myWord,"is",count);
