const { validation } = require("../configs/helper");

exports.credential = [
  {
    email: "user@mail.com",
    password: validation.hashPassword("user"),
    role: "user",
  },
  {
    email: "admin@mail.com",
    password: validation.hashPassword("admin"),
    role: "admin",
  },
];
