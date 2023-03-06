import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRestaurantInformationComponent } from './update-restaurant-information.component';

describe('UpdateRestaurantInformationComponent', () => {
  let component: UpdateRestaurantInformationComponent;
  let fixture: ComponentFixture<UpdateRestaurantInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRestaurantInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRestaurantInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
