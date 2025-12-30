const p = new Promise((res)=> {
	console.log("inside executor");
	res(20);
	console.log("inside executor after resolve statement");
}).then(x=> console.log(x));
console.log("when will this execute");
