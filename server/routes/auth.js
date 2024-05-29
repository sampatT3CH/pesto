import  express  from "express";
import { login, register, uploadAvatar } from "../controllers/authController.js";
import auth from '../middleware/auth.js';



const router = express.Router();

router.post('/register',register);

router.post('/login',login);

router.post('/upload-avatar',auth,uploadAvatar);

export default router
