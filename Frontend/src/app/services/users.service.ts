import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Injectable , Inject} from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Admin } from '../models/admin';
import { Pollster } from '../models/pollster';
import { Observable  , catchError  ,throwError} from 'rxjs';
import { environment , decryptData , handleExpiredTokenError } from '../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.apiUrlAuth;
  constructor(private http : HttpClient , private router :Router , @Inject(CookieService) private cookieService: CookieService) { }
  signUpUser(user:User){
   return this.http.post<User>(this.apiUrl+'register',user).pipe(
    catchError((error: HttpErrorResponse) => handleExpiredTokenError(error))
   )
  }

  createAdmin(admin:Admin){
    return this.http.post<Admin>(this.apiUrl+'admin',admin);
   }
   
   createPollster(pollster: Pollster): Observable<Pollster> {
    return this.http.post<Pollster>(this.apiUrl + 'pollster', pollster);
  }
  signInUser(user: User) {
    return this.http.post<User>(this.apiUrl + 'login', user);

  }
  loggedIn() {
  return  (this.cookieService.check('2J_JER') && this.cookieService.check('3P_ZAP'));
  }
  getToken(){
    return this.cookieService.get('2J_JER');
  }
  logout() {
    this.cookieService.delete('2J_JER','/');
    this.cookieService.delete('3P_ZAP','/');    
    this.router.navigate(['/sistema-mediciones/login']);
  }

  getIdRole(id_usuario: number) {
    return this.http.get<number>(`${this.apiUrl}/${id_usuario}`);
  }

  getUserIdFromToken() {
    const JJER = this.getToken();
    const token  = decryptData(JJER,environment.SECRET);
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const id_usuario = payload.id_usuario; 
        return id_usuario;
      }
    }
  }

  checkEmailBD(email:any):Observable<boolean>{
    return this.http.post<any>(this.apiUrl+'checkEmailBD',email);
  }


 


}
