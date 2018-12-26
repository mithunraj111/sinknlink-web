import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipNumberRegistrationComponent } from './vip-number-registration.component';

describe('VipNumberRegistrationComponent', () => {
  let component: VipNumberRegistrationComponent;
  let fixture: ComponentFixture<VipNumberRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipNumberRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipNumberRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
