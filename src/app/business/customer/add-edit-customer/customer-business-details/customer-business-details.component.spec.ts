import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBusinessDetailsComponent } from './customer-business-details.component';

describe('CustomerBusinessDetailsComponent', () => {
  let component: CustomerBusinessDetailsComponent;
  let fixture: ComponentFixture<CustomerBusinessDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBusinessDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBusinessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
