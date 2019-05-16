import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserCondition } from '../_shared/interface/user-condition';
import { AlertifyService } from '../_shared/service/alertify.service';
import { UserService } from '../_shared/service/user.service';
import { AuthService } from '../_shared/service/auth.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserMatchConditionResolverService implements Resolve<UserCondition> {
  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<UserCondition> {
      let userId = 0;
      if (this.authService.isLogin()) {
        userId = +this.authService.decodedToken.nameid;
      }

      return this.userService.getUserCondition(userId).pipe(
        catchError(error => {
          this.alertify.error(error.error);
          this.router.navigate(['/home']);
          return EMPTY;
        })
      );
  }
}
