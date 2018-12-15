import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDonationsComponent } from './add-edit-donations.component';

describe('AddEditDonationsComponent', () => {
  let component: AddEditDonationsComponent;
  let fixture: ComponentFixture<AddEditDonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDonationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
