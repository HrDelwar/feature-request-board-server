import models from '../models';
import { isAdmin, sendResponse } from '../utils/helperFunction';

const { Form } = models;

export const addFormField = async (req, res) => {
  if (!isAdmin(req)) {
    return sendResponse(res, 403, {
      name: 'forbidden',
      success: false,
      message: `only admin can add a form filed`,
    });
  }
  try {
    // creating a new mongoose doc for user data
    const form = new Form(req.body);

    const savedForm = await form.save();
    return sendResponse(res, 201, {
      name: 'OK',
      success: true,
      message: `form created id: ${savedForm._id}`,
      savedForm,
    });
  } catch (err) {
    return sendResponse(res, 501, {
      name: 'Internal Server Error',
      success: false,
      message: err.message,
    });
  }
};

export const updateForm = async (req, res) => {
  const { _id, form } = req.body;

  if (!isAdmin(req)) {
    return sendResponse(res, 403, {
      name: 'forbidden',
      success: false,
      message: `only admin can add a form filed`,
    });
  }

  try {
    const updateForm = await Form.updateOne(
      { _id },
      { requestForm: form },
      { new: true }
    );
    if (updateForm.modifiedCount > 0) {
      return sendResponse(res, 200, {
        name: 'OK',
        success: true,
        message: `Update successfully!`,
        updateForm,
      });
    }
    return sendResponse(res, 200, {
      name: 'OK',
      success: true,
      message: `nothing change everything up to date`,
      updateForm,
    });
  } catch (err) {
    return sendResponse(res, 501, {
      name: 'Internal Server Error',
      success: false,
      message: err.message,
    });
  }
};

export const getForm = async (req, res) => {
  try {
    const form = await Form.findOne();
    return sendResponse(res, 200, {
      success: true,
      message: `form found`,
      form,
    });
  } catch (err) {
    return sendResponse(res, 501, {
      name: 'Internal Server Error',
      success: false,
      message: err.message,
    });
  }
};
