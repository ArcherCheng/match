import { Injectable } from '@angular/core';
import { UserMessage } from 'src/app/_shared/interface/user-message';
import { UserService } from 'src/app/_shared/service/user.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyMessagesThreadResolverService implements Resolve<UserMessage[]> {
  recipientId: number;
  messages: UserMessage[];
  newMessage: any = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserMessage[]> {
    return this.userService.getMessageThread(this.authService.decodedToken.nameid, route.params.recipientId).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }
}
