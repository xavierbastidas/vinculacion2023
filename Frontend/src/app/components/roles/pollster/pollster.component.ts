import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { decryptData, environment } from '../../../../environments/environment.prod';
import { UsersService } from '../../../services/users.service';
@Component({
  selector: 'app-pollster',
  templateUrl: './pollster.component.html',
  styleUrl: './pollster.component.css'
})
export class PollsterComponent  implements OnInit{
  name : string | null  = ' ';
  constructor(private route: ActivatedRoute , private cookie : CookieService , private userService: UsersService) { }

  ngOnInit() {
    const ZAP =  this.cookie.get('3P_ZAP')
    this.name = decryptData(ZAP,environment.SECRET);
  }
  logout(){
    return this.userService.logout();
  }

}
