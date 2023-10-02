import {
  getUsersService,
  craeteUserService,
  deleteUserService,
  updateUserService,
  loginService,
} from "../service/userService";

const getAllUsers = async (req, res) => {
  const { page, limit } = req.query;

  let users = await getUsersService(+page, +limit);

  res.status(200).json({
    DT: users,
    EC: 0,
    EM: "ok",
  });
};

const postCreateUser = async (req, res) => {
  let result = await craeteUserService(req.body);

  res.status(200).json({
    data: result,
  });
};

const postLogin = async (req, res) => {
  let result = await loginService(req.body);

  if (result.DT?.accessToken) {
    res.cookie("jwt", result.DT.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
  }

  res.status(200).json(result);
};

const deleteUser = async (req, res) => {
  let id = req.body.id;

  await deleteUserService(id);

  res.status(200).json({
    DT: null,
    EC: 0,
    EM: "ok",
  });
};

const putUpdateUser = async (req, res) => {
  let result = await updateUserService(req.body);

  res.status(200).json({
    data: result,
  });
};

const getUserAccount = async (req, res) => {
  console.log(req.user);
};

module.exports = {
  getAllUsers,
  postCreateUser,
  deleteUser,
  putUpdateUser,
  postLogin,
  getUserAccount,
};
