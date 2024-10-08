import { Router } from "express";

import {  createWorker ,
     createJobPosition
    ,flootMeasurements,
     sittingMeasurements,
     segmentMeasurements,
     functionalMeasurements,
     createActivity,
     getCampus,
     createMuscleActivity,
     getIdPollster,
     addForceType,
     addForceExerted,
     addGripFeatures,
     addInjury,
     addDiase,
     addMedicine,
     addGripCapacity,
     checkIdPuestoBD} from "../controllers/form.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();
router.post('/registerWorker',createWorker);
router.post('/jobPosition',requireToken,createJobPosition);
router.post('/flootM',flootMeasurements);
router.post('/sittingM',sittingMeasurements);
router.post('/segmentM',segmentMeasurements);
router.post('/functionalM',functionalMeasurements);
router.post('/registerActivity',createActivity);
router.post('/addForceActivity',addForceType);
router.post('/addForceExerted',addForceExerted);
router.post('/addGripFeatures',addGripFeatures);
router.post('/addInjury',addInjury);
router.post('/addDiase',addDiase);
router.post('/addMedicine',addMedicine);
router.post('/addGripCapacity',addGripCapacity);
router.post('/registerMuscleA',createMuscleActivity);
router.post("/checkIdPuestoBD",checkIdPuestoBD)
router.get('/pollster/:id_usuario_pertenece',getIdPollster);  
router.get('/campus',getCampus);


export default router;



