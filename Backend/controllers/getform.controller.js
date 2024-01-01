import Worker from '../models/Worker.js';
import FlootMeasurements from '../models/FlootMeasurements.js';
import SittingMeasurements from '../models/SittingMeasurements.js';
import SegmentMeasurements from '../models/SegmentMeasurements.js';
import FunctionalMeasurements from '../models/FunctionalMeasurements.js';
import Activity from '../models/Activity.js';
import MuscleActivity from '../models/MuscleActivity.js';
import ForceType from '../models/ForceType.js';
import ForceExerted from '../models/ForceExerted.js';
import GripFeatures from '../models/GripFeatures.js';
import Injury from  '../models/Injury.js';
import Diase  from '../models/Diase.js';
import Medicine from '../models/Medicine.js';
import GripCapacity from '../models/GripCapacity.js';
import ViewJobPosition from '../models/ViewJobPosition.js';


export const getViewJobPosition = async (req,res)=>{
    try {
       const viewJobPosition = await ViewJobPosition.findAll();
       const viewJobPositionArray = viewJobPosition.map(viewJobPosition=>viewJobPosition.toJSON());
       res.json(viewJobPositionArray);
    } catch (error) {
       res.status(500).json({error:error.message,});
    }
   };


   
   export const getViewJobPositionID = async (req,res)=>{
    const {id_encuestador} =  req.params;
    try {
        const jobPosition  = await ViewJobPosition.findAll({where:{id_encuestador}});
        if(jobPosition.length===0){
            return res.status(404).json({error:"Job Position not found"});
        }
        res.json(jobPosition);
    } catch (error) {
       res.status(500).json({error:error.message});
    }
   };
   

export const getWorker =  async (req,res)=>{
    const {id_puesto_trabajo} =  req.params;
    try {
        const worker  = await Worker.findOne({where:{id_puesto_trabajo}});
        if(!worker){
            return res.status(404).json({error:"Worker not found"});
        }
        const resWorker = {
            id_trabajador : worker.id_trabajador,
            Nombre : worker.Nombre,
            Apellido :worker.Apellido,
            Edad : worker.Edad,
            Genero : worker.Genero,
            imagen_trabajador1 : worker.imagen_trabajador1.toString(),
            imagen_trabajador2 : worker.imagen_trabajador2.toString(),
            id_puesto_trabajo : worker.id_puesto_trabajo
        }
        res.json(resWorker);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const flootMeasurements =  async (req,res)=>{
    const {id_trabajador_pertenece} =  req.params;
    try {
        const flootMeasures  = await FlootMeasurements.findOne({where:{id_trabajador_pertenece}});
        if(!flootMeasures){
            return res.status(404).json({error:"Floot Measurements not found"});
        }
        res.json(flootMeasures);
    } catch (error) {
        res.status(500).json({error:error.message,});
    }
}

export const sittingMeasurements =  async (req,res)=>{
    const {id_trabajador_pertenece} =  req.params;
    try {
        const sittingMeasures  = await SittingMeasurements.findOne({where:{id_trabajador_pertenece}});
        if(!sittingMeasures){
            return res.status(404).json({error:"Sitting Measurements not found"});
        }
        res.json(sittingMeasures);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const segmentMeasurements =  async (req,res)=>{
    const {id_trabajador_pertenece} =  req.params;
    try {
        const segmentMeasures  = await SegmentMeasurements.findOne({where:{id_trabajador_pertenece}});
        if(!segmentMeasures){
            return res.status(404).json({error:"Segment Measurements not found"});
        }
        res.json(segmentMeasures);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const functionalMeasurements =  async (req,res)=>{
    const {id_trabajador_pertenece} =  req.params;
    try {
        const functionalMeasures  = await FunctionalMeasurements.findOne({where:{id_trabajador_pertenece}});
        if(!functionalMeasures){
            return res.status(404).json({error:"Functional Measurements not found"});
        }
        res.json(functionalMeasures);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


export const getActivity =  async (req,res)=>{
    const {id_trabajador_pertenece} =  req.params;
    try {
        const activity  = await Activity.findOne({where:{id_trabajador_pertenece}});
        if(!activity){
            return res.status(404).json({error:"Activity not found"});
        }
        const resActivity = {
            id_actividad : activity.id_actividad,
            nombre_actividad : activity.nombre_actividad,
            descripcion :activity.descripcion,
            imagen1 :activity.imagen1.toString(),
            imagen2 :activity.imagen2.toString(),
            imagen3 :activity.imagen3.toString(),
            id_trabajador_pertenece: activity.id_trabajador_pertenece
        }
        res.json(resActivity);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


export const muscleActivity =  async (req,res)=>{
    const {id_actividad_pertenece} =  req.params;
    try {
        const muscleActivity  = await MuscleActivity.findOne({where:{id_actividad_pertenece}});
        if(!muscleActivity){
            return res.status(404).json({error:"Muscle activity not found"});
        }
        res.json(muscleActivity);
    } catch (error) {
        res.status(500).json({error:error.message,});
    }
}

export const forceType =  async (req,res)=>{
    const {id_actividad_pertenece} =  req.params;
    try {
        const forceType  = await ForceType.findOne({where:{id_actividad_pertenece}});
        if(!forceType){
            return res.status(404).json({error:"Force type not found"});
        }
        res.json(forceType);
    } catch (error) {
        res.status(500).json({error:error.message,});
    }
}


export const forceExerted =  async (req,res)=>{
    const {id_tipo_fuerza_pertenece} =  req.params;
    try {
        const forceExerted = await ForceExerted.findOne({where:{id_tipo_fuerza_pertenece}});
        if(!forceExerted ){
            return res.status(404).json({error:"Force exerted not found"});
        }
        res.json(forceExerted);
    } catch (error) {
        res.status(500).json({error:error.message,});
    }
}


export const gripFeatures =  async (req,res)=>{
    const {id_actividad_pertenece} =  req.params;
    try {
        const gripFeatures  = await GripFeatures.findOne({where:{id_actividad_pertenece}});
        if(!gripFeatures){
            return res.status(404).json({error:"Grip features not found"});
        }
        res.json(gripFeatures);
    } catch (error) {
        res.status(500).json({error:error.message,});
    }
}



export const getInjury =  async (req,res)=>{
    const {id_trabajador_pertenece} =  req.params;
    try {
        const injury = await Injury.findOne({where:{id_trabajador_pertenece}});
        if(!injury){
            return res.status(404).json({error:"Injury not found"});
        }
        res.json(injury);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const getDiase =  async (req,res)=>{
    const {id_trabajador_pertenece} =  req.params;
    try {
        const diase = await Diase.findOne({where:{id_trabajador_pertenece}});
        if(!diase){
            return res.status(404).json({error:"Diase not found"});
        }
        res.json(diase);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
export const getMedicine =  async (req,res)=>{
    const {id_trabajador_pertenece} =  req.params;
    try {
        const medicine = await Medicine.findOne({where:{id_trabajador_pertenece}});
        if(!medicine){
            return res.status(404).json({error:"Medicine not found"});
        }
        res.json(medicine);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const gripCapacity =  async (req,res)=>{
    const {id_trabajador_pertenece} =  req.params;
    try {
        const gripCapacity = await GripCapacity.findOne({where:{id_trabajador_pertenece}});
        if(!gripCapacity){
            return res.status(404).json({error:"Grip capacity not found"});
        }
        res.json(gripCapacity);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

