import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { User } from 'src/app/_shared/interface/user';

@Injectable({
  providedIn: 'root'
})
export class MyDetailResolverService implements Resolve<User> {

  constructor(
    private router: Router,
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {

    return this.userService.getMyDetail(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error(error);
        this.router.navigate(['/home']);
        return EMPTY;
    })
    );
  }
}
