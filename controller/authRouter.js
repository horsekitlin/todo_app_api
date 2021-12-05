const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pick = require("lodash/pick");
const yup = require("yup");
const admin = require("firebase-admin");

const { responseOk, responseErrWithMsg } = require("../helpers/response");
const {
  parseUserResponse,
  getUserWithThirdPartydBy,
} = require("../services/userServices");
const { jwtAuthorizationMiddleware } = require("../helpers/passportManager");
const { passwordSchema } = require("../helpers/validateSchemaHelper");

const router = express.Router();

const { AUTH_SECRET } = process.env;

const generatorToken = (user) => {
  const signInfo = pick(user, ["id", "email", "status"]);
  const token = jwt.sign(
    {
      data: signInfo,
      // exp: expireIn,
    },
    AUTH_SECRET
  );
};

router.get("/facebook", passport.authenticate("facebook"));

// router.get('/facebook', (req, res) => {
//   res.json({success: true, point: 'facebook'})
// });

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/logout", jwtAuthorizationMiddleware, async (req, res) => {
  try {
    return responseOk(res, { success: true });
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

const loginRequestSchema = yup.object({
  email: yup.string().required("信箱或密碼不可為空"),
  password: passwordSchema,
});

router.post("/", (req, res) => {
  passport.authenticate("local", { session: false }, async (error, user) => {
    try {
      if (error) throw error;
      // const expireIn = add(new Date(), { days: 1 }).getTime();

      const signInfo = pick(user, ["id", "email", "status"]);
      const token = jwt.sign(
        {
          data: signInfo,
          // exp: expireIn,
        },
        AUTH_SECRET
      );

      return responseOk(res, {
        token,
        expireIn: null,
        user: parseUserResponse(user),
      });
    } catch (error) {
      responseErrWithMsg(res, error.message);
    }
  })(req, res);
});

const thirdPartyLoginRequestSchema = yup.object({
  email: yup.string().required("信箱或密碼不可為空"),
  token: yup.string().required("token 不可為空"),
});

router.post("/third/party", async (req, res) => {
  try {
    const validation = await thirdPartyLoginRequestSchema.validate(req.body);
    const decodedToken = await admin.auth().verifyIdToken(validation.token);
    if (decodedToken.email !== validation.email) {
      throw new Error("unauthorization token");
    }

    const user = await getUserWithThirdPartydBy(validation.email);
    const token = generatorToken(user);

    return responseOk(res, {
        token,
        expireIn: null,
        user: parseUserResponse(user),
      });
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

module.exports = router;
