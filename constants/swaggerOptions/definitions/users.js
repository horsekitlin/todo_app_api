const BasicUser = {
  name: {
    type: 'string',
    required: true,
    description: '使用者名稱',
    default: 'demo001',
  },
  email: {
    type: 'string',
    required: true,
    description: '使用者信箱',
    default: 'demo001@aaa.com',
  },
  password: {
    type: 'string',
    required: true,
    description: '使用者密碼',
    default: 'aA12345678',
  },
  googleId: {
    type: 'string',
    required: false,
    description: '使用者的google Id',
    default: null,
  },
  facebookId: {
    type: 'string',
    required: false,
    description: '使用者的 facebook Id',
    default: null,
  },
};
module.exports = {
  RegisteUser: {
    required: ['name', 'email', 'password'],
    properties: BasicUser,
  },
  User: {
    required: [],
    properties: {
     ...BasicUser,
     createdAt: {
       type: 'string',
       description: '使用者的建立時間戳',
       default: '2021-09-01 11:00:00',
     },
    },
  },
  Users: {
    type: "array",
    $ref: "#/definitions/User",
  },
};