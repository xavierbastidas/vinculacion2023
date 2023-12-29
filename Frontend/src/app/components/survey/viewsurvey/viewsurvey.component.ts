import { Component, OnInit } from '@angular/core';
import { JobPosition } from '../../../models/jposition';
import { Worker } from '../../../models/worker';
import { FlootMeasurements } from '../../../models/fmeasures';
import { SittingMeasurements } from '../../../models/smeasures';
import { SegmentMeasurements } from '../../../models/segmentmeasures';
import { FunctionalMeasurements } from '../../../models/functionmeasures';
import { ForceType } from '../../../models/forcetype';
import { ForceExerted } from '../../../models/forcexerted';
import { Activity } from '../../../models/activity';
import { MuscleActivity } from '../../../models/muscleactivity';
import { GripFeatures } from '../../../models/gripfeatures';
import { Injury } from '../../../models/injury';
import { Diase } from '../../../models/diase';
import { Medicine } from '../../../models/medicine';
import { GripCapacity } from '../../../models/gripcapacity';
import { GetformService } from '../../../services/getform.service';
import { UsersService } from '../../../services/users.service';
import { FormService } from '../../../services/form.service';


@Component({
  selector: 'app-viewsurvey',
  templateUrl: './viewsurvey.component.html',
  styleUrl: './viewsurvey.component.css'
})
export class ViewsurveyComponent implements OnInit {
  jobP: JobPosition[] = [];
  worker : Worker [] =  [];
  flootM : FlootMeasurements [] = [];
  sittingM :SittingMeasurements [] = [];
  segmentM : SegmentMeasurements[] = [];
  functionalM : FunctionalMeasurements[]=[];
  forceType : ForceType [] =[];
  forceExerted : ForceExerted [] =[];
  actiivity : Activity[] = [];
  muscleA : MuscleActivity[] =[];
  gripFeatures : GripFeatures[] =[];
  injury : Injury[]=[];
  diase : Diase[]=[];
  medicine : Medicine[]=[];
  gripCapacity : GripCapacity[]=[];
  currentPage = 1; 
  itemsPerPage = 5; 
  showAll = false;


  constructor(private getFormService : GetformService ,
    private userService:UsersService,private formService : FormService
    ){
 
   }
   ngOnInit(): void {
     this.getEval();
   }
 
   
 
