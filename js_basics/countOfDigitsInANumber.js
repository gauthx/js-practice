const number = 1235;
let copyOfNumber = number ;
let countOfDigits = 0;

while(copyOfNumber > 0){
    let remainder = copyOfNumber % 10;
    copyOfNumber = (copyOfNumber - remainder) / 10;
    countOfDigits = countOfDigits + 1;
}

console.log("No. of digits in",number,"is",countOfDigits);
