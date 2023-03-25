import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantUpdateInformationComponent } from './restaurant-update-information.component';

describe('RestaurantUpdateInformationComponent', () => {
  let component: RestaurantUpdateInformationComponent;
  let fixture: ComponentFixture<RestaurantUpdateInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantUpdateInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantUpdateInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
