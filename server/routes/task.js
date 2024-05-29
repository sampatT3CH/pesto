import { addTask, deleteTaskById, getAllTask, getTaskById, updateTaskById } from '../controllers/taskController.js';
import auth from '../middleware/auth.js';
import  express  from "express";




const router = express.Router();

router.get('/',auth,getAllTask);
router.get('/:id',auth,getTaskById);
router.post('/add',auth,addTask);
router.put('/update/:id',auth,updateTaskById);
router.delete('/delete/:id',auth,deleteTaskById);

export default router