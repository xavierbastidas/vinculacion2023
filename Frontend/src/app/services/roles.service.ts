import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Rol } from '../models/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  apiUrl = "http://localhost:3000/api/v1/roles/"
  constructor(private http : HttpClient , private router :Router ) { }
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl+'info');
  }
}