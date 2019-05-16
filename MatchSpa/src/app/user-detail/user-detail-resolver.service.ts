import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_shared/service/user.service';
import { AlertifyService } from '../_shared/service/alertify.service';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { User } from '../_shared/interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailResolverService implements Resolve<User> {

  constructor(
    private router: Router,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUserDetail(route.params.userId).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return EMPTY;
    })
    );
  }
}
