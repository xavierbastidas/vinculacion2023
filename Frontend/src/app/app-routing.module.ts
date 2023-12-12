import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/users/login/login.component"
import { RegisterComponent } from './components/users/register/register.component';
import { AdminComponent } from './components/roles/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { PollsterComponent } from './components/roles/pollster/pollster.component';
const routes: Routes = [
  { path: '', redirectTo: 'sistema-mediciones/login', pathMatch: 'full' }, 
  { path: 'sistema-mediciones/login', component: LoginComponent },
  { path: 'sistema-mediciones/admin/register-pollster', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'sistema-mediciones/pollster', component: PollsterComponent, canActivate: [AuthGuard] },
  { path: 'sistema-mediciones/admin', component: AdminComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
