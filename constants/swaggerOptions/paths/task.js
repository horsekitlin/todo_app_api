module.exports = {
  '/tasks': {
    get: {
      tags: ["任務"],
      summary: "任務列表",
      description: "任務列表",
      operationId: "getTasks",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [],
      security: [
        {
          ApiKeyAuth: [],
        },
      ],
      responses: {
        400: {
          description: "Invalid input",
        },
        200: {
          description: "OK",
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                default: true,
              },
              data: {
                type: 'object',
                $ref: "#/definitions/Tasks",
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["任務"],
      summary: "新增任務",
      description: "新增任務",
      operationId: "createTask",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "data",
          description: "Task Information",
          required: true,
          schema: {
            type: "object",
            $ref: "#/definitions/CreateTask",
          },
        },
      ],
      security: [
        {
          ApiKeyAuth: [],
        },
      ],
      responses: {
        200: {
          description: "OK",
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                default: true,
              },
              data: {
                type: 'object',
                $ref: "#/definitions/Task",
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["任務"],
      summary: "編輯任務",
      description: "編輯任務",
      operationId: "updateTask",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "data",
          description: "Task Information",
          required: true,
          schema: {
            type: "object",
            properties: {
              status: {
                type: 'number',
                description: '任務狀態',
                default: 0,
              },
            },
          },
        },
      ],
      security: [
        {
          ApiKeyAuth: [],
        },
      ],
      responses: {
        200: {
          description: "OK",
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                default: true,
              },
              data: {
                type: 'object',
                $ref: "#/definitions/Task",
              },
            },
          },
        },
      },
    },
  },
};