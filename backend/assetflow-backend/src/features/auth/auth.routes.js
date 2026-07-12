const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const { authController } = require('./auth.controller');

const { authMiddleware } = require('../../middleware/auth.middleware');
const { ROLES } = require('../../common/enums/roles');

// Signup creates Employee only. No role selection.
router.post(
  '/signup',
  [
    body('firstName').isString().trim().notEmpty(),
    body('lastName').isString().trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 8 }),
    body('department').optional().isString().trim().notEmpty(),
    body('employeeId').optional().isString().trim().notEmpty(),
    body('status').optional().isString().trim().notEmpty()
  ],
  authController.signup
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isString().notEmpty()
  ],
  authController.login
);

router.get('/profile', authMiddleware, authController.profile);


// Forgot password placeholder
router.post('/forgot-password', (req, res) => {
  res.status(501).json({ message: 'Forgot password not implemented yet' });
});

module.exports = router;

