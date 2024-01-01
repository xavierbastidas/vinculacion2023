import { CanActivate, Router , ActivatedRouteSnapshot  } from '@angular/router';
import { UsersService } from './services/users.service';
import { Injectable  } from '@angular/core';
import { Observable  , of } from 'rxjs';
import { catchError , map} from 'rxjs/operators';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isAuthenticated = this.userService.loggedIn();
  
    if (isAuthenticated) {
      const userId = this.userService.getUserIdFromToken();
  
      if (userId) {
        return this.userService.getIdRole(userId).pipe(
          map((userRole: number) => {
            const isAdmin = userRole === 1;
            const isPollster = userRole === 2;
            const requestedPath = route.url[3]?.path || ''; 
            if (isAdmin && (
              route.url[1].path === 'admin' || 
              requestedPath === 'register-pollster' ||
              requestedPath === 'view-surveys'
            )) {
              return true;
            }
  
            if (isPollster && (
              route.url[1].path === 'pollster' || 
              requestedPath === 'register-survey' ||
              requestedPath === 'view-survey'
            )) {
              return true;
            }
  
            this.router.navigate([isAdmin ? '/sistema-mediciones/admin' : '/sistema-mediciones/pollster']);
            return false;
          }),
          catchError(() => of(false))
        );
      }
    }
  
    this.router.navigate(['/sistema-mediciones/login']);
    return of(false);
  }
}  

  