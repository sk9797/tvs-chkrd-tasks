import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdqTestRoutingModule } from './edq-test-routing.module';
import { EdqTestComponent } from './edq-test.component';


@NgModule({
  declarations: [
    EdqTestComponent
  ],
  imports: [
    CommonModule,
    EdqTestRoutingModule
  ]
})
export class EdqTestModule { }
