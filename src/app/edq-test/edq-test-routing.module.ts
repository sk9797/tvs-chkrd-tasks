import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdqTestComponent } from './edq-test.component';

const routes: Routes = [{ path: '', component: EdqTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EdqTestRoutingModule { }
