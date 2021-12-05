const database = require("../database/models");
const pick = require("lodash/pick");
const isEmpty = require("lodash/isEmpty");
const isNull = require("lodash/isNull");
const { sendValidationEmail } = require("../helpers/emailHelper");
const { Op } = require("sequelize");

const getUserByUserId = async (userId) => {
  return await database.User.findOne({
    attributes: ["id", "name", "status", "email", "createdAt"],
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


const getUserWithThirdPartydBy = async (email) => {
  const userResult = await database.User.findOne({
    where: {
      email,
      [Op.or]: [
        { facebookId: { [Op.ne]: null } },
        { googleId: { [Op.ne]: null } },
      ],
    },
  });

  if (isEmpty(userResult)) {
    throw new Error('user not found');
  }

  return userResult;
};


const getUserWithPasswordBy = async (email) => {
  const userResult = await database.User.findOne({
    where: {
      email,
    },
  });

  return userResult;
};

const parseUserResponse = (userResult) => {
  const userResponse = pick(userResult, [
    "id",
    "name",
    "status",
    "email",
    "createdAt",
  ]);
  return userResponse;
};

const createUser = async (userData) => {
  const {email, googleId, facebookId, name, password } = userData;
  const existUser = await database.User.findOne({ where: { email } });
  if (existUser) throw new Error("使用者已存在");

  const isEmailRegister = isNull(facebookId) && isNull(googleId);
  
  const status = isNull(facebookId) && isNull(googleId)
    ? 0
    : 1;

  userResult = await database.User.create(
    {
      status,
      name,
      email,
      password,
      googleId,
      facebookId,
    });

    if (isEmailRegister) {
      await sendValidationEmail({
        from: 'demo server <demoserver@gmail.com>',
        to: `${name} <${email}>`,
        subject: 'Validate Your Account',
        html: `<a target='_blank' href="${process.env.DOMAIN}/${userResult.id}">Validate Link</a>`,
      });
    }
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
module.exports.getUserWithThirdPartydBy = getUserWithThirdPartydBy;
module.exports.createUser = createUser;
module.exports.updateUserByUserId = updateUserByUserId;
module.exports.validateUser = validateUser;
