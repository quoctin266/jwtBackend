import {
  getUsersService,
  craeteUserService,
  deleteUserService,
  updateUserService,
} from "../service/userService";

const getAllUsers = async (req, res) => {
  let users = await getUsersService();
  res.status(200).json({
    data: users,
  });
};

const postCreateUser = async (req, res) => {
  let result = await craeteUserService(req.body);

  res.status(200).json({
    data: result,
  });
};

const deleteUser = async (req, res) => {
  let id = req.body.id;

  let result = await deleteUserService(id);

  res.status(200).json({
    data: result,
  });
};

const putUpdateUser = async (req, res) => {
  let result = await updateUserService(req.body);

  res.status(200).json({
    data: result,
  });
};

module.exports = {
  getAllUsers,
  postCreateUser,
  deleteUser,
  putUpdateUser,
};
