import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
} from '../controllers/userController.js';
import {
  validateCreateUser,
  validateUpdateUser,
  validateUpdatePassword,
  checkValidation,
} from '../middleware/validation.js';

const router = express.Router();

// User CRUD routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', validateCreateUser, checkValidation, createUser);
router.put('/:id', validateUpdateUser, checkValidation, updateUser);
router.put('/:id/password', validateUpdatePassword, checkValidation, updatePassword);
router.delete('/:id', deleteUser);

export default router;
