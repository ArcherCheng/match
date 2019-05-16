import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from './_shared/shared-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './_shared/nav/nav.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserPhotosComponent } from './user-photos/user-photos.component';
import { UserMatchListComponent } from './user-match-list/user-match-list.component';
import { UserMatchConditionComponent } from './user-match-condition/user-match-condition.component';
// import { CheckboxReactiveComponent } from './_shared/checkbox-reactive/checkbox-reactive.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    UserDetailComponent,
    UserPhotosComponent,
    UserMatchListComponent,
    UserMatchConditionComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
