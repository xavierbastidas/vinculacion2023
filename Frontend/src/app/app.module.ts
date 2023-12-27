import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/roles/administrator/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { PollsterComponent } from './components/roles/pollster/pollster.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { RegistersurveyComponent } from './components/survey/registersurvey/registersurvey.component';
import { ViewsurveyComponent } from './components/survey/viewsurvey/viewsurvey.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewsurveysComponent } from './components/roles/administrator/viewsurveys/viewsurveys.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    PollsterComponent,
    PagenotfoundComponent,
    RegistersurveyComponent,
    ViewsurveyComponent,
    ViewsurveysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [AuthGuard , 
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  } , 
  CookieService]  ,
  bootstrap: [AppComponent]

})
export class AppModule { }
