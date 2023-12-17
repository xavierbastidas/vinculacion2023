import Worker from '../models/Worker.js';
import JobPosition from '../models/JobPosition.js';
import FlootMeasurements from '../models/FlootMeasurements.js';
import SittingMeasurements from '../models/SittingMeasurements.js';

export const createJobPosition = async (req,res)=>{

  const {id_puesto_trabajo,departamento_area,descripcion,id_campus_pertenece}= req.body;
  try {
    const jobPosition =  new JobPosition({id_puesto_trabajo,departamento_area,descripcion,id_campus_pertenece});
    await jobPosition.save()
    res.json({job_position:jobPosition})
    
  } catch (error) {
    res.json({error:error})
  }
}

export const createWorker = async (req,res) =>{
    const {Nombre,Apellido,Edad,Genero,
        imagen_trabajador1,imagen_trabajador2,id_puesto_trabajo} = req.body;
  try{
          const worker  = new Worker({Nombre,Apellido,Edad,Genero,
            imagen_trabajador1,imagen_trabajador2,id_puesto_trabajo
        });
        await worker.save();
        res.json({worker:worker});
  
  }catch (error){
    res.json({errror:error});
  }
}

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
      res.json({flootMeasures:flootMeasurements});
  } catch (error) {
     res.json({error:error});
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
    res.json({sittingMeasures:sittingMeasurements});
  } catch (error) {
    res.json({error:error});
  }
}
