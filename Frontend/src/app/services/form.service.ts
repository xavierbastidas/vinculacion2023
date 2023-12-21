import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worker } from '../models/worker';
import { JobPosition } from '../models/jposition';
import { Campus } from '../models/campus';
import { FlootMeasurements } from '../models/fmeasures';
import { environment} from '../../environments/environment.prod';
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
}
