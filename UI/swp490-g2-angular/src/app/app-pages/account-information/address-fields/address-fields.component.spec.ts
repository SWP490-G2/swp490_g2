import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFieldsComponent } from './address-fields.component';

describe('AddressFieldsComponent', () => {
  let component: AddressFieldsComponent;
  let fixture: ComponentFixture<AddressFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
