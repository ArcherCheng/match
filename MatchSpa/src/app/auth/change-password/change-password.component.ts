import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/_shared/interface/loginUser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  // model: ChangePassword;
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  changePassword() {
    if (this.model.newPassword !== this.model.confirmPassword) {
      this.alertify.error('密碼輸入不一致');
      return;
    }

    this.authService.changePassword(this.model).subscribe(
      next => {
        this.alertify.success('變更密碼成玏');
      }, error => {
        this.alertify.error('變更密碼失敗,請檢查輸入資料是否正確');
      }, () => {
        this.router.navigate(['/home']);
      }
    );
  }

}
