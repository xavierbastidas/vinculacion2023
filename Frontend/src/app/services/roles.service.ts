import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  apiUrl = "http://localhost:3000/api/v1/roles/"
  constructor(private http : HttpClient ) { }
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl+'info');
  }
}