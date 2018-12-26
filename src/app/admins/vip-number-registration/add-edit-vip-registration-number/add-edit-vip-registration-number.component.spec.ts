import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVipRegistrationNumberComponent } from './add-edit-vip-registration-number.component';

describe('AddEditVipRegistrationNumberComponent', () => {
  let component: AddEditVipRegistrationNumberComponent;
  let fixture: ComponentFixture<AddEditVipRegistrationNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditVipRegistrationNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVipRegistrationNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
