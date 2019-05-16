import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDetailComponent } from './my-detail/my-detail.component';
import { MyDetailResolverService } from './my-detail/my-detail-resolver.service';
import { AuthGuard } from '../_shared/service/auth.guard';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { MyPhotosResolverService } from './my-photos/my-photos-resolver.service';
import { MyLikersComponent } from './my-likers/my-likers.component';
import { MyLikersResolverService } from './my-likers/my-likers-resolver.service';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { MyMessagesResolverService } from './my-messages/my-messages-resolver.service';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'myDetail', component: MyDetailComponent, resolve: { apiResult: MyDetailResolverService } },
      { path: 'myPhotos', component: MyPhotosComponent, resolve: { apiResult: MyPhotosResolverService } },
      { path: 'myLikers', component: MyLikersComponent, resolve: { apiResult: MyLikersResolverService } },
      { path: 'myMessages', component: MyMessagesComponent, resolve: { apiResult: MyMessagesResolverService }},
      { path: '', redirectTo: 'myDetail', pathMatch: 'full' },
      { path: '**', redirectTo: 'myDetail', pathMatch: 'full' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDataRoutingModule { }
