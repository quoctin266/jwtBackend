import bcrypt from "bcryptjs";
import db from "../model/index";
import { raw } from "mysql2";
import { Op } from "sequelize";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

const getUsersService = async () => {
  const users = await db.User.findAll({
    include: db.Group,
    raw: true,
    nest: true,
  });

  console.log(users);
  // const users = await db.User.findOne({
  //   where: { id: 1 },
  //   include: db.Group,
  // });

  // console.log(users.get({ plain: true }));
  return users;
};

const craeteUserService = async (data) => {
  let hashPW = await hashPassword(data.password);

  await db.User.create({
    email: data.email,
    username: data.username,
    password: hashPW,
    phone: data.phone,
  });

  return "ok";
};

const loginService = async (data) => {
  const user = await db.User.findOne({
    where: {
      [Op.or]: [{ email: data.valueLogin }, { phone: data.valueLogin }],
    },
    raw: true,
  });

  if (!user) {
    return {
      EC: -1,
      EM: "user not found",
      DT: null,
    };
  }

  let result = await bcrypt.compare(data.password, user.password);
  if (!result) {
    return {
      EC: -2,
      EM: "wrong password",
      DT: null,
    };
  }

  return {
    EC: 0,
    EM: "ok",
    DT: data,
  };
};

const deleteUserService = async (id) => {
  await db.User.destroy({
    where: {
      id: id,
    },
  });

  return "ok";
};

const updateUserService = async (data) => {
  await db.User.update(
    { firstName: data.firstName, lastName: data.lastName, email: data.email },
    {
      where: {
        id: data.id,
      },
    }
  );

  return "ok";
};

module.exports = {
  hashPassword,
  getUsersService,
  craeteUserService,
  deleteUserService,
  updateUserService,
  loginService,
};
