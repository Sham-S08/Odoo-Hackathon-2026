const mongoose = require('mongoose');
const { ROLES } = require('../../common/enums/roles');

const EmployeeSchema = new mongoose.Schema(
  {
    // Auth
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },

    // Profile
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    // RBAC
    role: {
      type: String,
      required: true,
      enum: [ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD, ROLES.EMPLOYEE]
    },

    // Employment
    status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },

    // Misc
    phoneNumber: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = { EmployeeSchema };

