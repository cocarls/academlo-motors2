import express from 'express';
import { login, deleteUser, findAllUsers, findOneUser, updateUser, register, changePassword } from './users.controller.js';
import { protect, protectAccountOwner, restrictTo, validateExistUser } from './users.middleware.js';

export const router = express.Router();

router.post('/register',register)

router.post('/login',login )

router.use(protect)

router.patch('/change-password', changePassword)

router.get('/',findAllUsers)

//router.use('/:id',validateExistUser)
//'client'
router
  .route('/:id')
  .get(restrictTo( 'client','employee'),validateExistUser,findOneUser)
  .patch(validateExistUser,protectAccountOwner,updateUser)
  .delete(validateExistUser,protectAccountOwner,deleteUser);


  