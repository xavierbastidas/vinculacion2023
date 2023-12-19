import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worker } from '../models/worker';
import { JobPosition } from '../models/jposition';
import { Campus } from '../models/campus';
@Injectable({
  providedIn: 'root'
})
export class FormService {
  apiUrl = "http://localhost:3000/api/v1/form/"
  constructor(private http : HttpClient ) {
    }
    createWorker(worker:Worker){
      return this.http.post<Worker>(this.apiUrl+'registerWorker',worker);
     }
    createJobPosition(job:JobPosition){
      return this.http.post<JobPosition>(this.apiUrl+'jobPosition',job);
    }
    getCampus() {
      return this.http.get<Campus[]>(this.apiUrl + 'campus');
    }

    uploadToImgBB(image: File) {
      const formData = new FormData();
      formData.append('image', image);
    
      return this.http.post<any>('https://api.imgbb.com/1/upload?key=1f9fc010ceef9e3c6eb0959883a47322', formData);
    }

}
