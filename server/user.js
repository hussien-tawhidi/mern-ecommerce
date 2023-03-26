import bcrypt from "bcryptjs";

export const userData = [
  {
    name: "test",
    email: "text@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "ali",
    email: "ali@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];
