import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PaginatedResult } from 'src/app/_shared/interface/pagination';
import { User } from 'src/app/_shared/interface/user';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyLikersResolverService implements Resolve<PaginatedResult<User[]>> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<User[]>> {
      return this.userService.getMyLikerList(this.authService.decodedToken.nameid).pipe(
        catchError(error => {
          this.alertify.error(error);
          this.router.navigate(['/Home']);
          return EMPTY;
          })
      );
  }

}
