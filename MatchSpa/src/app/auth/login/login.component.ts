import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  @ViewChild('loginForm') editFrom: NgForm;

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('登入成玏');
      }, error => {
        this.alertify.error('登入失敗:' + error);
      }, () => {
        this.router.navigate(['/home']);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.alertify.message('登出系統');
    this.router.navigate(['/home']);
  }


}
