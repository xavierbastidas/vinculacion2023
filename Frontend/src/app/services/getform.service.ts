import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { JobPosition } from '../models/jposition';
import { FlootMeasurements } from '../models/fmeasures';
import { SittingMeasurements } from '../models/smeasures';
import { SegmentMeasurements } from '../models/segmentmeasures';
import { FunctionalMeasurements } from '../models/functionmeasures';
import { Activity } from '../models/activity';
import { MuscleActivity } from '../models/muscleactivity';
import { ForceType } from '../models/forcetype';
import { ForceExerted } from '../models/forcexerted';
import { GripFeatures } from '../models/gripfeatures';
import { Injury } from '../models/injury';
import { Diase } from '../models/diase';
import { Medicine } from '../models/medicine';
import { GripCapacity } from '../models/gripcapacity';

@Injectable({
  providedIn: 'root'
})
export class GetformService {
  apiUrl = environment.apiUrlGetForm;
  constructor(private http : HttpClient) {

   }
   getJobPosition() {
    return this.http.get<JobPosition[]>(this.apiUrl + 'JobPosition');
  }

  getWorker(id_puesto_trabajo: string) {
    return this.http.get<Worker>(`${this.apiUrl}worker/${id_puesto_trabajo}`)
  }

  getFlootMeasurements(id_trabajador_pertenece:number){
    return this.http.get<FlootMeasurements>(`${this.apiUrl}flootM/${id_trabajador_pertenece}`)
  }
  
  getSittingMeasurements(id_trabajador_pertenece:number){
    return this.http.get<SittingMeasurements>(`${this.apiUrl}sittingM/${id_trabajador_pertenece}`)
  }
  
  getSegmentMeasurements(id_trabajador_pertenece:number)
  {
    return this.http.get<SegmentMeasurements>(`${this.apiUrl}segmentM/${id_trabajador_pertenece}`)
  }

  getFunctionalMeasurements(id_trabajador_pertenece:number){
    return this.http.get<FunctionalMeasurements>(`${this.apiUrl}functionalM/${id_trabajador_pertenece}`)
  }
  getActivity(id_trabajador_pertenece:number){
    return this.http.get<Activity>(`${this.apiUrl}activity/${id_trabajador_pertenece}`)
  }
  getMuscleActivity(id_actividad_pertenece:number){
    return this.http.get<MuscleActivity>(`${this.apiUrl}muscleActivity/${id_actividad_pertenece}`)
  }

  getForceType(id_actividad_pertenece:number){
    return this.http.get<ForceType>(`${this.apiUrl}forceType/${id_actividad_pertenece}`)
  }

  getForceExerted(id_tipo_fuerza:number){
    return this.http.get<ForceExerted>(`${this.apiUrl}forceExerted/${id_tipo_fuerza}`)
  }

  getGripFeatures(id_actividad_pertenece:number){
    return this.http.get<GripFeatures>(`${this.apiUrl}gripF/${id_actividad_pertenece}`)

  }

  getInjury(id_trabajador_pertenece:number){

 return this.http.get<Injury>(`${this.apiUrl}injury/${id_trabajador_pertenece}`)
  }


  getDiase(id_trabajador_pertenece:number){

    return this.http.get<Diase>(`${this.apiUrl}diase/${id_trabajador_pertenece}`)
     }


     getMedicine(id_trabajador_pertenece:number){

      return this.http.get<Medicine>(`${this.apiUrl}medicine/${id_trabajador_pertenece}`)
       }

       getGripCapacity(id_trabajador_pertenece:number){

        return this.http.get<GripCapacity>(`${this.apiUrl}gripC/${id_trabajador_pertenece}`)
         }

         getJobPositionID(id_encuestador_pertenece:number){

          return this.http.get<JobPosition[]>(`${this.apiUrl}jobPosition/${id_encuestador_pertenece}`)
           }
  
           
  
}
