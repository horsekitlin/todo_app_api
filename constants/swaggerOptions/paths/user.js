module.exports = {
  "/validate/email": {
    post: {
      tags: ["使用者"],
      summary: "重新寄送驗證信",
      description: "重新寄送驗證信",
      operationId: "resendValidateEmail",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [],
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
            },
          },
        },
      },
    },
  },
  "/users": {
    get: {
      tags: ["使用者"],
      summary: "取回使用者資訊",
      description: "取回使用者資訊",
      operationId: "getUser",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [],
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
                $ref: "#/definitions/User",
              }
            },
          },
        },
      },
    },
    post: {
      tags: ["使用者"],
      summary: "新增使用者",
      description: "新增使用者",
      operationId: "registeUser",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "data",
          description: "User Information",
          required: true,
          schema: {
            type: "object",
            $ref: "#/definitions/RegisteUser",
          },
        },
      ],
      // security: [
      //   {
      //     ApiKeyAuth: [],
      //   },
      // ],
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
            },
          },
        },
      },
    },
  },
};
