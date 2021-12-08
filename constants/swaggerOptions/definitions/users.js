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
    default: 'aA$12345678',
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
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: BasicUser,
  },
  RefrenceUser: {
    type: 'object',
    required: [],
    properties: {
      id: {
        type: 'number',
        description: '使用者的 Id',
        default: 1,
      },
      ...BasicUser,
      password: undefined,
     facebookId: undefined,
     googleId: undefined,
    },
  },
  User: {
    required: [],
    properties: {
      id: {
        type: 'number',
        description: '使用者的 Id',
        default: 1,
      },
     ...BasicUser,
     status: {
      type: 'number',
      description: '使用者的 狀態: 0: 未驗證, 1: 已驗證',
      default: 1,
    },
     password: undefined,
     facebookId: undefined,
     googleId: undefined,
     createdAt: {
       type: 'string',
       description: '使用者的建立時間戳',
       default: '2021-12-05T07:38:21.759Z',
     },
    },
  },
  Users: {
    type: "array",
    $ref: "#/definitions/User",
  },
};