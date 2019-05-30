import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { Subject01Component } from './subject01/subject01.component';

@NgModule({
  declarations: [Subject01Component],
  imports: [
    CommonModule,
    TestRoutingModule,
  ]
})
export class TestModule { }
