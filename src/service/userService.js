import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

module.exports = {
  hashPassword,
};
