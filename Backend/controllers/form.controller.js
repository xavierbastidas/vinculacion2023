import Worker from '../models/Worker.js';
export const createWorker = async (req,res) =>{
    const {id_trabajador,Nombre,Apellido,Edad,Genero,id_campus_pertenece,departamento_area,
        imagen_trabajador1,imagen_trabajador2} = req.body;
  try{
        const worker = await Worker.findOne({ where: { id_trabajador} });
        if (worker) {
            return res.json({ error: 'Worker already exist' });
        }
        else{
          const new_worker  = new Worker({id_trabajador,Nombre,Apellido,Edad,Genero,id_campus_pertenece,departamento_area,
            imagen_trabajador1,imagen_trabajador2
        })
        await new_worker .save()
        res.json({worker:new_worker})
        }
  }catch (error){
    res.json({errror:error})
  }
}
