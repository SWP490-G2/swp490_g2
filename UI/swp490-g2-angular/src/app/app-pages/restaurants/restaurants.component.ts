import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MenuItem } from "primeng/api";
import { of, switchMap } from "rxjs";
import { GoogleMapService } from "src/app/global/google-map.service";
import { User, UserClient } from "src/app/ngswag/client";
import { getFullAddress } from "src/app/utils";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})
export class RestaurantsComponent implements OnInit, AfterViewInit {
  mapOptions: google.maps.MapOptions = {
    // 21.009751,105.5329757
    center: {
      lat: 21.009751,
      lng: 105.5329757,
    },
    zoom: 15,
  };

  currentUser?: User;
  @ViewChild("mapContainer", { static: false }) mapContainer!: ElementRef;
  map?: google.maps.Map;

  constructor(
    private $userClient: UserClient,
    private $map: GoogleMapService
  ) {}

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(
      this.mapContainer.nativeElement,
      this.mapOptions
    );

    this.$userClient
      .getCurrentUser()
      .pipe(
        switchMap((user) => {
          this.currentUser = user;
          if (!this.currentUser?.address) return of(undefined);
          return this.$map.getAddressDetails(
            getFullAddress(this.currentUser.address)
          );
        }),
        switchMap((result) => {
          const loc = result?.geometry.location;
          if (!loc) return of(undefined);

          const pos = new google.maps.LatLng(loc.lat(), loc.lng());
          this.map?.panTo(pos);

          const marker = new google.maps.Marker({
            position: pos,
            map: this.map,
          });

          return of(undefined);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
