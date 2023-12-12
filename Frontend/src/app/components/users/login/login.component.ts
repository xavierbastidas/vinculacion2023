import { Component, OnInit  , ViewChild} from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  user : User = {} as User;
  submitted = false;
  errorMessage: string = '';
  constructor(private userService : UsersService , private toastr:ToastrService ,
    private router : Router , private cookieService : CookieService){

  }
  ngOnInit(): void {
    
  }

  
  signIn(): void {
    this.submitted = true;
    if (!this.user.correo_usuario || !this.user.contrasenia ) {
      this.errorMessage = 'Por favor complete todos los campos obligatorios';
      return;
    }

    this.userService.signInUser(this.user).subscribe(
      (res) => this.handleSignInSuccess(res),
      (err) => this.handleSignInError(err)
    );
  }
  
  private handleSignInSuccess(response: any): void {
    this.cookieService.set('token', response.token);
this.cookieService.set('nombre', response.nombre);
    const id_rol = Number(response.id_rol); 
    if (id_rol === 1) {
      this.router.navigate(['/sistema-mediciones/admin']);
    } else {
      this.router.navigate(['/sistema-mediciones/pollster']);
    }
  }
  private handleSignInError(error: any): void {
    console.log(error);
    this.errorMessage = 'Nombre de usuario y/o contraseña incorrectos';
  }
}  

