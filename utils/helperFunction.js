export const sendResponse = (res, statusCode, sendObj) => {
  return res.status(statusCode).send(sendObj);
};

//check user is admin and return true or false
export const isAdmin = (req) => {
  if (req.auth.role === 'admin') {
    return true;
  }
  return false;
};
