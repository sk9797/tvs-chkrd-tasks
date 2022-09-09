import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecaptchaNpmComponent } from './recaptcha-npm.component';

const routes: Routes = [{ path: '', component: RecaptchaNpmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecaptchaNpmRoutingModule { }
