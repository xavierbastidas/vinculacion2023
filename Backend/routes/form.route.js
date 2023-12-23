import { Router } from "express";

import {  createWorker ,
     createJobPosition
    ,flootMeasurements,
     sittingMeasurements,
     segmentMeasurements,
     functionalMeasurements,
     createActivity,
     getCampus,
     createMuscleActivity} from "../controllers/form.controller.js";




const router = Router();



   

router.post('/registerWorker',createWorker);
router.post('/jobPosition',createJobPosition);
router.post('/flootM',flootMeasurements);
router.post('/sittingM',sittingMeasurements);
router.post('/segmentM',segmentMeasurements);
router.post('/functionalM',functionalMeasurements);
router.post('/registerActivity',createActivity);
router.get('/campus',getCampus);
router.post('/registerMuscleA',createMuscleActivity);


export default router;



