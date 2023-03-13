import { Component } from "@angular/core";
import { MessageService, PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-change-avatar-cover",
  templateUrl: "./change-avatar-cover.component.html",
})
export class ChangeAvatarCoverComponent {
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: "info",
      summary: "File Uploaded",
      detail: "",
    });
  }
}
