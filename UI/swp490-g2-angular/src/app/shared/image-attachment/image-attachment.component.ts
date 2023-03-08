import { HttpHeaders } from "@angular/common/http";
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { FileUpload } from "primeng/fileupload";
import { AuthService } from "src/app/global/auth.service";
import { FileUploadService } from "src/app/global/file-upload.service";
import { FileClient } from "../../ngswag/client";

@Component({
  selector: "app-image-attachment",
  templateUrl: "./image-attachment.component.html",
  styleUrls: ["./image-attachment.component.scss"]
})
export class ImageAttachmentComponent implements OnInit {
  @Input() height = "90px";
  @Input() width = "90px";
  @Input() url?: string;
  imageStyle: any;
  dialogOpened = false;
  @Input() uploadUrl: string;
  @ViewChild("fileUpload", { static: false }) fileUpload: FileUpload;
  headers: HttpHeaders;
  @Input() method: "POST" | "PUT" = "POST";
  imageSrc: any;
  timeStamp?: number;
  fileUploaded = false;
  images: any[];

  constructor(private $auth: AuthService, private $fileUpload: FileUploadService, private $fileClient: FileClient, private $cdRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.imageStyle = {
      height: this.height,
      width: this.width,
    }

    this.headers = new HttpHeaders({
      "Authorization": `Bearer ${this.$auth.getJwtToken()}`,
    });

    this.loadImage();
  }

  private loadImage() {
    if (this.url) {
      this.$fileClient.load(this.url).subscribe(res => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          this.imageSrc = reader.result;
        }, false);

        if (res) {
          reader.readAsDataURL(res.data);
        }
      });
    }
  }

  openDialog(): void {
    this.dialogOpened = true;
  }

  onUpload() {
    this.fileUploaded = true;
  }

  onOked() {
    this.dialogOpened = false;
    location.reload();
  }

  upload(event: any) {
    const file = event.files[0];
    this.$fileUpload.upload(file, this.uploadUrl, this.method).subscribe({
      next: (event) => {
        this.fileUpload.onProgress.emit(event);
        if (event.type === 1 && event.loaded === event.total) {
          this.fileUpload.onUpload.emit(file);
        }
      }
    })
  }

  progressReport($event: any) {
    if ($event.type === 0) {
      this.fileUpload.progress = 0;
      return;
    }

    this.fileUpload.progress = $event.loaded / $event.total * 100;
  }
}
