import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = (payload) => {
  let token = null;
  try {
    token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (e) {
    console.log(e);
  }

  return token;
};

const verifyJWT = (token) => {
  let data = null;
  try {
    data = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
  }

  return data;
};

module.exports = {
  createJWT,
  verifyJWT,
};
