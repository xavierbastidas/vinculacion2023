import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worker } from '../models/worker';
import { JobPosition } from '../models/jposition';
import { Campus } from '../models/campus';
import { FlootMeasurements } from '../models/fmeasures';
import { environment} from '../../environments/environment.prod';
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
export class FormService {
  apiUrl = environment.apiUrlForm;
  constructor(private http : HttpClient ) {
    }
    getCampus() {
      return this.http.get<Campus[]>(this.apiUrl + 'campus');
    }
    createWorker(worker:Worker){
      return this.http.post<Worker>(this.apiUrl+'registerWorker',worker);
     }
    createJobPosition(job:JobPosition){
      return this.http.post<JobPosition>(this.apiUrl+'jobPosition',job);
    }
    flootMeasuresment(fMeasures:FlootMeasurements){
      return this.http.post<JobPosition>(this.apiUrl+'flootM',fMeasures);

    } 
    sittingMeasuresment(sMeasures:SittingMeasurements){
      return this.http.post<SittingMeasurements>(this.apiUrl+'sittingM',sMeasures);
    }
    segmentMeasuresment(segmentMeasures:SegmentMeasurements){
      return this.http.post<SegmentMeasurements>(this.apiUrl+'segmentM',segmentMeasures);
    }
    functionalMeasuresment(functionalMeasures:FunctionalMeasurements){
      return this.http.post<FunctionalMeasurements>(this.apiUrl+'functionalM',functionalMeasures);
      
    }
    createActivity(activity:Activity){
      return this.http.post<Activity>(this.apiUrl+'registerActivity',activity)
    }

    getIdPollster(id_usuario_pertenece: number) {
      return this.http.get<number>(`${this.apiUrl}/${id_usuario_pertenece}`);
    }

    muscleAcitivity(muscleA:MuscleActivity){
      return this.http.post<MuscleActivity>(this.apiUrl+'registerMuscleA',muscleA);
    }

    forceType(forceT:ForceType){
      return this.http.post<ForceType>(this.apiUrl+'addForceActivity',forceT);
    }

    forceExerted(forceE:ForceExerted){
      return this.http.post<ForceExerted>(this.apiUrl+'addForceExerted',forceE);
    }
    gripFeatures(gripF:GripFeatures){
      return this.http.post<GripFeatures>(this.apiUrl+'addGripFeatures',gripF);
    }

    Injury(injury:Injury){
      return this.http.post<Injury>(this.apiUrl+'addInjury',injury);
    }
  
    Diase(diase:Diase){
      return this.http.post<Diase>(this.apiUrl+'addDiase',diase);
    }
    Medicine(medicine:Medicine){
      return this.http.post<Medicine>(this.apiUrl+'addMedicine',medicine);
    }
    gripCapacity(gripC:GripCapacity){
      return this.http.post<GripCapacity>(this.apiUrl+'addGripCapacity',gripC);
    }
}
