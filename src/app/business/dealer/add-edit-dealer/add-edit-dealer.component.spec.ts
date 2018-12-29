import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDealerComponent } from './add-edit-dealer.component';

describe('AddEditDealerComponent', () => {
  let component: AddEditDealerComponent;
  let fixture: ComponentFixture<AddEditDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
