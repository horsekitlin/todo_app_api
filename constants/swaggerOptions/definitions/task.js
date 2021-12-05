const BaskTask = {
  title: {
    type: 'string',
    description: '任務抬頭',
    default: 'title'
  },
  status: {
    type: 'number',
    enums: [0, 1],
    description: '任務狀態: 0: 未完成, 1: 已完成',
    default: 0
  },
};

module.exports = {
  CreateTask: {
    properties: {
      title: {
        type: 'string',
        description: '任務抬頭',
        default: 'title'
      },
    },
  },
  Task: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: '任務的 Id',
        default: 1,
      },
      ...BaskTask,
      user: {
        type: 'object',
        $ref: "#/definitions/RefrenceUser",
      },
      createdAt: {
        type: 'string',
        description: '使用者的建立時間戳',
        default: '2021-12-05T07:38:21.759Z',
      },
    },    
  },
  Tasks: {
    type: "array",
    $ref: "#/definitions/Task",
  },
};