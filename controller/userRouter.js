const express = require('express');
const router = express.Router();
const yup = require("yup");
const { jwtAuthorizationMiddleware } = require('../helpers/passportManager');
const { responseErrWithMsg, responseOk } = require('../helpers/response');
const { passwordSchema } = require('../helpers/validateSchemaHelper');
const { createUser, getUserByUserId, updateUserByUserId, validateUser, sendValidationEmailBy } = require('../services/userServices');


router.get('/', jwtAuthorizationMiddleware, async (req, res) => {
  try {
    const { id: userId } = req.user.data;
    const result = await getUserByUserId(userId);
    responseOk(res, { success: true, data: result });
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await updateUserByUserId(userId, req.body);

    responseOk(res, { success: true, data: result });
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
});

const registeRequestSchema = yup.object({
  password: passwordSchema,
  name: yup.string().required('名稱不可為空'),
  email: yup.string().email('email 格式錯誤').required('信箱不可為空'),
  googleId: yup.string().nullable().default(null),
  facebookId: yup.string().nullable().default(null),
});

router.post('/', async (req, res) => {
  try {
    await registeRequestSchema.validate(req.body);

    const result = await createUser(req.body);

    responseOk(res, { success: true, data: result });
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
});

router.post('/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    const result = await validateUser(userId);

    responseOk(res, { success: true, data: result });
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
});


router.post('/validate/email', async (req, res) => {
  try {
    const { id: userId } = req.user.data;
    await sendValidationEmailBy(userId);
    responseOk(res, { success: true });
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
});

module.exports = router;
