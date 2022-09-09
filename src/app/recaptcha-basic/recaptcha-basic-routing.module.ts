import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecaptchaBasicComponent } from './recaptcha-basic.component';

const routes: Routes = [{ path: '', component: RecaptchaBasicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecaptchaBasicRoutingModule { }
