import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { switchMap, of } from "rxjs";
import {
  Address,
  Ward,
  District,
  UserClient,
  User,
  City,
} from "src/app/ngswag/client";
import { AddressService } from "src/app/shared/services/address.service";
import { getFullAddress, getLocal, setLocal } from "src/app/utils";

@Component({
  selector: "app-update-shipping-address",
  templateUrl: "./update-shipping-address.component.html",
  styleUrls: ["./update-shipping-address.component.scss"],
})
export class UpdateShippingAddressComponent implements OnInit {
  currentUser?: User;
  destinationAddressLoaded = false;

  @Input() destinationAddress: Address;
  @Output() destinationAddressChange = new EventEmitter<Address>();

  constructor(
    private $address: AddressService,
    private $userClient: UserClient
  ) {}

  ngOnInit() {
    this.$userClient
      .getCurrentUser()
      .pipe(
        switchMap((user) => {
          this.currentUser = user;
          if (!this.currentUser?.id) return of(undefined);

          const destinationAddress = getLocal(
            "destinationAddress/" + this.currentUser.id
          );

          if (destinationAddress) {
            this.destinationAddress = new Address(destinationAddress);
            this.destinationAddress.ward = new Ward(
              this.destinationAddress.ward
            );
            this.destinationAddress.ward.district = new District(
              this.destinationAddress.ward.district
            );
            this.destinationAddress.ward.district.city = new City(
              this.destinationAddress.ward.district.city
            );
          }

          if (!this.$address.isValid(this.destinationAddress) && user.address) {
            this.destinationAddress = user.address;
          }

          this.destinationAddressLoaded = true;
          this.destinationAddressChange.emit(this.destinationAddress);
          return of(undefined);
        })
      )
      .subscribe();
  }

  get fullDestinationAddress(): string {
    return this.$address.isValid(this.destinationAddress)
      ? getFullAddress(this.destinationAddress)
      : "You have to either update your address in settings or update your temporary shipping address by clicking \"Update Shipping Address\" button";
  }

  updateShippingAddress(destinationAddress: any) {
    if (!this.currentUser?.id) return;

    try {
      const specificAddress = destinationAddress.specificAddress;
      const ward = destinationAddress.ward;
      const newAddress = new Address({
        specificAddress: specificAddress,
        ward: ward,
      });

      if (!this.$address.isValid(newAddress)) {
        throw new Error("Invalid Address!");
      }

      this.destinationAddress = newAddress;
      setLocal(
        "destinationAddress/" + this.currentUser.id,
        this.destinationAddress.toJSON()
      );

      this.destinationAddressChange.emit(this.destinationAddress);
    } catch (e) {
      throw new Error("Invalid Address!");
    }
  }
}