   getEval() {

    const id_usuario_pertenece = this.userService.getUserIdFromToken();
    this.formService.getIdPollster(id_usuario_pertenece).subscribe(
      (response)=>{
     this.getFormService.getJobPositionID(response).subscribe(
      (positions:any[]) => {
        this.jobP = positions;
        positions.forEach(x=> {
          this.getFormService.getWorker(x.id_puesto_trabajo).subscribe(
            (res: any) => {
              this.worker.push(res);
              this.getFormService.getFlootMeasurements(res.id_trabajador).subscribe(
                (response: any) => {
                  this.flootM.push(response);
                },
                (error) => {
                  throw new Error(error);
                }
              );
              this.getFormService.getSittingMeasurements(res.id_trabajador).subscribe(
                (sitting) => {
                  this.sittingM.push(sitting);
                },
                (error) => {
                  throw new Error(error);
                }
              );

              this.getFormService.getSegmentMeasurements(res.id_trabajador).subscribe(
                (segment) => {
                  this.segmentM.push(segment);
                },
                (error) => {
                  throw new Error(error);
                }
              );
              this.getFormService.getFunctionalMeasurements(res.id_trabajador).subscribe(
                (functional) => {
                  this.functionalM.push(functional);
                },
                (error) => {
                  throw new Error(error);
                }
              );

              this.getFormService.getInjury(res.id_trabajador).subscribe(
                (resInjury)=>{
                  this.injury.push(resInjury)
                },(error)=>{
                  throw new Error(error);
                }
              );
              this.getFormService.getDiase(res.id_trabajador).subscribe(
                (resDiase)=>{
                  this.diase.push(resDiase)
                },(error)=>{
                  throw new Error(error);
                }
              );
              this.getFormService.getMedicine(res.id_trabajador).subscribe(
                (resMedicine)=>{
                  this.medicine.push(resMedicine)
                },(error)=>{
                  throw new Error(error);
                }
              );

              this.getFormService.getGripCapacity(res.id_trabajador).subscribe(
                (gripC)=>{
                  this.gripCapacity.push(gripC)
                },(error)=>{
                  throw new Error(error);
                }
              );


              this.getFormService.getActivity(res.id_trabajador).subscribe(
                (activity) => {
                  this.actiivity.push(activity);
                   this.getFormService.getMuscleActivity(Number(activity.id_actividad)).subscribe(
                    (muscle)=>{
                     this.muscleA.push(muscle);
                    },(error)=>{
                      throw new Error(error);
                    }
                   )
                   this.getFormService.getForceType(Number(activity.id_actividad)).subscribe(
                    (forceT)=>{
                      this.forceType.push(forceT);
                      this.getFormService.getForceExerted(Number(forceT.id_tipo_fuerza)).subscribe(
                        (forceE)=>{
                          this.forceExerted.push(forceE);
                        },(error)=>{
                          //forceExerted
                        }
                      )
                    },(error)=>{
                      throw new Error(error);
                    }
                   )

                   this.getFormService.getGripFeatures(Number(activity.id_actividad)).subscribe(
                    (gripF)=>{
                     this.gripFeatures.push(gripF);
                    },(error)=>{
                      throw new Error(error);
                    }
                   )
                },
                //Activity
                (error) => {
                  throw new Error(error);
                }
              );


              //Worker
            },

            (error) => {
              throw new Error(error);
            }
          );
        });
      },
      //JobPosition
      (error) => {
        throw new Error(error);
      }
    );
      },(error)=>{

        
      }
    );


    
   }
   
