const database = require("../database/models");
const pick = require("lodash/pick");
const { isEmpty } = require("lodash-es");

const getUserByUserId = async (userId) => {
  return await database.User.findOne({
    attributes: ["id", "name", "phone", "email", "createdAt"],
    where: {
      id: userId,
    },
  });
};

const updateUserByUserId = async (userId, query) => {
  const user = await getUserByUserId(userId);

  if(query.name) {
    user.name = query.name;
  }

  if(query.email) {
    user.email = query.email;
  }

  await user.save();
  return user;
};

const getUserWithPasswordBy = async (phone) => {
  const userResult = await database.User.findOne({
    where: {
      phone,
    },
  });

  return userResult;
};

const parseUserResponse = (userResult) => {
  const userResponse = pick(userResult, [
    "id",
    "phone",
    "email",
    "createAt",
  ]);
  return userResponse;
};

const createUser = async (userData) => {
  const existUser = await database.User.findOne({ where: {phone: userData.phone} });
  if (existUser) throw new Error("使用者已存在");

  const userResult = await database.User.create(
    {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
    });

  return {
    id: userResult.id,
    createdAt: userResult.createdAt,
    ...userData,
  };
};

const validateUser = async (userId) => {
  const userResult = await database.User.findOne({
    id: userId,
  });

  if (isEmpty(userResult)) {
    throw new Error('使用者不存在');
  }

  if (userResult.status === 0) {
    userResult.status = 1;
    await userResult.save();
  }
};

module.exports.parseUserResponse = parseUserResponse;
module.exports.getUserByUserId = getUserByUserId;
module.exports.getUserWithPasswordBy = getUserWithPasswordBy;
module.exports.createUser = createUser;
module.exports.updateUserByUserId = updateUserByUserId;
module.exports.validateUser = validateUser;
