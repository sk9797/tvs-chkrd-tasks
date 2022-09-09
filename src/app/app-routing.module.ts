import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'chkrdModalJs', loadChildren: () => import('./chkrd-modal-js/chkrd-modal-js.module').then(m => m.ChkrdModalJsModule) }, 
  { path: 'recaptchaNpm', loadChildren: () => import('./recaptcha-npm/recaptcha-npm.module').then(m => m.RecaptchaNpmModule) }, 
  { path: 'recaptchaBasic', loadChildren: () => import('./recaptcha-basic/recaptcha-basic.module').then(m => m.RecaptchaBasicModule) },
  { path: 'edqTest', loadChildren: () => import('./edq-test/edq-test.module').then(m => m.EdqTestModule) }
]; 



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