     getPages(): number[] {
       return Array(Math.ceil(this.jobP.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
     }
 
   showAllData() {
   this.showAll = true;
  }
 
 previousPage() {
   if (this.currentPage > 1) {
     this.currentPage--;
   }
 }
 
 nextPage() {
   if (this.currentPage < this.totalPages) {
     this.currentPage++;
   }
 }
 
 get totalPages(): number {
   return Math.ceil(this.jobP.length / this.itemsPerPage);
 }
 
 get firstItemOnPage(): number {
   return (this.currentPage - 1) * this.itemsPerPage + 1;
 }
 
 get lastItemOnPage(): number {
   const endIndex = this.currentPage * this.itemsPerPage;
   return endIndex > this.jobP.length ? this.jobP.length : endIndex;
 }
 
 getPaginatedData(): JobPosition[] {
   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
   const endIndex = this.currentPage * this.itemsPerPage;
   return this.jobP.slice(startIndex, endIndex);
 }
 
 
 openEvaluationWindow(position: any) {
 
 
   const filteredWorkers = this.worker.filter(worker => worker.id_puesto_trabajo === position.id_puesto_trabajo);
   const filteredFlootM = this.flootM.filter(flooM => {
     return filteredWorkers.some(worker => worker.id_trabajador === flooM.id_trabajador_pertenece);
   });
   const filteredSittingM = this.sittingM.filter(sittingM => {
     return filteredWorkers.some(worker => worker.id_trabajador === sittingM.id_trabajador_pertenece);
   });
 
   const filteredSegmentgM = this.segmentM.filter(segmentM => {
     return filteredWorkers.some(worker => worker.id_trabajador === segmentM.id_trabajador_pertenece);
   });
 
   const filteredFunctionalM = this.functionalM.filter(fucntionalM => {
     return filteredWorkers.some(worker => worker.id_trabajador === fucntionalM.id_trabajador_pertenece);
   });
 
     const filteredActivity = this.actiivity.filter(actiivity => {
     return filteredWorkers.some(worker => worker.id_trabajador === actiivity.id_trabajador_pertenece);
   });
   
 
    const filteredMuscleActivity  = this.muscleA.filter(muscleA=>{
       return filteredActivity.some(activity=>activity.id_actividad===muscleA.id_actividad_pertenece);
    })
   
 
 const filteredForceType = this.forceType.filter(forceType=>{
       return filteredActivity.some(activity=>activity.id_actividad===forceType.id_actividad_pertenece);
    })
   
 
    const filteredForceExerted = this.forceExerted.filter(forceExerted=>{
     return filteredForceType.some(forceT=>forceT.id_tipo_fuerza===forceExerted.id_tipo_fuerza_pertenece);
  })
 
  const filteredGripFeatures = this.gripFeatures.filter(gripFeatures=>{
   return filteredActivity.some(activity=>activity.id_actividad===gripFeatures.id_actividad_pertenece);
 })
 
 const filteredInjury = this.injury.filter(injury => {
   return filteredWorkers.some(worker => worker.id_trabajador === injury.id_trabajador_pertenece);
 });
 
 const filteredDiase = this.diase.filter(diase => {
   return filteredWorkers.some(worker => worker.id_trabajador === diase.id_trabajador_pertenece);
 });
 
 const filteredMedicine = this.medicine.filter(medicine => {
   return filteredWorkers.some(worker => worker.id_trabajador === medicine.id_trabajador_pertenece);
 });
 
 const filteredGripCapacity = this.gripCapacity.filter(gripC => {
   return filteredWorkers.some(worker => worker.id_trabajador === gripC.id_trabajador_pertenece);
 });
 
 
   
   const content = `
   <!DOCTYPE html>
   <html>
   <head>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
     <style>
       body {
         font-family: Arial, sans-serif;
         margin: 20px;
         line-height: 1.6;
       }
       .image-container {
         display: flex;
         justify-content: space-around;
         align-items: center;
         margin-bottom: 20px;
       }
       img {
         max-width: 200px;
         max-height: 200px;
         margin: 10px;
       }
       .data-section {
         margin-bottom: 30px;
       }
       .data-section h2 {
         border-bottom: 2px solid #ccc;
         padding-bottom: 5px;
       }
       .data-section ul li {
         list-style: none;
       }
       .measurements-table th {
         text-align: center;
       }
     </style>
   
     <script>
       function printPDF() {
         const printButton = document.getElementById('printButton');
         printButton.style.display = 'none'; 
         window.print(); 
         printButton.style.display = 'block'; 
       }
     </script>
   </head>
   <body>
     <div class="container">
       <h1 class="text-center">Evaluación de Medidas Antropométricas</h1>
       
       <div class="data-section">
         <h2>Datos del Puesto</h2>
         <ul class="list-group">
           <li class="list-group-item"><strong>ID Puesto de Trabajo:</strong> ${position.id_puesto_trabajo}</li>
           <li class="list-group-item"><strong>Departamento/Área:</strong> ${position.departamento_area}</li>
           <li class="list-group-item"><strong>ID Campus:</strong> ${position.id_campus_pertenece}</li>
           <li class="list-group-item"><strong>ID Encuestador:</strong> ${position.id_encuestador_pertenece}</li>
         </ul>
       </div>
       
       <div class="data-section">
         <h2>Datos del Trabajador</h2>
         <ul class="list-group">
           <li class="list-group-item"><strong>Nombre:</strong> ${filteredWorkers.map(worker => worker.Nombre).join(', ')}</li>
           <li class="list-group-item"><strong>Apellido:</strong> ${filteredWorkers.map(worker => worker.Apellido).join(', ')}</li>
           <li class="list-group-item"><strong>Edad:</strong> ${filteredWorkers.map(worker => worker.Edad).join(', ')}</li>
           <li class="list-group-item"><strong>Género:</strong> ${filteredWorkers.map(worker => worker.Genero ? 'Masculino' : 'Femenino').join(', ')}</li>
           <li class="list-group-item">
           <strong>Imágenes de trabajador:</strong>
           <div class="image-container">
             <img src="${filteredWorkers.map(worker => worker.imagen_trabajador1).join(', ')}" alt="Imagen Trabajador 1" class="img-thumbnail" style="width: 200px; height: 200px;">
             <img src="${filteredWorkers.map(worker => worker.imagen_trabajador2).join(', ')}" alt="Imagen Trabajador 2" class="img-thumbnail" style="width: 200px; height: 200px;">
           </div>
         </li>        
         </ul>
       </div>
 
       
       <div class="data-section">
       <h2  class="text-center" >Mediciones Antropométricas Básicas</h2>
     
       <h3>Mediciones tomadas mientras la persona está de pie</h3>
       <table class="table table-striped measurements-table">
       <thead>
         <tr>
           <th>Métrica</th>
           <th>Valor</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>Masa (kg)</td>
           <td>${filteredFlootM.map(flootM => flootM.masa).join(', ')}</td>
         </tr>
         <tr>
           <td>Estatura (cm)</td>
           <td>${filteredFlootM.map(flootM => flootM.estatura).join(', ')}</td>
         </tr>
 
         <tr>
           <td>Altura ojo (cm)</td>
           <td>${filteredFlootM.map(flootM => flootM.altura_ojo).join(', ')}</td>
         </tr>
         <tr>
           <td>Altura hombro (cm)</td>
           <td>${filteredFlootM.map(flootM => flootM.altura_hombro).join(', ')}</td>
         </tr>
 
         <tr>
           <td>Altura codo (cm) </td>
           <td>${filteredFlootM.map(flootM => flootM.altura_codo).join(', ')}</td>
         </tr>
         <tr>
           <td>Altura de la entre pierna (cm)</td>
           <td>${filteredFlootM.map(flootM => flootM.altura_entre_pierna).join(', ')}</td>
         </tr>
         <tr>
           <td>Profundidad del cuerpo , de pie (cm)</td>
           <td>${filteredFlootM.map(flootM => flootM.profundidad_cuerpo_de_pie).join(', ')}</td>
         </tr>
         <tr>
           <td>Anchura de la cadera , de pie (cm)</td>
           <td>${filteredFlootM.map(flootM => flootM.anchura_cadera_pie).join(', ')}</td>
         </tr>
       </tbody>
     </table>
     
     <h3>Mediciones tomadas mientras la persona se sienta </h3>
     <table class="table table-striped measurements-table">
     <thead>
       <tr>
         <th>Métrica</th>
         <th>Valor</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>Altura sentado (erguido) (cm)</td>
         <td>${filteredSittingM.map(sittingM => sittingM.altura_sentado).join(', ')}</td>
       </tr>
       <tr>
       <td>Altura de ojo , sentado (cm)</td>
       <td>${filteredSittingM.map(sittingM => sittingM.altura_ojo).join(', ')}</td>
     </tr>
     <tr>
     <td>Altura cervical , sentado  (cm)</td>
     <td>${filteredSittingM.map(sittingM => sittingM.altura_cervical).join(', ')}</td>
   </tr>
   <tr>
   <td>Altura de hombro , sentado  (cm)</td>
   <td>${filteredSittingM.map(sittingM => sittingM.altura_hombro).join(', ')}</td>
 </tr>
 <td>Altura de codo , sentado  (cm)</td>
 <td>${filteredSittingM.map(sittingM => sittingM.altura_codo).join(', ')}</td>
 </tr>
 </tr>
 <td>Longitud del hombro-codo (cm)</td>
 <td>${filteredSittingM.map(sittingM => sittingM.longitud_hombro_codo).join(', ')}</td>
 </tr>
 </tr>
 <td>Ancho del hombro (bideltoido) (cm)</td>
 <td>${filteredSittingM.map(sittingM => sittingM.ancho_hombro).join(', ')}</td>
 </tr>
 </tr>
 <td>Ancho del hombro (bideltoido) (cm)</td>
 <td>${filteredSittingM.map(sittingM => sittingM.ancho_hombro).join(', ')}</td>
 </tr>
 <td>Amplitud entre los codos (cm)</td>
 <td>${filteredSittingM.map(sittingM => sittingM.amplitud_codos).join(', ')}</td>
 </tr>
 </tr>
 <td>Amplitud de cadera  , sentado  (cm)</td>
 <td>${filteredSittingM.map(sittingM => sittingM.amplitud_cadera).join(', ')}</td>
 </tr>
 </tr>
 <td>Amplitud del pliegue popliteo ,sentado  (cm)</td>
 <td>${filteredSittingM.map(sittingM => sittingM.altura_pliegue_popliteo).join(', ')}</td>
 </tr>
 </tr>
 <td>Amplitud del la rodilla ,sentado  (cm)</td>
 <td>${filteredSittingM.map(sittingM => sittingM.altura_rodilla).join(', ')}</td>
 </tr> 
     </tbody>
   </table>
     
   <h3>Mediciones en segmentos corporales específicos </h3>
   <table class="table table-striped measurements-table">
   <thead>
     <tr>
       <th>Métrica</th>
       <th>Valor</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>Longitud de la mano  (estiloide) (cm)</td>
       <td>${filteredSegmentgM.map(segmentM => segmentM.longitud_mano).join(', ')}</td>
     </tr>
     <tr>
     <td>Longitud de la palma(cm)</td>
     <td>${filteredSegmentgM.map(segmentM => segmentM.longitud_palma).join(', ')}</td>
   </tr>
   <tr>
   <td>Amplitud de la mano en los metacarpianos(cm)</td>
   <td>${filteredSegmentgM.map(segmentM => segmentM.amplitud_mano_metacarpios).join(', ')}</td>
 </tr>
 <tr>
 <td>Longitud del dedo índice (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.amplitud_mano_metacarpios).join(', ')}</td>
 </tr>
 <tr>
 <td>Anchura  del dedo índice proximal (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.anchura_dedo_indice_proximal).join(', ')}</td>
 </tr>
 <tr>
 <td>Anchura  del dedo índice dístal (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.ancho_dedo_indice_distal).join(', ')}</td>
 </tr>
 <tr>
 <td>Longitud del pie (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.longitud_pie).join(', ')}</td>
 </tr>
 
 <tr>
 <td>Ancho del pie (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.ancho_pie).join(', ')}</td>
 </tr>
 
 <tr>
 <td>Longitud de la cabeza (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.longitud_cabeza).join(', ')}</td>
 </tr>
 <tr>
 <td>Ancho de la cabeza (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.ancho_cabeza).join(', ')}</td>
 </tr>
 <tr>
 <td>Circuferencia de la cabeza (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.circunferencia_cabeza).join(', ')}</td>
 </tr>
 
 <tr>
 <td>Arco Bitragion (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.arco_bitragion).join(', ')}</td>
 </tr>
 
 <tr>
 <td>Longitud del pulgar (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.longitud_pulgar).join(', ')}</td>
 </tr>
 
 <tr>
 <td>Ancho del pulgar (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.ancho_pulgar).join(', ')}</td>
 </tr>
 
 <tr>
 <td>Circuferencia del brazo flexionado (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.circunferencia_brazo_flexionado).join(', ')}</td>
 </tr>
 
 <tr>
 <td>Circuferencia del antebrazo flexionado (cm)</td>
 <td>${filteredSegmentgM.map(segmentM => segmentM.circunferencia_antebrazo_flexionado).join(', ')}</td>
 </tr>
     
     
   </tbody>
 </table>
     
       <h3>Mediciones Funcionales</h3>
       <table class="table table-striped measurements-table">
       <thead>
         <tr>
           <th>Métrica</th>
           <th>Valor</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>Alcance de agarre ; aalcance hacia delante (cm)</td>
           <td>${filteredFunctionalM.map(functionalM =>functionalM.alcance_agarre).join(', ')}</td>
         </tr>
         <tr>
         <td>Longitud de codo-muñeca (cm)</td>
         <td>${filteredFunctionalM.map(functionalM =>functionalM.longitud_codo_munieca).join(', ')}</td>
       </tr>
       <tr>
       <td>Longitud de agarre del codo (cm)</td>
       <td>${filteredFunctionalM.map(functionalM =>functionalM.longitud_agarre_codo).join(', ')}</td>
     </tr>
     <tr>
     <td>Altura del punño (eje de agarre) (cm)</td>
     <td>${filteredFunctionalM.map(functionalM =>functionalM.altura_punio).join(', ')}</td>
   </tr>
   <tr>
   <td>Profundidad de asiento (cm)</td>
   <td>${filteredFunctionalM.map(functionalM =>functionalM.profundidad_asiento).join(', ')}</td>
 </tr>
 <tr>
 <td>Profundidad de asiento (cm)</td>
 <td>${filteredFunctionalM.map(functionalM =>functionalM.profundidad_asiento).join(', ')}</td>
 </tr>
 <tr>
 <td>Longitud de rodilla-gluteo (cm)</td>
 <td>${filteredFunctionalM.map(functionalM =>functionalM.longitud_rodilla_gluteo).join(', ')}</td>
 </tr>
 <tr>
 <td>Longitud de rodilla-gluteo (cm)</td>
 <td>${filteredFunctionalM.map(functionalM =>functionalM.longitud_rodilla_gluteo).join(', ')}</td>
 </tr>
 <tr>
 <td>Circuferencia de la cintura (cm)</td>
 <td>${filteredFunctionalM.map(functionalM =>functionalM.circunferencia_cintura).join(', ')}</td>
 </tr>
 <tr>
 <td>Circuferencia de la muñeca (cm)</td>
 <td>${filteredFunctionalM.map(functionalM =>functionalM.circunferencia_munieca).join(', ')}</td>
 </tr>
       </tbody>
     </table>
     </div>
 
     <div class="data-section">
     <h2>Datos de la Actividad</h2>
     <ul class="list-group">
       <li class="list-group-item"><strong>Nombre:</strong>${filteredActivity.map(actiivity =>actiivity.nombre_actividad).join(', ')}</li>
       <li class="list-group-item"><strong>Descripción:</strong>${filteredActivity.map(actiivity =>actiivity.descripcion).join(', ')}</li>
   
     </ul>
     <li class="list-group-item">
     <strong>Imágenes de la actividad:</strong>
     <div class="image-container">
       <img src="${filteredActivity.map(activity => activity.imagen1).join(', ')}" alt="Imagen 1" class="img-thumbnail" style="width: 200px; height: 200px;">
       <img src="${filteredActivity.map(activity => activity.imagen2).join(', ')}" alt="Imagen 2" class="img-thumbnail" style="width: 200px; height: 200px;">
       <img src="${filteredActivity.map(activity => activity.imagen3).join(', ')}" alt="Imagen 3" class="img-thumbnail" style="width: 200px; height: 200px;">
     </div>
   </li>
  
   <div class="data-section">
   <h2>Informacion de la Actividad</h2>
   <h3>Actividad Muscular</h3>
   <ul class="list-group">
   <li class="list-group-item">
     <strong>¿Una o más partes del cuerpo permanecen estáticas por más de 1 minuto?</strong>
     <span class="response">${filteredMuscleActivity.map(muscleA => muscleA.cuerpo_estatico ? 'Sí' : 'No').join(', ')}</span>
   </li>
   <li class="list-group-item">
     <strong>¿Se producen movimientos repetitivos más de 4 veces por minuto (excluyendo caminar)?</strong>
     <span class="response">${filteredMuscleActivity.map(muscleA => muscleA.movimientos_repetitivos ? 'Sí' : 'No').join(', ')}</span>
   </li>
   <li class="list-group-item">
     <strong>¿Se producen cambios de postura importantes o se adoptan posturas inestables?</strong>
     <span class="response">${filteredMuscleActivity.map(muscleA => muscleA.cambios_postura ? 'Sí' : 'No').join(', ')}</span>
   </li>
 </ul>
 
 </div>
 
 <div class="data-section">
   <h3>Fuerza Ejercida</h3>
   <ul class="list-group">
     <li class="list-group-item">
       <strong>¿Carga o fuerza menor de 5 kg.?</strong>
       <span class="response">${filteredForceType.map(forceType => forceType.menor_cinco_kilo ? 'Sí' : 'No').join(', ')}</span>
     </li>
     <li class="list-group-item">
       <strong>¿Carga o fuerza entre 5 kg y 10 kg.?</strong>
       <span class="response">${filteredForceType.map(forceType => forceType.entre_cinco_diez_kilo ? 'Sí' : 'No').join(', ')}</span>
     </li>
     <li class="list-group-item">
       <strong>¿Carga o fuerza mayor de 10 kg.?</strong>
       <span class="response">${filteredForceType.map(forceType => forceType.mayor_diez_kilo ? 'Sí' : 'No').join(', ')}</span>
     </li>
     <li class="list-group-item">
       <strong>¿Existen fuerzas o cargas aplicadas bruscamente?</strong>
       <span class="response">${filteredForceExerted.map(forceE => forceE.fuerza_brusca ? 'Sí' : 'No').join(', ')}</span>
     </li>
   </ul>
 </div>
 
 <div class="data-section">
   <h3>Características de agarre de la carga</h3>
   <ul class="list-group">
     <li class="list-group-item">
       <strong>¿ Bueno: El agarre es bueno y la fuerza de agarre de rango medio.?</strong>
       <span class="response">${filteredGripFeatures.map(gripF => gripF.bueno ? 'Sí' : 'No').join(', ')}</span>
     </li>
     <li class="list-group-item">
       <strong>¿ Regular: El agarre es aceptable pero no ideal o el agarre es aceptable utilizando otras partes del cuerpo.?</strong>
       <span class="response">${filteredGripFeatures.map(gripF => gripF.regular? 'Sí' : 'No').join(', ')}</span>
     </li>
     <li class="list-group-item">
       <strong>¿ Malo: El agarre es posible pero no aceptable.?</strong>
       <span class="response">${filteredGripFeatures.map(gripF => gripF.malo ? 'Sí' : 'No').join(', ')}</span>
     </li>
     <li class="list-group-item">
       <strong>¿ Inaceptable: El agarre es torpe e inseguro, no es posible el agarre manual o el agarre es inaceptable utilizando otras partes del cuerpo.?</strong>
       <span class="response">${filteredGripFeatures.map(gripF => gripF.inaceptable ? 'Sí' : 'No').join(', ')}</span>
     </li>
   </ul>
 </div>
 
 <div>
 <h3>Información Adicional del Trabajador</h3>
 <ul class="list-group">
     <li class="list-group-item">
       <strong>¿Quiere reportar alguna molestia, adormecimiento o dolor en alguna parte de su cuerpo?</strong>
       <span class="response">${filteredInjury.map(injury => injury.descripcion).join(', ')}</span>
     </li>
     <li class="list-group-item">
       <strong>¿Padece alguna enfermedad crónica?</strong>
       <span class="response">${filteredDiase.map(diase => diase.nombre_enfermedad).join(', ')}</span>
     </li>
     <li class="list-group-item">
       <strong>¿Toma algún medicamento de forma regular?</strong>
       <span class="response">${filteredMedicine.map(medicine => medicine.descripcion ).join(', ')}</span>
     </li>
     <li class="list-group-item">
       <strong>¿Capacidad de carga?</strong>
       <span class="response">${filteredGripCapacity.map(gripC=> gripC.valor ).join(', ')}</span>
     </li>
   </ul>
 
 </div>
   </div>
     </div>
     <div class="text-center">
       <button id="printButton" onclick="printPDF()" class="btn btn-primary">Imprimir</button>
     </div>
   </body>
   </html>
   
 `;
 
 
 const width = 900;
 const height = 900;
 const left = window.screenLeft + (window.innerWidth / 2) - (width / 2);
 const top = window.screenTop + (window.innerHeight / 2) - (height / 2);
 const evaluationWindow = window.open('', '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
   if (evaluationWindow) {
     evaluationWindow.document.write(content);
     evaluationWindow.document.close(); 
     evaluationWindow.focus();
   } else {
     
     alert('La ventana emergente fue bloqueada. Por favor, habilite las ventanas emergentes para ver la evaluación.');
   }
 }
 
}
