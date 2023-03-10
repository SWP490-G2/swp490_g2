import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RequestOpenListComponent } from "./request-open-list.component";

describe("RequestOpenListComponent", () => {
  let component: RequestOpenListComponent;
  let fixture: ComponentFixture<RequestOpenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestOpenListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestOpenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
