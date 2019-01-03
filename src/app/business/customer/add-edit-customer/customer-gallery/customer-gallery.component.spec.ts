import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGalleryComponent } from './customer-gallery.component';

describe('CustomerGalleryComponent', () => {
  let component: CustomerGalleryComponent;
  let fixture: ComponentFixture<CustomerGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
