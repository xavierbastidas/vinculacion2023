import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { Campus } from '../../../models/campus';
import { JobPosition } from '../../../models/jposition';
import { Worker } from '../../../models/worker';
import { UploadService } from '../../../services/upload.service';
import { forkJoin, isEmpty, map } from 'rxjs';
import { FlootMeasurements } from '../../../models/fmeasures';
import { ViewChild, ElementRef } from '@angular/core';
import { SittingMeasurements } from '../../../models/smeasures';
import { SegmentMeasurements } from '../../../models/segmentmeasures';
import { FunctionalMeasurements } from '../../../models/functionmeasures';
import { Activity } from '../../../models/activity';
import { UsersService } from '../../../services/users.service';
import { MuscleActivity } from '../../../models/muscleactivity';
import { ForceType } from '../../../models/forcetype';
import { ForceExerted } from '../../../models/forcexerted';
import { GripFeatures } from '../../../models/gripfeatures';
import { Injury } from '../../../models/injury';
import { Diase } from '../../../models/diase';
import { Medicine } from '../../../models/medicine';
import { GripCapacity } from '../../../models/gripcapacity';




@Component({
  selector: 'app-registersurvey',
  templateUrl: './registersurvey.component.html',
  styleUrl: './registersurvey.component.css'
})
export class RegistersurveyComponent implements OnInit{
  @ViewChild('formAntr') formAntr!: ElementRef;
  @ViewChild('formDatosActividad') formDatosActividad!: ElementRef;
  campus: Campus[] = [];
  selectedCampus :Campus = {} as Campus;
  jobP : JobPosition = {} as JobPosition;
  worker : Worker = {} as Worker;
  workerAux : any;
  activityAux :any;
  flootM : FlootMeasurements = {} as FlootMeasurements;
  sittingM : SittingMeasurements = {} as SittingMeasurements;
  segmentM : SegmentMeasurements = {} as SegmentMeasurements;
  functionalM : FunctionalMeasurements = { } as FunctionalMeasurements;
  activity : Activity = {} as Activity ;
  mostrarFormularioAntropometricas: boolean = true;
  mostrarFormularioDatosActividad: boolean = false;
  isChecked: boolean = false;
  datosAntropometricos: boolean = false;
  datosActividad : boolean = true;
  seleccionados: string[] = [];
  muscleA : MuscleActivity = {} as MuscleActivity;
  forceType : ForceType = {} as ForceType;
  forceExerted : ForceExerted = {} as ForceExerted;
  gripF : GripFeatures = {} as GripFeatures;
  injury  : Injury ={} as Injury;
  diase : Diase = {} as Diase;
  medicine : Medicine =  {} as Medicine ;
  gripC : GripCapacity = {} as GripCapacity;
  
  
  constructor(private formService : FormService , private uploadService : UploadService,
    private userService : UsersService){
    this.workerAux = {
      imagen_trabajador1: { file: null, url: null },
      imagen_trabajador2: { file: null, url: null }
    };
    this.activityAux = {
      imagen1: { file: null, url: null },
      imagen2: { file: null, url: null },
      imagen3: { file: null, url: null }
    };
  }
  ngOnInit(): void {
  this.getCampus()
  }
 
  handleChange() {
    console.log('El valor cambió a:', this.isChecked);
   
  }

  datosPuestoCompletos(): boolean {
   
    return false;
}



limitarSeleccion(opcion: string) {
  if (this.seleccionados.includes(opcion)) {
    const index = this.seleccionados.indexOf(opcion);
    this.seleccionados.splice(index, 1);
  } else {
    if (this.seleccionados.length < 2) {
      this.seleccionados.push(opcion);
    }
  }
}


 

  mostrarAntropometricas() {
    this.mostrarFormularioAntropometricas = true;
    this.mostrarFormularioDatosActividad = false;
    this.formAntr.nativeElement.scrollIntoView({ behavior: 'smooth' });
}

mostrarDatosActividad() {
    this.mostrarFormularioAntropometricas = false;
    this.mostrarFormularioDatosActividad = true;
    this.formDatosActividad.nativeElement.scrollIntoView({ behavior: 'smooth' });
}

  

