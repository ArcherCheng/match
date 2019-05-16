import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PaginatedResult } from '../_shared/interface/pagination';
import { User } from '../_shared/interface/user';
import { AlertifyService } from '../_shared/service/alertify.service';
import { UserService } from '../_shared/service/user.service';
import { AuthService } from '../_shared/service/auth.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserMatchListResolverService implements Resolve<PaginatedResult<User[]>> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    console.log('UserMatchListResolverService.constructor');
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<User[]>> {
    return this.userService.getUserMatchList().pipe(
      catchError(error => {
        this.alertify.error(error.error);
        console.log(error);
        this.router.navigate(['/home']);
        return EMPTY;
        })
    );
}
}
