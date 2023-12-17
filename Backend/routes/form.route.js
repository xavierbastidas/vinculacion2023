import { Router } from "express";
import {  createWorker ,createJobPosition,flootMeasurements} from "../controllers/form.controller.js";

const router = Router();
router.post('/jobPosition',createJobPosition);
router.post('/registerWorker',createWorker);
router.post('/flootM',flootMeasurements);



export default router;

