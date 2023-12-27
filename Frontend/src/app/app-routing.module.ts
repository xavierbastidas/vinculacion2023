import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/users/login/login.component"
import { RegisterComponent } from './components/users/register/register.component';
import { AdminComponent } from './components/roles/administrator/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { PollsterComponent } from './components/roles/pollster/pollster.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { RegistersurveyComponent } from './components/survey/registersurvey/registersurvey.component';
import { ViewsurveyComponent } from './components/survey/viewsurvey/viewsurvey.component';
import { ViewsurveysComponent } from './components/roles/administrator/viewsurveys/viewsurveys.component';
const routes: Routes = [
  { path: '', redirectTo: 'sistema-mediciones/login', pathMatch: 'full' }, 
  { path: 'sistema-mediciones/login', component: LoginComponent },
  { path: 'sistema-mediciones/admin/register-pollster', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'sistema-mediciones/admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'sistema-mediciones/pollster', component: PollsterComponent, canActivate: [AuthGuard] },
  { path: 'sistema-mediciones/pollster/register-survey', component: RegistersurveyComponent , canActivate: [AuthGuard] },
  { path: 'sistema-mediciones/pollster/view-survey', component: ViewsurveyComponent , canActivate: [AuthGuard]},
  { path: 'sistema-mediciones/admin/view-surveys', component: ViewsurveysComponent },


  {path:'**',component:PagenotfoundComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
