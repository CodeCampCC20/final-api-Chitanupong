import express from 'express';
const router = express.Router();
// Controller
import {
  register,
  login,
  registerDoctor,
  loginDoctor
} from '../controllers/auth.controller.js'
import { LoginSchema, registerSchema, validate } from '../util/validater.js';



router.post('/register/user', validate(registerSchema), register);
router.post('/login/user', validate(LoginSchema),login);

router.post('/register/doctor', validate(registerSchema), registerDoctor);
router.post('/login/doctor', validate(LoginSchema),loginDoctor);



export default router