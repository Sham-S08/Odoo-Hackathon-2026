const { body } = require('express-validator');

const signupValidation = [
  body('firstName').isString().trim().notEmpty(),
  body('lastName').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 8 }),
  body('department').optional().isString().trim().notEmpty(),
  body('employeeId').optional().isString().trim().notEmpty(),
  body('status').optional().isString().trim().notEmpty()
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().notEmpty()
];

module.exports = { signupValidation, loginValidation };

