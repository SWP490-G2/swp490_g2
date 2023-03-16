import { Component } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { GoogleMapService } from "src/app/global/google-map.service";
import { AddressClient, City, District, Ward } from "src/app/ngswag/client";

@Component({
  selector: "app-address-fields",
  templateUrl: "./address-fields.component.html",
  styleUrls: ["./address-fields.component.scss"],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm,
    },
  ],
})
export class AddressFieldsComponent {
  cities: City[] = [];

  districts: District[] = [];

  wards: Ward[] = [];

  timeout: any;

  constructor(
    private $addressClient: AddressClient,
    private $googleMap: GoogleMapService,
    public form: NgForm
  ) {
    $addressClient.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  changeProvince() {
    const selectedCity = <City | undefined>this.form.controls["city"]?.value;
    if (!selectedCity || !selectedCity.id) return;

    this.wards.length = 0;
    this.form.controls["ward"].setValue(undefined);

    this.$addressClient
      .getDistrictsByCityId(selectedCity.id)
      .subscribe((districts) => (this.districts = districts));
  }

  changeDistrict() {
    const selectedDistrict = <District | undefined>(
      this.form.controls["district"]?.value
    );
    if (!selectedDistrict || !selectedDistrict.id) return;

    this.$addressClient
      .getWardsByDistrictId(selectedDistrict.id)
      .subscribe((wards) => (this.wards = wards));
  }

  onSpecificAddressKeyUp() {
    window.clearTimeout(this.timeout);

    this.timeout = window.setTimeout(() => {
      const selectedCity = <City | undefined>this.form.controls["city"]?.value;
      const selectedDistrict = <District | undefined>(
        this.form.controls["district"]?.value
      );
      const selectedWard = <Ward | undefined>this.form.controls["ward"]?.value;
      this.$googleMap
        .getAddressDetails(
          `${this.form.controls["specificAddress"].value}, ${selectedWard?.wardName}, ${selectedDistrict?.districtName}, ${selectedCity?.cityName}`
        )
        .subscribe((res) => console.log(res));
    }, 300);
  }
}
