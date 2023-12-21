import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class UploadService {
  apiUrl = environment.apiUrlImage;
  constructor(private http : HttpClient ) { }
  
  uploadImage(file: File): Observable<any> {
    if (!file || !(file instanceof File)) {
      return throwError('El archivo no es válido');
    }
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post<any>(this.apiUrl + 'uploadImgBB', formData);
  }
  
}
