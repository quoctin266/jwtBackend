import bcrypt from "bcryptjs";
import db from "../model/index";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

const getUsersService = async () => {
  const users = await db.User.findAll();
  return users;
};

const craeteUserService = async (data) => {
  await db.User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  });

  return "ok";
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
};
