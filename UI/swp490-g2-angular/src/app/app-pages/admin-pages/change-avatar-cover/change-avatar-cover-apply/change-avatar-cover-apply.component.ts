import { Component } from "@angular/core";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-change-avatar-cover-apply",
  templateUrl: "./change-avatar-cover-apply.component.html",
})
export class ChangeAvatarCoverApplyComponent {
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
