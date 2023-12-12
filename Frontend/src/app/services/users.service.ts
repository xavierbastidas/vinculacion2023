import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Injectable , Inject} from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Admin } from '../models/admin';
import { Pollster } from '../models/pollster';
import { Observable ,throwError , catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = "http://localhost:3000/api/v1/users/"
  constructor(private http : HttpClient , private router :Router , @Inject(CookieService) private cookieService: CookieService) { }
  signUpUser(user:User){
   return this.http.post<User>(this.apiUrl+'register',user).pipe(
    catchError((error: HttpErrorResponse) => this.handleExpiredTokenError(error))
   )
  }

  createAdmin(admin:Admin){
    return this.http.post<Admin>(this.apiUrl+'admin',admin);
   }
   
   createPollster(pollster: Pollster): Observable<Pollster> {
    return this.http.post<Pollster>(this.apiUrl + 'pollster', pollster);
  }
  signInUser(user:User){
    return this.http.post<User>(this.apiUrl+'login',user);
  }
  loggedIn() {
  return  this.cookieService.check('token')
  }
  getToken(){
    return this.cookieService.get('token');
  }
  logout(){
   this.cookieService.delete('token');
   this.cookieService.delete('nombre');
   this.router.navigate(['/sistema-mediciones/login'])
  }

  getIdRole(id_usuario: number) {
    return this.http.get<number>(`${this.apiUrl}/${id_usuario}`);
  }
  
  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const id_usuario = payload.id_usuario; 
        return id_usuario;
      }
    }
    return null;
  }

  checkEmailBD(email:any):Observable<boolean>{
    return this.http.post<any>(this.apiUrl+'checkEmailBD',email);
  }

  handleExpiredTokenError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError('La sesión ha caducado debido a que el token ha expirado');

    }
    return throwError(error);
  }
  
}
