import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdqTestComponent } from './edq-test.component';

describe('EdqTestComponent', () => {
  let component: EdqTestComponent;
  let fixture: ComponentFixture<EdqTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdqTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdqTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
