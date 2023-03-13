import { Component } from "@angular/core";
import { MessageService, PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-update-restaurant-info",
  templateUrl: "./update-restaurant-info.component.html",
})
export class UpdateRestaurantInfoComponent {
  selectedDelivery: any = null;
  time1: Date;
  time2: Date;
  time3: Date;
  time4: Date;
  deliveries: any[] = [
    { name: "Yes", key: "Y" },
    { name: "No", key: "N" },
  ];

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

  ngOnInit() {
    this.selectedDelivery = this.deliveries[1];
  }
}
