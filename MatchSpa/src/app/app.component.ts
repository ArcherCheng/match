import { Component, OnInit, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_shared/service/auth.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {   // , OnDestroy
  title = 'MatchSpa';
  jwtHelper = new JwtHelperService();
  // subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    // this.subscription = this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => window.scrollTo(0, 0));
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
