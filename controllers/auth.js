const jwt = require("jsonwebtoken");
const config = require("../config/dev");
const joi = require("joi");
const database = require("./database");
const bcrypt = require("bcrypt");

module.exports = {
  login: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      email: joi.string().required().min(6).max(255).email(),
      password: joi.string().required().min(6),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      console.log(error.details[0].message);
      res.status(401).send("Unauthorized");
      return;
    }

    const sql = "SELECT * FROM users WHERE email=?;";

    try {
      const result = await database.query(sql, [value.email]);
      const user = result[0][0];
      const validPassword = await bcrypt.compare(value.password, user.password);
      if (!validPassword) throw "Invalid password";

      const param = { email: value.email };
      const token = jwt.sign(param, config.JWT_SECRET, { expiresIn: "72800s" });

      // todo: use authorization header
      // res
      //     .cookie('access_token', token, {
      //         httpOnly: true,
      //         secure: true,
      //     })
      //     .send('Welcome, you are now logged in.');

      res.json({
        token: token,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } catch (err) {
      console.log(`Error: ${err}`);
      res.status(401).send("Unauthorized");
      return;
    }
  },
};
