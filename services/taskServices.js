const database = require("../database/models");

const getTasks = async (whereCondition = {}) => {
  const tasksResult = await database.Task.findAll({
    include: [
      {
        as: 'user',
        model: database.User,
        attributes: ['id', 'email', 'name'],
       },
    ],
    where: whereCondition,
  });

  return tasksResult;
};

module.exports.getTasks = getTasks;
