import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
// import { Observable } from 'rxjs';
// import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  // isSideMenuOpen$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    // private breakpointObserver: BreakpointObserver
    ) { }

  ngOnInit() {
    // this.isSideMenuOpen$ = this.authService.isSideMenuToggle;
  }

  logout() {
    this.authService.logout();
  }

}
