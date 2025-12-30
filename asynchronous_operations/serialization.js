const p1 = new Promise((res) => res(21));
p1.then((x) => console.log(x, "first chain")).then(() =>
	console.log("second chain ")
);

const p2 = new Promise(() => 21);
p1.then((x) => console.log(x, "first chain")).then(() =>
	console.log("second chain ")
);
