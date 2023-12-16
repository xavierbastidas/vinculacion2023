import { Router } from "express";
import {  createWorker} from "../controllers/form.controller.js";

const router = Router();

router.post('/registerWorker',createWorker);

export default router;

