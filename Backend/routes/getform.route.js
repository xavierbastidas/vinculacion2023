import { Router } from "express";
import { getWorker,flootMeasurements, sittingMeasurements,
segmentMeasurements,
functionalMeasurements,
getActivity,
muscleActivity,
forceType,
forceExerted,
gripFeatures,
getInjury,
getDiase,
getMedicine,
gripCapacity,
getViewJobPosition,
getViewJobPositionID} from "../controllers/getform.controller.js";
const router = Router();
router.get('/viewJobPosition',getViewJobPosition);
router.get('/worker/:id_puesto_trabajo',getWorker);
router.get('/flootM/:id_trabajador_pertenece',flootMeasurements)
router.get('/sittingM/:id_trabajador_pertenece',sittingMeasurements);
router.get('/segmentM/:id_trabajador_pertenece',segmentMeasurements);
router.get('/functionalM/:id_trabajador_pertenece',functionalMeasurements);
router.get('/activity/:id_trabajador_pertenece',getActivity);
router.get('/muscleActivity/:id_actividad_pertenece',muscleActivity);
router.get('/forceType/:id_actividad_pertenece',forceType);
router.get('/forceExerted/:id_tipo_fuerza_pertenece',forceExerted);
router.get('/gripF/:id_actividad_pertenece',gripFeatures);
router.get('/injury/:id_trabajador_pertenece',getInjury);
router.get('/diase/:id_trabajador_pertenece',getDiase);
router.get('/medicine/:id_trabajador_pertenece',getMedicine);
router.get('/gripC/:id_trabajador_pertenece',gripCapacity);
router.get('/viewJobPosition/:id_encuestador',getViewJobPositionID);
export default router;