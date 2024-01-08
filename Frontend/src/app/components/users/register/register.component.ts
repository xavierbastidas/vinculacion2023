import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { Pollster } from '../../../models/pollster';
import { decryptData , environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
user: User = {} as User;
pollster : Pollster = {} as Pollster;
errorMessage : string = ' ';
successMessage : string = ' ';
errorMessageToken : string = '';

constructor(private userService: UsersService ){
 
}
ngOnInit(): void {

 
}


createPollster() {
  if (!this.user.correo_usuario || !this.user.contrasenia) {
    this.errorMessage = 'Por favor complete todos los campos';
    this.clearMessagesAfterDelay();
    return;
  }

  const emailDomain = this.user.correo_usuario.split('@')[1];
  if (emailDomain !== 'uta.edu.ec') {
    this.errorMessage = 'El dominio del correo electrónico debe ser @uta.edu.ec';
    this.clearMessagesAfterDelay();
    return;
  }

  if (this.user.contrasenia.length !== 8) {
    this.errorMessage = 'La contraseña debe tener 8 caracteres de longitud';
    this.clearMessagesAfterDelay();
    return;
  }

  this.userService.checkEmailBD({ correo_usuario: this.user.correo_usuario }).subscribe(
    (emailExists: boolean) => {
      if (emailExists) {
        this.errorMessage = 'El correo electrónico ya existe';
        this.clearMessagesAfterDelay();
      } else {
        const userToSignUp = {
          correo_usuario: this.user.correo_usuario,
          contrasenia: this.user.contrasenia,
          id_rol_pertenece: 2,
          token: ''
        };

        this.userService.signUpUser(userToSignUp).subscribe(
          (user: any) => {
            const pollsterToCreate = {
              Nombre: this.pollster.Nombre,
              Apellido: this.pollster.Apellido,
              id_usuario_pertenece: user
            };

            this.userService.createPollster(pollsterToCreate).subscribe(
              () => {
                this.successMessage = 'Encuestador creado exitosamente';
                this.clearMessagesAfterDelay();
                this.user = {} as User;
                this.pollster = {} as Pollster;
              },
              (error) => {
               throw new Error(error)
              }
            );
          },
          (error) => {
            if (error === 401) {
              this.errorMessageToken = 'Por favor, vuelva a iniciar sesión';
              this.clearMessagesAfterDelay();
            }
        }
        );
      }
    },
    (error) => {
        throw new Error(error)
    }
  );
}

clearMessagesAfterDelay() {
  setTimeout(() => {
    this.errorMessage = '';
    this.successMessage = '';
    this.errorMessageToken= '';
  }, 5000);
}

}