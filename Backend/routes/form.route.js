import { Router } from "express";
import multer from 'multer';
import {  createWorker ,
     createJobPosition
    ,flootMeasurements,
     sittingMeasurements,
     segmentMeasurements,
     functionalMeasurements,
     createActivity,
     getCampus} from "../controllers/form.controller.js";


     const storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, '/var/www/html/images'); 
          },
          filename: function (req, file, cb) {
            cb(null, file.originalname);
          }
        });
        
        const upload = multer({ storage: storage }).fields([
          { name: 'imagen_trabajador1', maxCount: 1 },
          { name: 'imagen_trabajador2', maxCount: 1 }
        ]);

const router = Router();



   

router.post('/registerWorker',upload,createWorker);
router.post('/jobPosition',createJobPosition);
router.post('/flootM',flootMeasurements);
router.post('/sittingM',sittingMeasurements);
router.post('/segmentM',segmentMeasurements);
router.post('/functionalM',functionalMeasurements);
router.post('/registerActivity',createActivity);
router.get('/campus',getCampus);


export default router;



