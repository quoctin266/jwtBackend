import bcrypt from "bcryptjs";
import db from "../model/index";
import { Op } from "sequelize";
import { getGroupWithRoles } from "./groupService";
import { createJWT } from "../middleware/jwtService";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

const getUsersService = async (page, limit) => {
  if (page && limit) {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.User.findAndCountAll({
      attributes: { exclude: ["password"] },
      include: { model: db.Group, attributes: ["name", "description"] },
      offset: offset,
      limit: limit,
    });

    let totalPages = Math.ceil(count / limit);

    return {
      users: rows,
      totalPages: totalPages,
      totalRows: count,
    };
  } else {
    const users = await db.User.findAll({
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    // const users = await db.User.findOne({
    //   where: { id: 1 },
    //   include: db.Group,
    // });

    // console.log(users.get({ plain: true }));
    return users;
  }
};

const craeteUserService = async (data) => {
  let hashPW = await hashPassword(data.password);

  await db.User.create({
    email: data.email,
    username: data.username,
    password: hashPW,
    phone: data.phone,
    groupId: 2,
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

  let roles = await getGroupWithRoles(user);
  let payload = {
    email: user.email,
    roles,
  };
  let token = createJWT(payload);

  return {
    EC: 0,
    EM: "ok",
    DT: {
      accessToken: token,
      data: roles,
    },
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