  getCampus() {
    this.formService.getCampus().subscribe(
      (data) => {
        this.campus = data; 

      },
      error => {
        console.error('Error al obtener campus:', error);
      }
    );
  }

 
  onFileSelected(event: any, property: string) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (property === 'imagen_trabajador1') {
          this.workerAux.imagen_trabajador1.file = file;
          this.workerAux.imagen_trabajador1.url = reader.result as string;
        } else if (property === 'imagen_trabajador2') {
          this.workerAux.imagen_trabajador2.file = file;
          this.workerAux.imagen_trabajador2.url = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  onFileSelected1(event: any, property: string) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (property === 'imagen1') {
          this.activityAux.imagen1.file = file;
          this.activityAux.imagen1.url = reader.result as string;
        } else if (property === 'imagen2') {
          this.activityAux.imagen2.file = file;
          this.activityAux.imagen2.url = reader.result as string;
        }
        else if ((property === 'imagen3') ){

          this.activityAux.imagen3.file = file;
          this.activityAux.imagen3.url = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
 

  valEval() {
    const objectsToCheck = [this.jobP, this.workerAux, this.worker, this.flootM, this.sittingM, this.segmentM, this.functionalM];
    
    for (const obj of objectsToCheck) {
      if (Object.keys(obj).length === 0 || Object.values(obj).some(val => val === null || val === '')) {
        console.log('Por favor, ingrese datos válidos para la evaluación');
        return false;
      }
    }
  
    this.datosAntropometricos = true;
    this.mostrarDatosActividad();
    this.datosActividad = false;
    console.log('Datos almacenados para la evaluación');
    return true;
  }
  




  createEval() {
    const userId = this.userService.getUserIdFromToken();
    const pollsterId =  this.formService.getIdPollster(Number(userId));
    const jobPosition = {
      id_puesto_trabajo: this.jobP.id_puesto_trabajo,
      departamento_area: this.jobP.departamento_area,
      id_campus_pertenece: this.selectedCampus.id_campus,
      id_encuestador_pertenece : Number(pollsterId)
    };
  
    const image1 = this.workerAux.imagen_trabajador1.file;
    const image2 = this.workerAux.imagen_trabajador2.file;
  
    if (!image1 || !image2) {
      console.error('No se han seleccionado todas las imágenes.');
      return;
    }
  
    const uploadImage1$ = this.uploadService.uploadImage(image1);
    const uploadImage2$ = this.uploadService.uploadImage(image2);
  
    forkJoin({ image1: uploadImage1$, image2: uploadImage2$ }).pipe(
      map((responses: any) => ({
        imagen_trabajador1: responses.image1.imageUrl,
        imagen_trabajador2: responses.image2.imageUrl
      }))
    ).subscribe(
      (imageUrls: any) => {
        const workerData = {
          Nombre: this.worker.Nombre,
          Apellido: this.worker.Apellido,
          Edad: this.worker.Edad,
          Genero: this.worker.Genero,
          id_puesto_trabajo: jobPosition.id_puesto_trabajo,
          ...imageUrls
        };
        
        this.formService.createJobPosition(jobPosition).subscribe(
          () => {
            this.formService.createWorker(workerData).subscribe(
              (response: any) => {
                const flootMeasures = {
                  masa: this.flootM.masa,
                  estatura: this.flootM.estatura,
                  altura_ojo: this.flootM.altura_ojo,
                  altura_hombro: this.flootM.altura_hombro,
                  altura_codo: this.flootM.altura_codo,
                  altura_entre_pierna: this.flootM.altura_entre_pierna,
                  profundidad_cuerpo_de_pie: this.flootM.profundidad_cuerpo_de_pie,
                  anchura_cadera_pie: this.flootM.anchura_cadera_pie,
                  id_trabajador_pertenece: response
                };
                const sittingMeasures = {
                  altura_sentado : this.sittingM.altura_sentado,
                  altura_ojo : this.sittingM.altura_ojo,
                  altura_cervical : this.sittingM.altura_cervical,
                  altura_hombro : this.sittingM.altura_ojo,
                  altura_codo : this.sittingM.altura_codo,
                  longitud_hombro_codo : this.sittingM.longitud_hombro_codo,
                  ancho_hombro : this.sittingM.ancho_hombro,
                  amplitud_codos : this.sittingM.amplitud_codos,
                  amplitud_cadera : this.sittingM.amplitud_cadera ,
                  altura_pliegue_popliteo : this.sittingM.altura_pliegue_popliteo,
                  altura_rodilla : this.sittingM.altura_rodilla,
                  id_trabajador_pertenece: response
                };
                const segmentMeasures = {
                  longitud_mano : this.segmentM.longitud_mano,
                  longitud_palma : this.segmentM.longitud_palma,
                  amplitud_mano_metacarpios : this.segmentM.amplitud_mano_metacarpios,
                  longitud_dedo_indice : this.segmentM.longitud_dedo_indice,
                  anchura_dedo_indice_proximal : this.segmentM.anchura_dedo_indice_proximal,
                  ancho_dedo_indice_distal : this.segmentM.ancho_dedo_indice_distal,
                  longitud_pie : this.segmentM.longitud_pie,
                  ancho_pie : this.segmentM.ancho_pie,
                  longitud_cabeza : this.segmentM.longitud_cabeza,
                  ancho_cabeza : this.segmentM.ancho_cabeza,
                  circunferencia_cabeza : this.segmentM.circunferencia_cabeza,
                  arco_bitragion : this.segmentM.arco_bitragion,
                  longitud_pulgar : this.segmentM.longitud_pulgar,
                  ancho_pulgar :  this.segmentM.ancho_pulgar,
                  circunferencia_brazo_flexionado : this.segmentM.circunferencia_brazo_flexionado,
                  circunferencia_antebrazo_flexionado : this.segmentM.circunferencia_antebrazo_flexionado,
                  id_trabajador_pertenece: response
                };
                const functionalMeasures = {
                  alcance_agarre : this.functionalM.alcance_agarre,
                  longitud_codo_munieca : this.functionalM.longitud_codo_munieca,
                  longitud_agarre_codo : this.functionalM.longitud_agarre_codo,
                  altura_punio : this.functionalM.altura_punio,
                  profundidad_asiento : this.functionalM.profundidad_asiento,
                  longitud_rodilla_gluteo : this.functionalM.longitud_rodilla_gluteo,
                  circunferencia_cintura : this.functionalM.circunferencia_cintura,
                  circunferencia_munieca : this.functionalM.circunferencia_munieca,
                  id_trabajador_pertenece: response
                };

                const injury = {
                  descripcion : this.injury.descripcion,
                  id_trabajador_pertenece :  response
                }

                const diase = {
                  nombre_enfermedad : this.diase.nombre_enfermedad,
                  id_trabajador_pertenece : response
                }

                const medicine = {
                  descripcion : this.medicine.descripcion,
                  id_trabajador_pertenece  :response
                }
                const gripcapacity = {
                  valor :this.gripC.valor,
                  id_trabajador_pertenece : response
                }
  
                const img1 = this.activityAux.imagen1.file;
                const img2 = this.activityAux.imagen2.file;
                const img3 = this.activityAux.imagen3.file;
  
                if (!img1 || !img2 || !img3) {
                  console.error('No se han seleccionado todas las imágenes.');
                  return;
                }
  
                const uploadImg1$ = this.uploadService.uploadImage(img1);
                const uploadImg2$ = this.uploadService.uploadImage(img2);
                const uploadImg3$ = this.uploadService.uploadImage(img3);
  
                forkJoin({ img1: uploadImg1$, img2: uploadImg2$, img3: uploadImg3$ }).pipe(
                  map((responses: any) => ({
                    imagen1: responses.img1.imageUrl,
                    imagen2: responses.img2.imageUrl,
                    imagen3: responses.img3.imageUrl,
                  }))
                ).subscribe(
                  (imageUrls: any) => {
                    const activity = {
                      nombre_actividad: this.activity.nombre_actividad,
                      descripcion: this.activity.descripcion,
                      id_puesto_trabajo: response,
                      ...imageUrls
                    };
  
                    this.formService.flootMeasuresment(flootMeasures).subscribe(() => {
                      console.log("Mediciones creadas exitosamente");
  
                      this.formService.sittingMeasuresment(sittingMeasures).subscribe(() => {
                        console.log("Mediciones 2 creadas exitosamente");
                      });
  
                      this.formService.segmentMeasuresment(segmentMeasures).subscribe(() => {
                        console.log("Mediciones 3 creadas exitosamente");
                      });
  
                      this.formService.functionalMeasuresment(functionalMeasures).subscribe(() => {
                        console.log("Datos Antropometricos creados exitosamente");
                      });
  
                      this.formService.createActivity(activity).subscribe((response) => {
                        console.log("Actividades creadas exitosamente");

                        const muscleActivity = {
                        cuerpo_estatico : this.muscleA.cuerpo_estatico,
                        movimientos_repetitivos : this.muscleA.movimientos_repetitivos,
                        cambios_postura : this.muscleA.cambios_postura,
                        id_actividad_pertenece : Number(response.id_actividad)
                        }
                        const forceType ={
                          menor_cinco_kilo : this.forceType.menor_cinco_kilo,
                          entre_cinco_diez_kilo: this.forceType.entre_cinco_diez_kilo,
                          mayor_diez_kilo : this.forceType.mayor_diez_kilo,
                          id_actividad_pertenece : Number(response.id_actividad)
                        }

                        const gripFeatures = {
                          bueno : this.gripF.bueno,
                          regular : this.gripF.regular,
                          malo : this.gripF.malo,
                          inaceptable : this.gripF.inaceptable,
                          id_actividad_pertenece : Number(response.id_actividad)

                        }

                       
                        this.formService.muscleAcitivity(muscleActivity).subscribe(()=>{

                        })

                        this.formService.forceType(forceType).subscribe((response)=>{
                           
                          const forceExerted = {
                            fuerza_brusca : this.forceExerted.fuerza_brusca,
                            id_tipo_fuerza_pertenece : Number(response.id_tipo_fuerza)
                          }

                          this.formService.forceExerted(forceExerted).subscribe(()=>{

                          })

                          this.formService.gripFeatures(gripFeatures).subscribe(()=>{

                          })
                          this.formService.Injury(injury).subscribe(()=>{

                          })
                          this.formService.Diase(diase).subscribe(()=>{

                          })
                          this.formService.Medicine(medicine).subscribe(()=>{

                          })
                          this.formService.gripCapacity(gripcapacity).subscribe(()=>{
                            
                          })
                        })
                      });
                        
                      
                      
                    },
                    (error) => {
                      console.error('Error al crear trabajador:', error);
                    });
                  },
                  (error) => {
                    console.error('Error al crear puesto de trabajo:', error);
                  }
                );
              },
              (error) => {
                console.error('Error al subir imagen:', error);
              }
            );
          }
        );
      }
    );
  }
  

}

  



    
