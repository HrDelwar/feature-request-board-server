import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

export const featureSchemaValidation = (req, res, next) => {
  const data = req.body;
  const schema = Joi.object({
    status: Joi.string().allow(
      'under-review',
      'planned',
      'packaging',
      'in-progress',
      'complete'
    ),
    logo: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().required(),
  });
  const { error } = schema.validate(data);
  if (error) {
    const message = error.details[0].message;
    return res.status(400).send({ message: message, name: 'schema not match' });
  }
  next();
};
