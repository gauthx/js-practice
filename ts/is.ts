const isString = (test: any): test is String => typeof test === "string";

const example = (foo: string | number) => {
  if (isString(foo)) {
    console.log("it is a string" + foo);
    console.log(foo.length);
    return;
  }
  console.log(foo.toString());
};

example("Apple");
example(2);

const identity = <Type>(x: Type): Type => x;

identity<string>("Hello")
