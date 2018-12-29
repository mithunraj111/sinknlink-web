import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerPaymentsComponent } from './dealer-payments.component';

describe('DealerPaymentsComponent', () => {
  let component: DealerPaymentsComponent;
  let fixture: ComponentFixture<DealerPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
