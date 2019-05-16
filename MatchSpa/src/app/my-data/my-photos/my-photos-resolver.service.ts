import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/_shared/service/user.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserPhoto } from 'src/app/_shared/interface/user-photo';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyPhotosResolverService implements Resolve<UserPhoto[]> {
  constructor(
    private router: Router,
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserPhoto[]> {
    return this.userService.getUserPhotos(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }
}
