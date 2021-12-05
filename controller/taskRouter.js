const express = require('express');
const yup = require("yup");
const router = express.Router();
const { responseOk, responseErrWithMsg } = require("../helpers/response");
const { getTasks, createTask, updateTask } = require('../services/taskServices');

router.get('/', async (req, res) => {
  try {
    const { id: userId } = req.user.data;
    const data = await getTasks({ user_id: userId });
    return responseOk(res, { success: true, data });
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

const createTaskSchema = yup.object({
  title: yup.string().required('抬頭不可為空'),
});

router.post('/', async (req, res) => {
  try {
    const { id: userId } = req.user.data;
    const validation = await createTaskSchema.validate(req.body);
    const data = await createTask(userId, validation);
    return responseOk(res, { success: true, data });
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

const updateTaskSchema = yup.object({
  status: yup.number().oneOf([0, 1], '狀態錯誤'),
});

router.put('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const validation = await updateTaskSchema.validate(req.body);
    const data = await updateTask(taskId, validation);
    return responseOk(res, { success: true, data });
  } catch (error) {
    responseErrWithMsg(res, error.message);
  }
});

module.exports = router;
