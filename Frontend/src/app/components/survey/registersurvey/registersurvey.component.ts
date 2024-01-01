import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { Campus } from '../../../models/campus';
import { JobPosition } from '../../../models/jposition';
import { Worker } from '../../../models/worker';
import { UploadService } from '../../../services/upload.service';
import { forkJoin, map } from 'rxjs';
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
  datosAntropometricos: boolean = false;
  datosActividad : boolean = true;
  muscleA : MuscleActivity = {} as MuscleActivity;
  forceType : ForceType = {} as ForceType;
  forceExerted : ForceExerted = {} as ForceExerted;
  gripF : GripFeatures = {} as GripFeatures;
  injury  : Injury ={} as Injury;
  diase : Diase = {} as Diase;
  medicine : Medicine =  {} as Medicine ;
  gripC : GripCapacity = {} as GripCapacity;
  showErrorMessage : string = '';
  showSuccessMessage : string = '';
  showTokenMessage : string = '';

  
  
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

    this.muscleA = {
      cuerpo_estatico:false,
      movimientos_repetitivos:false,
      cambios_postura:false,
      id_actividad_pertenece:0
    }

  }
  ngOnInit(): void {
  this.getCampus()
  }
 

  mostrarAntropometricas() {
    this.mostrarFormularioAntropometricas = true;
    this.mostrarFormularioDatosActividad = false;
    this.formAntr.nativeElement.scrollIntoView({ behavior: 'smooth' });
}

clearMessagesAfterDelay() {
  setTimeout(() => {
    this.showErrorMessage = '';
    this.showSuccessMessage= '';
    this.showTokenMessage= '';
  }, 3000);
}


clearFields(): void {
  this.campus = [];
  this.selectedCampus = {} as Campus;
  this.jobP = {} as JobPosition;
  this.worker = {} as Worker;
  this.flootM = {} as FlootMeasurements;
  this.sittingM = {} as SittingMeasurements;
  this.segmentM = {} as SegmentMeasurements;
  this.functionalM = {} as FunctionalMeasurements;
  this.gripF = {} as GripFeatures;
  this.injury = {} as Injury;
  this.diase = {} as Diase;
  this.medicine = {} as Medicine;
  this.gripC = {} as GripCapacity;
  this.activity = {} as Activity;
  this.muscleA = {} as MuscleActivity;
  this.forceType = {} as ForceType;
  this.forceExerted = {} as ForceExerted;
}

clearActivityImages(): void {
  this.workerAux = null;
  this.activityAux = null;
  const input1 = document.getElementById('imagen1') as HTMLInputElement;
  const input2 = document.getElementById('imagen2') as HTMLInputElement;
  const input3 = document.getElementById('imagen3') as HTMLInputElement;
  const input4 = document.getElementById('imagen4') as HTMLInputElement;
  const input5 = document.getElementById('imagen5') as HTMLInputElement;

    input1.value = '';
    input2.value = '';
    input3.value = '';
    input4.value = '';
    input5.value = '';
}


