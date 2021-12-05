const express = require('express');
const router = express.Router();
const yup = require("yup");
const { responseErrWithMsg } = require('../helpers/response');
const { createUser, getUserByUserId, updateUserByUserId, validateUser } = require('../services/userServices');

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await getUserByUserId(userId);

    res.json({ success: true, data: result });
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await updateUserByUserId(userId, req.body);

    res.json({ success: true, data: result });
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
});


const registeRequestSchema = yup.object({
  phone: yup.string().required('電話不可為空'),
  email: yup.string().email('email 格式錯誤').required('信箱不可為空'),
  password: yup.string().required('密碼不可為空'),
});

router.post('/', async (req, res) => {
  try {
    await registeRequestSchema.validate(req.body);

    const result = await createUser(req.body);

    res.json({ success: true, data: result });
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
});

router.post('/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    const result = await validateUser(userId);

    res.json({ success: true, data: result });
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
});
// {
//   from: 'demo server <demoserver@gmail.com>',
//   to: 'Tomas <horsekit1982@gmail.com>',
//   subject: 'Validate Your Account',
//   html: '<a target='_blank' href="https://google.com.tw">Validate Link</a>',
// }
module.exports = router;
