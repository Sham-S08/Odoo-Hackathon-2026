const mongoose = require('mongoose');

// Auth user model (Employee only)
const EmployeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, index: true, sparse: true },

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true
    },

    // Stored as bcrypt hash. Not returned by default.
    passwordHash: { type: String, required: true, select: false },

    role: {
      type: String,
      required: true,
      enum: ['Admin', 'Asset Manager', 'Department Head', 'Employee'],
      default: 'Employee'
    },

    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },

    status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] },

    lastLoginAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = { EmployeeSchema };

