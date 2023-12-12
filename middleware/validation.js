const { param, validationResult } = require('express-validator');

const validatePostId = param('id', 'Invalid post ID').isInt();
const validateTagName = param('name', 'Invalid tag name').isAlpha();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

module.exports = {
  validatePostId,
  validateTagName,
  handleValidationErrors,
};
