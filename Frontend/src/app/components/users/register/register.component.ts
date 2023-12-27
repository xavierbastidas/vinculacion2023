import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { Pollster } from '../../../models/pollster';

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
finalMessage :string = '';
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
              },
              (error) => {
                console.error('Error al crear el encuestador', error);
                this.errorMessage = 'Error al crear el encuestador';
                this.clearMessagesAfterDelay();
              }
            );
          },
          (error) => {
            if (error === 401) {
              this.errorMessageToken = 'Por favor, vuelva a iniciar sesión';
            }
        }
        );
      }
    },
    (error) => {
      console.error('Error al verificar el correo electrónico', error);
        this.errorMessage = 'Error al verificar el correo electrónico';
        this.clearMessagesAfterDelay();
    }
  );
}

clearMessagesAfterDelay() {
  setTimeout(() => {
    this.errorMessage = '';
    this.successMessage = '';
    this.finalMessage = '';
  }, 7000);
}

}