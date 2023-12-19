import { Router } from 'express';
import { uploadImgBB } from '../controllers/file.controller.js';
import multer from 'multer'
const router = Router();
const upload = multer(); 
router.post('/uploadImgBB', upload.single('image'), uploadImgBB);
export default router;
