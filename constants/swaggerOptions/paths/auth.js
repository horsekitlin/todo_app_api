module.exports = {
  "/auth": {
    post: {
      tags: ["login"],
      summary: "login api",
      description: "login",
      operationId: "login",
      parameters: [
        {
          in: "body",
          name: "data",
          type: "object",
          schema: {
            type: "object",
            properties: {
              phone: {
                type: "string",
                default: "0987654321"
              },
              password: {
                type: "string",
                default: "a12345678"
              }
            }
          },
        },
      ],
      responses: {
        200: {
          description: "OK",
          schema: {
            type: "string",
            default: "OK"
          },
        },
      },
    }
  },
  "/auth/third/party": {
    post: {
      tags: ["login"],
      summary: "google or facebook login api",
      description: "google or facebook 登入",
      operationId: "google or facebook 登入",
      parameters: [
        {
          in: "body",
          name: "data",
          type: "object",
          schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
                default: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNTg1Zjk5MjExMmZmODgxMTEzOTlhMzY5NzU2MTc1YWExYjRjZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoicGFzc29uIHR3IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSng5NUNla1NnbFRiY2g0OVZCam5Na0JZajhyTXB0cjlpY0pXUFRYPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Zlcm5hbC1wb3Rpb24tMzEzNTA2IiwiYXVkIjoidmVybmFsLXBvdGlvbi0zMTM1MDYiLCJhdXRoX3RpbWUiOjE2Mzg2OTIwOTYsInVzZXJfaWQiOiJQN2xXSXNHaXl5TWk0dzBkalUxNzVkMGVla3ExIiwic3ViIjoiUDdsV0lzR2l5eU1pNHcwZGpVMTc1ZDBlZWtxMSIsImlhdCI6MTYzODY5MjA5NiwiZXhwIjoxNjM4Njk1Njk2LCJlbWFpbCI6InBhc3Nvbi5jb20udHdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTQ5NjkyMjQ0NTEyMDgyMjAzMDYiXSwiZW1haWwiOlsicGFzc29uLmNvbS50d0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.bJX14Ompjtq4WFcMO09fdYIzQOPKLnWWgqjhNYnpUgqoDwkWlEPy3ecQszU_oerGOKxXTictm3ar6l_etLsTFS5xoYFQGh2wSc3_WbhNXi6v4fVqaRj5JfPsPHxMtz8ASk9Y8OIUacvw5d5tc2yo3PFNa76DVB4IYs7aOTt-NCvduzPzTlw7TvfXCe5JXSyEDoSv10J2Xf5hApMOaGRXVQaFHiHIAIP1UBPAmARvfFmIaZClairddU-O5U6-NvxVh7hJv5_7X5nkF6VjBrzItvC7NjZfMuJ6HJUIJUQus7PtjnR8VT7tcEG5C3rDqPbtabWFRTiwgREGriVYYaTUxg",
              },
              email: {
                type: "string",
                default: "passon.com.tw@gmail.com",
              }
            }
          },
        },
      ],
      responses: {
        200: {
          description: "OK",
          schema: {
            type: "object",
            $ref: "#/definitions/User",
          },
        },
      },
    }
  },
};
