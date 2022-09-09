import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecaptchaBasicRoutingModule } from './recaptcha-basic-routing.module';
import { RecaptchaBasicComponent } from './recaptcha-basic.component';


@NgModule({
  declarations: [
    RecaptchaBasicComponent
  ],
  imports: [
    CommonModule,
    RecaptchaBasicRoutingModule
  ]
})
export class RecaptchaBasicModule { }
