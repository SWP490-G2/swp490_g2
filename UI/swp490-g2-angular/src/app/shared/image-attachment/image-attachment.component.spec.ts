import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ImageAttachmentComponent } from "./image-attachment.component";

describe("ImageAttachmentComponent", () => {
  let component: ImageAttachmentComponent;
  let fixture: ComponentFixture<ImageAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAttachmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
