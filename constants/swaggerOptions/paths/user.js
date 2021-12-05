module.exports = {
  "/users": {
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