mostrarDatosActividad() {
    this.mostrarFormularioAntropometricas = false;
    this.mostrarFormularioDatosActividad = true;
    this.formDatosActividad.nativeElement.scrollIntoView({ behavior: 'smooth' });
}

  
validateSelection() {
  if (this.forceExerted.fuerza_brusca === null || this.forceExerted.fuerza_brusca === undefined) {
    this.showErrorMessage='Por favor, selecciona SI o NO';
    return false; 
  }
  return true; 
}



  getCampus() {
    this.formService.getCampus().subscribe(
      (data) => {
        this.campus = data; 
      },
      error => {
       throw new Error (error)
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
  
  selectForceType(selectedType: keyof ForceType) {
    if (!this.forceType[selectedType]) {
      this.forceType = {
        ...this.forceType,
        menor_cinco_kilo: selectedType === 'menor_cinco_kilo',
        entre_cinco_diez_kilo: selectedType === 'entre_cinco_diez_kilo',
        mayor_diez_kilo: selectedType === 'mayor_diez_kilo'
      };
  
     
      const noneSelected = !Object.values(this.forceType).some(value => value);
      if (noneSelected) {
        this.showErrorMessage='Por favor, selecciona al menos una opción.';
        this.clearMessagesAfterDelay();
      }
    }
  }
  
 
  selectGripFeature(selectedType: keyof GripFeatures) {
    if (!this.gripF[selectedType]) {
       this.gripF = { 
        ...this.gripF,
        bueno:selectedType ==='bueno',
        regular : selectedType ==='regular',
        malo : selectedType ==='malo',
        inaceptable : selectedType ==='inaceptable',
       };
      const noneSelected = !Object.values(this.gripF).some(value => value === true);
      if (noneSelected) {
        this.showErrorMessage='Por favor, selecciona al menos una opción.';
        this.clearMessagesAfterDelay();
      }
    }
  }
  
 
  


  selectMuscleActivity(selectedType: keyof MuscleActivity) {
  
    this.muscleA = {
      ...this.muscleA,
      [selectedType]: !this.muscleA[selectedType]
    };
  
    const selectedKeys = Object.keys(this.muscleA).filter(key => this.muscleA[key as keyof MuscleActivity]);
  
    if (selectedKeys.length === 0) {
    
      this.showErrorMessage="Debes seleccionar al menos un elemento.";
      this.clearMessagesAfterDelay();
    } 
  }
  


  async valEval(): Promise<boolean> {
    try {
      const objectsToCheck = [this.jobP, this.workerAux, this.worker, this.flootM, this.sittingM, this.segmentM, this.functionalM];
    
      for (const obj of objectsToCheck) {
        if (Object.keys(obj).length === 0 || Object.values(obj).some(val => val === null || val === '')) {
          this.showErrorMessage='Por favor, ingrese datos válidos para la evaluación';
          this.clearMessagesAfterDelay();
          return false;
        }
      }
    
      const response = await this.formService.checkIdPuestoBD({ id_puesto_trabajo: this.jobP.id_puesto_trabajo }).toPromise();
      const valCedula = this.validarCedula(this.jobP.id_puesto_trabajo);
  
      if (!valCedula) {
        this.showErrorMessage='Por favor, ingrese una cédula válida';
        this.clearMessagesAfterDelay();
        return false;
      }
  
      if (response) {
        this.showErrorMessage='Evaluación existente, por favor ingrese otro ID de puesto de trabajo';
        this.clearMessagesAfterDelay();
        return false;
      } else {
        this.datosAntropometricos = true;
        this.mostrarDatosActividad();
        this.datosActividad = false;
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  


  
  valImg(...images: any[]) {
    for (const img of images) {
       if(!img){
        return false;
       }
    }
    return true;
  }


  valActivity(){
    const objectsToCheck = [this.activity, this.activityAux, this.muscleA, this.forceType,
       this.gripF, this.injury, this.diase,this.medicine,this.gripC];
  
    for (const obj of objectsToCheck) {
      if (Object.keys(obj).length === 0 || Object.values(obj).some(val => val === null || val === '')) {
        return true;
      }
    }
      return false; 
  }


  validarNumerosDecimales(valor: string): boolean {
    const regexNumerosDecimales = /^\d{0,4}(\.\d{0,2})?$/;
    return regexNumerosDecimales.test(valor);
  }
  
  filtrarInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const filteredValue = input.replace(/[^0-9.]/g, ''); 
    const maxLength = 5; 
    if (filteredValue.length > maxLength) {

      (event.target as HTMLInputElement).value = filteredValue.slice(0, maxLength);
    } else {
      (event.target as HTMLInputElement).value = filteredValue;
    }
  }
  
  validarEdad(valor: string): boolean {
    const regexEdad = /^\d{0,3}$/;
    return regexEdad.test(valor);
  }
  
  filtrarEdad(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const filteredValue = input.replace(/\D/g, ''); 
    const maxLength = 3; 
    if (filteredValue.length > maxLength) {
      
      (event.target as HTMLInputElement).value = filteredValue.slice(0, maxLength);
    } else {
      
      (event.target as HTMLInputElement).value = filteredValue;
    }
  }


  validarIdPuesto(valor: string): boolean {
    const regexIdPuesto = /^\d{0,10}$/; 
    return regexIdPuesto.test(valor);
  }
  
  filtrarIdPuesto(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const filteredValue = input.replace(/\D/g, ''); 
    const maxLength = 10; 
    if (filteredValue.length > maxLength) {
      (event.target as HTMLInputElement).value = filteredValue.slice(0, maxLength);
    } else {
      (event.target as HTMLInputElement).value = filteredValue;
    }
  }
  
   validarCedula(cedula: string): boolean {

    if (!/^\d{10}$/.test(cedula)) {
      return false;
    }
  
    const digitos = cedula.split('').map(Number);
    const digitoVerificador = digitos.pop();
    const digitoCalculado = digitos.reduce((acc, val, idx) => {
      const multiplicador = idx % 2 === 0 ? 2 : 1;
      let resultado = val * multiplicador;
      if (resultado > 9) {
        resultado -= 9;
      }
      return acc + resultado;
    }, 0);
  
    const digitoEsperado = (Math.ceil(digitoCalculado / 10) * 10) - digitoCalculado;
  
    return digitoEsperado === digitoVerificador;
  }
  
  





  createEval(){

    const valActivity = this.valActivity();
  
    if(valActivity ){
      this.showErrorMessage='Por favor, Ingrese datos válidos para la evaluación';
      this.clearMessagesAfterDelay();
      return;
    }

    const id_usuario_pertenece = this.userService.getUserIdFromToken();
    this.formService.getIdPollster(id_usuario_pertenece).subscribe(
      (response) => {
        const jobPosition = {
          id_puesto_trabajo: this.jobP.id_puesto_trabajo,
          departamento_area: this.jobP.departamento_area,
          id_campus_pertenece: this.selectedCampus.id_campus,
          id_encuestador_pertenece: response
        };

        this.formService.createJobPosition(jobPosition).subscribe(
          ()=>{ 
          },(error)=>{
            if (error === 401) {
              this.showTokenMessage='Por favor, vuelva a iniciar sesión';
              this.clearMessagesAfterDelay();
            }
          }
        )
      },
      (error) => {
       throw new Error(error);
      }
    );
    
    const image1 = this.workerAux.imagen_trabajador1.file;
    const image2 = this.workerAux.imagen_trabajador2.file;


    const valImg = this.valImg(image1,image2);
    if (!valImg) {
      this.showErrorMessage='No se han seleccionado todas las imágenes.';
      this.clearMessagesAfterDelay();
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
        const worker = {
          Nombre: this.worker.Nombre,
          Apellido: this.worker.Apellido,
          Edad: this.worker.Edad,
          Genero: this.worker.Genero, 
          id_puesto_trabajo: this.jobP.id_puesto_trabajo,
          ...imageUrls
        };
        this.formService.createWorker(worker).subscribe(
          (response :any)=>{
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
            };

            const diase = {
              nombre_enfermedad : this.diase.nombre_enfermedad,
              id_trabajador_pertenece : response
            };

            const medicine = {
              descripcion : this.medicine.descripcion,
              id_trabajador_pertenece  :response
            };
            const gripcapacity = {
              valor :this.gripC.valor,
              id_trabajador_pertenece : response
            };
           
              //Measurements 

              this.formService.flootMeasuresment(flootMeasures).subscribe(
                ()=>{
  
                },(error)=>{
                  throw new Error(error)
                }
              )
  
              this.formService.sittingMeasuresment(sittingMeasures).subscribe(
                ()=>{
  
                },(error)=>{
                  throw new Error(error)
                }
              )
  
              this.formService.segmentMeasuresment(segmentMeasures).subscribe(
                ()=>{
  
                },(error)=>{
                  throw new Error(error)
                }
              )
              
              this.formService.functionalMeasuresment(functionalMeasures).subscribe(
                ()=>{
  
                },(error)=>{
                  throw new Error(error)
                }
              )

            

            //Activity Images 
            const img1 = this.activityAux.imagen1.file;
            const img2 = this.activityAux.imagen2.file;
            const img3 = this.activityAux.imagen3.file;
            const valImgs = this.valImg(img1,img2,img3);
            if (!valImgs) {
              this.showErrorMessage='No se han seleccionado todas las imágenes.';
              this.clearMessagesAfterDelay();
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
              (imageAUrls: any) => {
                const activity = {
                  nombre_actividad: this.activity.nombre_actividad,
                  descripcion: this.activity.descripcion,
                  id_trabajador_pertenece: response,
                  ...imageAUrls
                };
               

                this.formService.createActivity(activity).subscribe(
                  (res)=>{
                    const muscleActivity  = {
                      cuerpo_estatico : this.muscleA.cuerpo_estatico,
                      movimientos_repetitivos : this.muscleA.movimientos_repetitivos,
                      cambios_postura : this.muscleA.cambios_postura,
                      id_actividad_pertenece : Number(res)
                      };

            
                      const forceType ={
                        menor_cinco_kilo : this.forceType.menor_cinco_kilo,
                        entre_cinco_diez_kilo: this.forceType.entre_cinco_diez_kilo,
                        mayor_diez_kilo : this.forceType.mayor_diez_kilo,
                        id_actividad_pertenece :  Number(res)
                      };
                    

                     
                       
                      const gripFeatures = {
                        bueno : this.gripF.bueno,
                        regular : this.gripF.regular,
                        malo : this.gripF.malo,
                        inaceptable : this.gripF.inaceptable,
                        id_actividad_pertenece :Number(res)
 
                      };  
                      this.formService.muscleAcitivity(muscleActivity).subscribe(
                        ()=>{
                        },(error)=>{
                          throw new Error(error)
                        }
                      )

                      this.formService.forceType(forceType).subscribe(
                        (resF)=>{

                           const valSelection = this.validateSelection();

                             if (valSelection)
                             {
                              const forceExerted = {
                                fuerza_brusca : this.forceExerted.fuerza_brusca,
                                id_tipo_fuerza_pertenece : Number(resF)
                              };

                              this.formService.forceExerted(forceExerted).subscribe(
                                ()=>{
    
                                },(error)=>{
                                  throw new Error(error)
                                }
                              )
                             }else{
                              this.showErrorMessage='Debes seleccionar Si o No Porfavor';
                              this.clearMessagesAfterDelay();
                             }
                            
                        },(error)=>{
                          throw new Error(error)
                        }
                      )

                    
                  this.formService.gripFeatures(gripFeatures).subscribe(
                    ()=>{
                     
                          

   this.formService.Injury(injury).subscribe(
    ()=>{

   },(error)=>{
    throw new Error(error)
   }
   )

   this.formService.Diase(diase).subscribe(
    ()=>{

    },(error)=>{
      throw new Error(error)
    }
   )

   this.formService.Medicine(medicine).subscribe(
    ()=>{

    },(error)=>{
      throw new Error(error)
    }
   )
      
   this.formService.gripCapacity(gripcapacity).subscribe(
    ()=>{
     this.showSuccessMessage='Evaluacion creada exitosamente';
     this.clearMessagesAfterDelay();
     this.datosActividad =true;
     this.datosAntropometricos=false;
     this.clearFields();
     this.clearActivityImages();
    },(error)=>{
      throw new Error(error)
    }
   )
    },(error)=>{
            throw new Error(error)
          }
     ) 
     }
    );

                    },(error)=>{
                      throw new Error(error)
                    }
                  )
                  },(error)=>{
                    throw new Error(error)
                  }
                )
              }
            );
            
          


  }
  







  }






