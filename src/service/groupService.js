import db from "../model/index";

const getGroupWithRoles = async (user) => {
  let roles = await db.Group.findOne({
    where: { id: user.GroupId },
    attributes: ["id", "name", "description"],
    include: {
      model: db.Role,
      through: { attributes: [] },
      attributes: ["id", "url", "description"],
    },
  });

  return roles;
};

module.exports = {
  getGroupWithRoles,
};
