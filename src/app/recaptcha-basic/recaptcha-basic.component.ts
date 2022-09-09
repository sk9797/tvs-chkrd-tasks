import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RecaptchaBasicService } from '../recaptcha-basic.service';

@Component({
  selector: 'app-recaptcha-basic',
  templateUrl: './recaptcha-basic.component.html',
  styleUrls: ['./recaptcha-basic.component.scss']
})
export class RecaptchaBasicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // onSubmit(){
  //   grecaptcha.ready(() => {
  //     grecaptcha.execute(environment.recaptcha.siteKey, { action: 'contactUs'}).then((token: any) => {
  //       console.log(token);
  //       let body = {
  //         captcha: token
  //       }
  //       this._recapService.checkRecaptcha(body).subscribe({
  //         next: (data) => {
  //           console.log('res', data)
  //         }
  //       })
  //     })
  //   })
  // }

}
