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
            if (
              (route.url[1].path === 'admin' ||
                (route.url[1].path === 'admin' && route.url[2].path === 'register-pollster')) &&
              userRole !== 1
            ) {
              this.router.navigate(['/sistema-mediciones/pollster']);
              return false;
            }
  
            if (
              route.url[1].path === 'pollster' &&
              userRole !== 2
            ) {
              this.router.navigate(['/sistema-mediciones/admin']);
              return false;
            }
  
            return true;
          }),
          catchError(() => of(false))
        );
      }
    }
  
    this.router.navigate(['/sistema-mediciones/login']);
    return of(false);
  }
}  