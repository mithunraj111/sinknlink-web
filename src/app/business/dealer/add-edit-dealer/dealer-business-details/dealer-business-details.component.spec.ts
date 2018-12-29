import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerBusinessDetailsComponent } from './dealer-business-details.component';

describe('DealerBusinessDetailsComponent', () => {
  let component: DealerBusinessDetailsComponent;
  let fixture: ComponentFixture<DealerBusinessDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerBusinessDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerBusinessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
