const { validation } = require("../configs/helper");
const { credential } = require("../configs/credential");

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (validation.isEmpty(email) || validation.isEmpty(password)) {
    return res.status(400).send({ message: "Some values are missing" });
  }

  if (!validation.isValidEmail(email)) {
    return res
      .status(400)
      .send({ message: "Please enter a valid email address" });
  }

  let data = {
    email: "",
    role: "",
    emailValidation: false,
    passwordValidation: false,
  };

  for (const crd of credential) {
    if (crd.email == email) {
      data.emailValidation = true;
      if (validation.comparePassword(crd.password, password)) {
        data.passwordValidation = true;
        data.email = crd.email;
        data.role = crd.role;
      }
    }
  }

  if (!data.emailValidation) {
    return res.status(404).send({ message: "Email is not found" });
  }

  if (!data.passwordValidation) {
    return res
      .status(400)
      .send({ message: "The credentials you provided is incorrect" });
  }

  const token = validation.generateToken(data.email, data.role);

  return res.status(200).send({ token });
};
