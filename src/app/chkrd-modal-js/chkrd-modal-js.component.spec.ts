import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChkrdModalJsComponent } from './chkrd-modal-js.component';

describe('ChkrdModalJsComponent', () => {
  let component: ChkrdModalJsComponent;
  let fixture: ComponentFixture<ChkrdModalJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChkrdModalJsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChkrdModalJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
