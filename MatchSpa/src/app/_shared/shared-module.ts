import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';

import { MarryPipe } from 'src/app/_shared/pipe/marry.pipe';
import { EducationPipe } from 'src/app/_shared/pipe/education.pipe';
import { UserCardComponent } from './user-card/user-card.component';
import { SexPipe } from './pipe/sex.pipe';
import { CheckboxReactiveComponent } from './checkbox-reactive/checkbox-reactive.component';
import { MyMessagesAlertComponent } from '../my-data/my-messages-alert/my-messages-alert.component';
import { FbLikeComponent } from './social-buttons/FbLikeComponent';

@NgModule({
  declarations: [
    UserCardComponent,
    EducationPipe,
    SexPipe,
    MarryPipe,
    CheckboxReactiveComponent,
    MyMessagesAlertComponent,
    FbLikeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ],
  exports: [
    UserCardComponent,
    EducationPipe,
    MarryPipe,
    SexPipe,
    CheckboxReactiveComponent,
    MyMessagesAlertComponent,
    FbLikeComponent,

    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
  ]
})
export class SharedModule { }
