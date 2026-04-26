import * as z from "zod";

const UserSchema = z.object({
  name: z.string("You must be a string"),
  age: z.number(),
});


console.log(typeof UserSchema)
type User = z.infer<typeof UserSchema>

const validateUser = (user: User) => {
  try {
    
    const data = UserSchema.parse(user);

    console.log(data.name);
  } catch (e) {
    // console.log(e);
    console.log(e)
    console.log("Is instance of zod error",e instanceof z.ZodError)
  }
};

try {
  throw new Error("lolllll")
}
catch (e) {
  console.log(e)
}


validateUser({ name: 1, age: 20 });
validateUser({ name: "Jana", age: "20" });
validateUser({ name: "Jana", age: 10 });
