import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantInfoComponent } from './add-restaurant-info.component';

describe('AddRestaurantInfoComponent', () => {
  let component: AddRestaurantInfoComponent;
  let fixture: ComponentFixture<AddRestaurantInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRestaurantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
