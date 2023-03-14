import { Component } from "@angular/core";
import { GoogleMapService } from "src/app/global/google-map.service";
import { AddressClient, City, District, Ward } from "src/app/ngswag/client";

@Component({
  selector: "app-address-fields",
  templateUrl: "./address-fields.component.html",
  styleUrls: ["./address-fields.component.scss"],
})
export class AddressFieldsComponent {
  cities: City[] = [];
  selectedCity?: City;

  districts: District[] = [];
  selectedDistrict?: District;

  wards: Ward[] = [];
  selectedWard?: Ward;

  specificAddress = "";
  timeout: any;

  constructor(
    private $addressClient: AddressClient,
    private $googleMap: GoogleMapService
  ) {
    $addressClient.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  changeProvince() {
    if (!this.selectedCity || !this.selectedCity.id) return;

    this.wards.length = 0;
    this.selectedWard = undefined;
    this.specificAddress = "";

    this.$addressClient
      .getDistrictsByCityId(this.selectedCity.id)
      .subscribe((districts) => (this.districts = districts));
  }

  changeDistrict() {
    if (!this.selectedDistrict || !this.selectedDistrict.id) return;

    this.specificAddress = "";

    this.$addressClient
      .getWardsByDistrictId(this.selectedDistrict.id)
      .subscribe((wards) => (this.wards = wards));
  }

  onSpecificAddressKeyUp() {
    window.clearTimeout(this.timeout);

    this.timeout = window.setTimeout(() => {
      this.$googleMap
        .getAddressDetails(this.specificAddress)
        .subscribe((res) => console.log(res));
    }, 300);
  }
}
