import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-pollster',
  templateUrl: './pollster.component.html',
  styleUrl: './pollster.component.css'
})
export class PollsterComponent  implements OnInit{
  name : string | null  = ' ';
  constructor(private route: ActivatedRoute , private cookie : CookieService) { }

  ngOnInit() {
   this.name =  this.name =  this.cookie.get('nombre')
  }

}
