import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaptchaBasicComponent } from './recaptcha-basic.component';

describe('RecaptchaBasicComponent', () => {
  let component: RecaptchaBasicComponent;
  let fixture: ComponentFixture<RecaptchaBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecaptchaBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecaptchaBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
