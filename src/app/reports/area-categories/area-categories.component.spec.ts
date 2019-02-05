import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCategoriesComponent } from './area-categories.component';

describe('AreaCategoriesComponent', () => {
  let component: AreaCategoriesComponent;
  let fixture: ComponentFixture<AreaCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
