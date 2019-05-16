import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../_shared/interface/user';
import { UserService } from '../_shared/service/user.service';
import { Observable, EMPTY } from 'rxjs';
import { AlertifyService } from '../_shared/service/alertify.service';
import { catchError } from 'rxjs/operators';
import { PaginatedResult } from '../_shared/interface/pagination';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<PaginatedResult<User[]>> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<User[]>> {
      return this.userService.getUserList().pipe(
        catchError(error => {
          this.alertify.error(error);
          this.router.navigate(['/login/login']);
          return EMPTY;
          })
      );
  }

}
