import jwt from 'jsonwebtoken';

const verifyAuthToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token)
    return res.status(401).send({
      name: 'Access Denied',
      message: 'access denied',
      success: false,
    });

  try {
    const auth = await jwt.verify(token, process.env.AUTH_SECRET);
    req.auth = auth;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ name: 'Access Denied', message: err.message, success: false });
  }
};

export default verifyAuthToken;
