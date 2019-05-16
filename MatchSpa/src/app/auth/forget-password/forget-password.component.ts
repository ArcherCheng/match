import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  model: any = {};
  
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  forgetPassword() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('變更密碼成玏');
      }, error => {
        this.alertify.error('變更密碼失敗:' + error);
      }, () => {
        this.router.navigate(['/home']);
      }
    );
  }

}
