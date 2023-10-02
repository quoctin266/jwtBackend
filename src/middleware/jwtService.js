import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = ["/", "/login"];

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

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyJWT(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        DT: null,
        EC: -1,
        EM: "unauthenticated",
      });
    }
  } else {
    return res.status(401).json({
      DT: null,
      EC: -1,
      EM: "unauthenticated",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();

  if (req.user) {
    let roles = req.user.roles.Roles;
    let email = req.user.email;
    let cuurentPath = req.path;

    let canAccess = roles.some((item) => item.url === cuurentPath);
    if (canAccess) next();
    else {
      return res.status(403).json({
        DT: null,
        EC: -1,
        EM: "forbidden",
      });
    }
  }
};

module.exports = {
  createJWT,
  verifyJWT,
  checkUserJWT,
  checkUserPermission,
};
