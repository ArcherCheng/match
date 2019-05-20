import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared-module';
import { FileUploadModule } from 'ng2-file-upload';

import { MyDataRoutingModule } from './my-data-routing.module';
import { MyDetailComponent } from './my-detail/my-detail.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { MyLikersComponent } from './my-likers/my-likers.component';
import { MyMessagesThreadComponent } from './my-messages-thread/my-messages-thread.component';
// import { MyMessagesAlertComponent } from './my-messages-alert/my-messages-alert.component';

@NgModule({
  declarations: [
    MyDetailComponent,
    MyPhotosComponent,
    MyMessagesComponent,
    MyMessagesThreadComponent,
    MyLikersComponent,
    // MyMessagesAlertComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MyDataRoutingModule,
    FileUploadModule
  ]
})
export class MyDataModule { }
