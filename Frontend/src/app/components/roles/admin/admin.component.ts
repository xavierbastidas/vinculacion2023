import { Component } from '@angular/core';
import { OnInit   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'

})
export class AdminComponent implements OnInit {
 name : string | null  = ' ';
  constructor(private route: ActivatedRoute , private cookie : CookieService) { }

  ngOnInit() {
   this.name =  this.cookie.get('nombre')
  }
  

  }

  
