const number = 100;
let divident = 1;

console.log("Factors of",number,"are : ")

while(divident <= number) {
    if(number % divident === 0 ) {
        console.log(divident);
    }
    divident = divident + 1;
}
