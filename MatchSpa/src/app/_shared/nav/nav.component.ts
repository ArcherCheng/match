import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navbarCollapsed = true;
  photoUrl: string;

  constructor(
    public router: Router,
    public authService: AuthService,
    private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  isLoggin(): boolean {
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.isLogin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
