import Worker from '../models/Worker.js';
import JobPosition from '../models/JobPosition.js';
import FlootMeasurements from '../models/FlootMeasurements.js';
import SittingMeasurements from '../models/SittingMeasurements.js';
import SegmentMeasurements from '../models/SegmentMeasurements.js';
import FunctionalMeasurements from '../models/FunctionalMeasurements.js';
import Activity from '../models/Activity.js';
import Campus from '../models/Campus.js';
import MuscleActivity from '../models/MuscleActivity.js';

export const createJobPosition = async (req,res)=>{

  const {id_puesto_trabajo,departamento_area,id_campus_pertenece}= req.body;
  
  try {
    const jobPosition =  new JobPosition({id_puesto_trabajo,departamento_area,
    id_campus_pertenece});
    await jobPosition.save()
    res.status(201).json({job_position:jobPosition})
  } catch (error) {
    res.status(500).json({error:error});
  }
}

export const createWorker = async (req, res) => {
  try {
    const { Nombre, Apellido, Edad, Genero, imagen_trabajador1,
      imagen_trabajador2, id_puesto_trabajo } = req.body;

    const worker = new Worker({
      Nombre,
      Apellido,
      Edad,
      Genero,
      imagen_trabajador1,
      imagen_trabajador2,
      id_puesto_trabajo
    });
    
    await worker.save();
    res.status(201).json(worker.id_trabajador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const flootMeasurements= async(req,res)=>{
  const {masa,estatura,altura_ojo,altura_hombro,altura_codo,
    altura_entre_pierna, profundidad_cuerpo_de_pie,
    anchura_cadera_pie,id_trabajador_pertenece
  } = req.body;
  try {
      const flootMeasurements = new FlootMeasurements({masa,estatura,altura_ojo,
      altura_hombro,altura_codo,
      altura_entre_pierna,profundidad_cuerpo_de_pie,
      anchura_cadera_pie,id_trabajador_pertenece});
      await flootMeasurements.save();
      res.status(201).json({flootMeasures:flootMeasurements});
  } catch (error) {
    res.status(500).json({error:error});
  }

}
export const sittingMeasurements  = async (req,res)=>{
  const {
    altura_sentado, altura_ojo,altura_cervical,altura_hombro,altura_codo,
    longitud_hombro_codo,
    ancho_hombro,amplitud_codos,amplitud_cadera,
    altura_pliegue_popliteo,
    altura_rodilla,
    id_trabajador_pertenece
  } = req.body;
  try {
    const sittingMeasurements = new  SittingMeasurements({altura_sentado,altura_ojo,altura_cervical,
    altura_hombro,altura_codo,longitud_hombro_codo,
    ancho_hombro,amplitud_codos,amplitud_cadera,
    altura_pliegue_popliteo,altura_rodilla,id_trabajador_pertenece});
    await sittingMeasurements.save();
    res.status(201).json({sittingMeasures:sittingMeasurements});
  } catch (error) {
    res.status(500).json({error:error});
  }
}

export const segmentMeasurements = async (req,res)=>{
  const {longitud_mano,longitud_palma,amplitud_mano_metacarpios,longitud_dedo_indice,
    anchura_dedo_indice_proximal, ancho_dedo_indice_distal,longitud_pie, ancho_pie,
    longitud_cabeza,ancho_cabeza,circunferencia_cabeza, arco_bitragion,longitud_pulgar,
    ancho_pulgar,circunferencia_brazo_flexionado,circunferencia_antebrazo_flexionado,
    id_trabajador_pertenece} = req.body; 
  try {
    const segmentMeasurements = new SegmentMeasurements({longitud_mano,longitud_palma,amplitud_mano_metacarpios,
    longitud_dedo_indice,anchura_dedo_indice_proximal,ancho_dedo_indice_distal,longitud_pie,
    ancho_pie,longitud_cabeza,ancho_cabeza,circunferencia_cabeza,arco_bitragion,longitud_pulgar,ancho_pulgar,
   circunferencia_brazo_flexionado,circunferencia_antebrazo_flexionado,id_trabajador_pertenece});
   await segmentMeasurements.save();
   res.status(201).json({segmentMeasures:segmentMeasurements});
  } catch (error) {
    res.status(500).json({error:error});
  }
}

export const functionalMeasurements = async (req,res)=>{
  const { alcance_agarre,longitud_codo_munieca, longitud_agarre_codo,
    altura_punio,profundidad_asiento,longitud_rodilla_gluteo,
    circunferencia_cintura,circunferencia_munieca,
    id_trabajador_pertenece} = req.body;
  try {
    const functionalMeasurements = new  FunctionalMeasurements({alcance_agarre,longitud_codo_munieca,
    longitud_agarre_codo,altura_punio,profundidad_asiento,longitud_rodilla_gluteo,
    circunferencia_cintura,circunferencia_munieca,id_trabajador_pertenece});
    await functionalMeasurements.save();
    res.status(201).json({functionalMeasures:functionalMeasurements});
  } catch (error) {
    res.status(500).json({error:error});
  }
}


export const createActivity = async (req,res)=>{

   const {nombre_actividad,descripcion,imagen1,imagen2,imagen3,id_trabajador_pertenece} = req.body;
  try {
    const activity = new Activity ({nombre_actividad,descripcion,imagen1,imagen2,
    imagen3,id_trabajador_pertenece});
    await activity.save();
    res.status(201).json({activity:activity});
    
  } catch (error
  ) {
    res.status(500).json({error:error});
  }
}


export const createMuscleActivity = async (req,res)=>{

  const {cuerpo_estatico,movimientos_repetitivos,cambios_postura,id_actividad_pertenece} = req.body;
  try {
    const muscleActivity = new MuscleActivity ({cuerpo_estatico,movimientos_repetitivos,cambios_postura,
      id_actividad_pertenece});
      await muscleActivity.save();
      res.status(201).json({muscleActivity:muscleActivity});
    
  } catch (error
  ) {
    res.status(500).json({error:error});
  }
}


export const getCampus = async (req,res)=>{
    try {
        const campus = await Campus.findAll(); 
        const campusArray = campus.map(campus => campus.toJSON());
        res.json(campusArray);
    } catch (error) {
        res.status(500).json({error:error})
    }
};






