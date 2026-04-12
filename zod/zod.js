import { cpSync } from "node:fs";
import * as z from "zod";

const UserSchema = z.object({
  name: z.string("You must be a string"),
  age: z.number(),
});

const validateUser = (user) => {
  try {
    
    const data = UserSchema.parse(user);

    console.log(data.name);
  } catch (e) {
    console.log(e);
  }
};

validateUser({ name: 1, age: 20 });
validateUser({ name: "Jana", age: "20" });
validateUser({ name: "Jana", age: 10 });
