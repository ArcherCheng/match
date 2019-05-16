import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeResolverService } from './home/home-resolver.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolverService } from './user-detail/user-detail-resolver.service';
import { UserPhotosComponent } from './user-photos/user-photos.component';
import { UserPhotosResolverService } from './user-photos/user-photos-resolver.service';
import { UserMatchListComponent } from './user-match-list/user-match-list.component';
import { UserMatchListResolverService } from './user-match-list/user-match-list-resolver.service';
import { UserMatchConditionComponent } from './user-match-condition/user-match-condition.component';
import { UserMatchConditionResolverService } from './user-match-condition/user-match-condition-resolver.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, resolve: { apiResult: HomeResolverService } },
  { path: 'userCondition', component: UserMatchConditionComponent, resolve: {apiResult: UserMatchConditionResolverService} },
  { path: 'userMatchList/:userId', component: UserMatchListComponent, resolve: {apiResult: UserMatchListResolverService} },
  { path: 'userDetail/:userId', component: UserDetailComponent, resolve: { apiResult: UserDetailResolverService } },
  { path: 'userPhotos/:userId', component: UserPhotosComponent, resolve: { apiResult: UserPhotosResolverService } },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'myData', loadChildren: './my-data/my-data.module#MyDataModule' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
//
@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { scrollPositionRestoration: 'top', enableTracing: false },
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// {scrollPositionRestoration: 'enabled', enableTracing: true},
// {scrollPositionRestoration: 'top', enableTracing: true},
