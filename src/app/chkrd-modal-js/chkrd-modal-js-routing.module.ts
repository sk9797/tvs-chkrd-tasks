import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChkrdModalJsComponent } from './chkrd-modal-js.component';

const routes: Routes = [{ path: '', component: ChkrdModalJsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChkrdModalJsRoutingModule { }
