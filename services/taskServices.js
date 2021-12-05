const isEmpty = require("lodash/isEmpty");
const database = require("../database/models");

const getTask = async (taskId) => {
  const taskResult = await database.Task.findOne({
    include: [
      {
        as: 'user',
        model: database.User,
        attributes: ['id', 'email', 'name'],
       },
    ],
    attributes: ['id', 'createdAt', 'title', 'status'],
    where: { id: taskId },
  });

  return taskResult;
};

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

const createTask = async (userId, task) => {
  const userResult = await database.User.findOne({
    where: {id: userId},
  });

  if (isEmpty(userResult)) {
    throw new Error('使用者不存在');
  }
  const result = await database.Task.create({
    userId,
    title: task.title,
    status: 0,
  });
  return await getTask(result.id);
};

const updateTask = async (taskId, updatedData) => {
  const taskResult = await database.Task.findOne({ where: { id: taskId }});
  if (isEmpty(taskResult)) {
    throw new Error('任務不存在');
  }

  taskResult.status = updatedData.status;
  await taskResult.save();
  return await getTask(taskId);
};

module.exports.getTask = getTask;
module.exports.getTasks = getTasks;
module.exports.createTask = createTask;
module.exports.updateTask = updateTask;
