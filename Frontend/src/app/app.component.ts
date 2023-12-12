import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
  constructor(private userService: UsersService , private router :Router){

  }
  
  isLoginRoute(): boolean {
    return this.router.url === '/sistema-mediciones/login';

  }
  logout(){
    return this.userService.logout();
  }
  loggedIn() {
    return this.userService.loggedIn();
  }

 
}
