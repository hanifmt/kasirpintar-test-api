const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("./config");

exports.validation = {
  /**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
  isEmpty(input) {
    if (input === undefined || input === "") {
      return true;
    }
    if (input.replace(/\s/g, "").length) {
      return false;
    }
    return true;
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * Gnerate Token
   * @param {string} id
   * @param {string} role
   * @param {string} area_id
   * @returns {string} token
   */
  generateToken(email, role) {
    const token = jwt.sign(
      {
        email: email,
        role: role,
      },
      config.secret,
      { expiresIn: "1d" }
    );
    return token;
  },

  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  verifyToken(req, res, next) {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader) {
      return res.status(400).send({ message: "Token is not provided" });
    }

    if (tokenHeader.split(" ")[0] !== "Bearer") {
      return res.status(500).send({
        auth: false,
        message: "Error",
        errors: "Incorrect token format",
      });
    }

    let token = tokenHeader.split(" ")[1];

    if (!token) {
      return res.status(403).send({
        auth: false,
        message: "Error",
        errors: "No token provided",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: "Error",
          errors: err,
        });
      }
      req.userId = decoded.id;
      next();
    });
  },
};
