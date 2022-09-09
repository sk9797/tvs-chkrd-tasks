import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UserRegistrationModel } from './UserRegistrationModel';

@Component({
  selector: 'app-recaptcha-npm',
  templateUrl: './recaptcha-npm.component.html',
  styleUrls: ['./recaptcha-npm.component.scss']
})
export class RecaptchaNpmComponent implements OnInit {
    submitted = false;
    reCAPTCHAToken: string = "";
    tokenVisible: boolean = false;
    registrationInfo!: UserRegistrationModel;

  constructor(private _captchaV3Service: ReCaptchaV3Service, private _builder: FormBuilder) { }

  ngOnInit(): void {
  }

  registerForm = this._builder.group({
    UserName: [''],
    UserEmailId: [''],
    password: [''],
    confirmPassword: ['']
  })


  onSubmit() {
    this._captchaV3Service.execute('importantAction').subscribe((token: string) => {
        this.tokenVisible = true;
        this.reCAPTCHAToken = `Token [${token}] generated`;
    });
}

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this._captchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
      console.debug(`Token [${token}] generated`);
    });
  }

}
