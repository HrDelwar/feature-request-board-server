import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

export const featureSchemaValidation = (req, res, next) => {
  const data = req.body;
  const schema = Joi.object().keys({}).unknown(true);

  const { error } = schema.validate(data);
  if (error) {
    const message = error.details[0].message;
    return res.status(400).send({ message: message, name: 'schema not match' });
  }
  next();
};
