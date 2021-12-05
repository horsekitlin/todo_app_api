const express = require('express');
const router = express.Router();
const { responseOk, responseErrWithMsg } = require("../helpers/response");
const { getTasks } = require('../services/taskServices');

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const { id: userId } = req.user.data;
    const data = await getTasks({ user_id: userId });
    return responseOk(res, { success: true, data });
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

module.exports = router;
