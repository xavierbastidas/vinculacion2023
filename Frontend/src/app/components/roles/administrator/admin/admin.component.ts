import { Component } from '@angular/core';
import { OnInit   } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { decryptData, environment } from '../../../../../environments/environment.prod';
import { UsersService } from '../../../../services/users.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
  

})
export class AdminComponent implements OnInit {
 name : string | null  = ' ';
  constructor(private cookie : CookieService , private userService: UsersService ) { }

  ngOnInit() {
   const ZAP =  this.cookie.get('3P_ZAP')
   this.name = decryptData(ZAP,environment.SECRET);
  }
  logout(){
    return this.userService.logout();
  }

  }

  
