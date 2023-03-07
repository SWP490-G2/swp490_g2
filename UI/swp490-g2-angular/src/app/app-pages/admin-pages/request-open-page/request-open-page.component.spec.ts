import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RequestOpenPageComponent } from "./request-open-page.component";

describe("RequestOpenPageComponent", () => {
  let component: RequestOpenPageComponent;
  let fixture: ComponentFixture<RequestOpenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestOpenPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestOpenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
