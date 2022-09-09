import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChkrdModalJsRoutingModule } from './chkrd-modal-js-routing.module';
import { ChkrdModalJsComponent } from './chkrd-modal-js.component';
import { ModalCompComponent } from './components/modal-comp/modal-comp.component';
import { ModalButtonComponent } from './components/modal-button/modal-button.component';


@NgModule({
  declarations: [
    ChkrdModalJsComponent,
    ModalCompComponent,
    ModalButtonComponent,
  ],
  imports: [
    CommonModule,
    ChkrdModalJsRoutingModule
  ]
})
export class ChkrdModalJsModule { }
