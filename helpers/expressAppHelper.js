const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const { specs } = require('../constants/swaggerOptions');
const indexRouter = require("../controller/index");
const authRouter = require("../controller/authRouter");
const homeRouter = require("../controller/homeRouter");
const userRouter = require("../controller/userRouter");


const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORE_BUCKET,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = process.env;

const { initializeApp } = require("firebase-admin/app");

initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
});
const ENVIRONMENT = process.env.ENV || "dev";

let expressApp = express();
if (ENVIRONMENT === "dev") {
  // Log every HTTP request. See https://github.com/expressjs/morgan for other
  // available formats.
  expressApp.use(morgan("dev"));
}

expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(cookieParser());

expressApp.use(passport.initialize());

expressApp.use('/', indexRouter);
expressApp.use('/auth', authRouter);
expressApp.use('/users', userRouter);
expressApp.use('/home', passport.authenticate('jwt', { session: false }), homeRouter);

// Add GET /health-check express route
expressApp.get("/health-check", (req, res) => {
  res.json({
    success: true,
    data: { status: 'WORKING' }
  });
});

expressApp.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

module.exports = expressApp;