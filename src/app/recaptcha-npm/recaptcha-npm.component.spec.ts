import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaptchaNpmComponent } from './recaptcha-npm.component';

describe('RecaptchaNpmComponent', () => {
  let component: RecaptchaNpmComponent;
  let fixture: ComponentFixture<RecaptchaNpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecaptchaNpmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecaptchaNpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
