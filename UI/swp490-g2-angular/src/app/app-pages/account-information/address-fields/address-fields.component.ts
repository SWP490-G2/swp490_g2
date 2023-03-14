import { Component } from "@angular/core";
import { AddressClient } from "src/app/ngswag/client";

@Component({
  selector: "app-address-fields",
  templateUrl: "./address-fields.component.html",
  styleUrls: ["./address-fields.component.scss"],
})
export class AddressFieldsComponent {
  provinces = [];
  selectedProvince: any;

  constructor(private $addressClient: AddressClient) {
    $addressClient.getVietnamProvinces().subscribe((res) => {
      console.log(res);
    });
  }
}
