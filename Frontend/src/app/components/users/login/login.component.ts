import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { encryptData,environment } from '../../../../environments/environment.prod';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  user : User = {} as User;
  submitted = false;
  errorMessage: string = '';
  constructor(private userService : UsersService ,
    private router : Router , private cookieService : CookieService){

  }
  ngOnInit(): void {
    
  }
 

  signIn(): void {
    this.submitted = true;
    if (!this.user.correo_usuario || !this.user.contrasenia) {
      this.errorMessage = 'Por favor complete todos los campos obligatorios';
      return;
    }
  
    this.userService.signInUser(this.user).subscribe(
      (res:any) => {
        if (res.success === false) {
          this.handleSignInError(res.message);
        } else {
          this.handleSignInSuccess(res);
        }
      },
      (err) => {
        this.handleSignInError('Error en la autenticación del usuario');
      }
    );
  }
  
  private handleSignInSuccess(response: any): void {
    const { token, nombre, id_rol } = response;
    const encryptedT = encryptData(token, String(environment.SECRET));
    const encryptedN = encryptData(nombre, String(environment.SECRET));
    this.cookieService.set('2J_JER', encryptedT, undefined, '/');
    this.cookieService.set('3P_ZAP', encryptedN, undefined, '/');
    
    const roleId = Number(id_rol); 
    if (roleId === 1) {
      this.router.navigate(['/sistema-mediciones/admin']);
    } else {
      this.router.navigate(['/sistema-mediciones/pollster']);
    }
  }
  
  private handleSignInError(errorMessage: string): void {
    this.errorMessage = `Email y/o contraseña incorrectos. ${errorMessage}`;
  }

  
  

}


