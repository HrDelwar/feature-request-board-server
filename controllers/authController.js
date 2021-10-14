import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models';
import { sendResponse } from '../utils/helperFunction';

const { Auth } = models;

// user login handle
export const handleAuthLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.findOne({ email }).select('-__v');

    if (!user) {
      return res
        .status(404)
        .send({ name: 'Not Found', message: 'User Not found', success: false });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return sendResponse(res, 403, {
        name: 'Forbidden',
        message: 'Wrong password',
        success: false,
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.AUTH_SECRET
    );

    const { name, role, email: newEmail, _id, createdAt } = user;
    const newUser = {
      name,
      role,
      email: newEmail,
      _id,
      createdAt,
    };

    res.status(200).json({
      message: 'login success',
      name: 'OK',
      success: true,
      token,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).send({
      name: 'Internal Sever Error',
      message: error.message,
      success: false,
    });
  }
};

// user signup handle
export const handleAuthSignup = async (req, res) => {
  const { name, email, password } = req.body;

  // check this email is already have an account or not
  const userExist = await Auth.findOne({ email });
  if (userExist) {
    return sendResponse(res, 400, {
      name: 'Bad Request',
      success: false,
      message: `user already exist is this email: ${email}`,
    });
  }

  // creating a new mongoose doc for user data
  const user = new Auth(req.body);
  try {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    const savedUser = await user.save();
    return sendResponse(res, 201, {
      name: 'OK',
      success: true,
      message: `user created id: ${savedUser._id}`,
    });
  } catch (err) {
    return sendResponse(res, 501, {
      name: 'Internal Server Error',
      success: false,
      message: err.message,
    });
  }
};
