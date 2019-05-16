import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService
    ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLogin()) {
      return true;
    }
    this.alertify.error('你尚未登入,無法通過授權進入');
    this.router.navigate(['/auth/login']);
    return false;
  }

}

