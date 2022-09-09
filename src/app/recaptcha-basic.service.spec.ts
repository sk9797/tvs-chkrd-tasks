import { TestBed } from '@angular/core/testing';

import { RecaptchaBasicService } from './recaptcha-basic.service';

describe('RecaptchaBasicService', () => {
  let service: RecaptchaBasicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecaptchaBasicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
