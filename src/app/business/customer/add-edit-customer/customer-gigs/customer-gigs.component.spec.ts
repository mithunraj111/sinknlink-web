import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGigsComponent } from './customer-gigs.component';

describe('CustomerGigsComponent', () => {
  let component: CustomerGigsComponent;
  let fixture: ComponentFixture<CustomerGigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerGigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
