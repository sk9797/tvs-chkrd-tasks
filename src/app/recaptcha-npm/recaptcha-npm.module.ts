import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecaptchaNpmRoutingModule } from './recaptcha-npm-routing.module';
import { RecaptchaNpmComponent } from './recaptcha-npm.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    RecaptchaNpmComponent
  ],
  imports: [
    CommonModule,
    RecaptchaNpmRoutingModule,
    RecaptchaV3Module,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey
    }
  ]
})
export class RecaptchaNpmModule { }
