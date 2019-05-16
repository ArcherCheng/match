import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserPhoto } from '../_shared/interface/user-photo';
import { UserService } from '../_shared/service/user.service';
import { AlertifyService } from '../_shared/service/alertify.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserPhotosResolverService implements Resolve<UserPhoto[]> {
  constructor(
    private router: Router,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserPhoto[]> {
    return this.userService.getUserPhotos(route.params.userId).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }

}
