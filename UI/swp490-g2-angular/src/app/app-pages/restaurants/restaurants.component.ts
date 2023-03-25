import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { of, switchMap } from "rxjs";
import { GoogleMapService } from "src/app/global/google-map.service";
import {
  Restaurant,
  RestaurantClient,
  SearchRequest,
  User,
  UserClient,
} from "src/app/ngswag/client";
import { getFullAddress } from "src/app/utils";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})
export class RestaurantsComponent implements OnInit, AfterViewInit {
  mapOptions: google.maps.MapOptions = {
    // 21.009751,105.5329757: Vi tri cua truong FPT Hoa Lac
    center: {
      lat: 21.009751,
      lng: 105.5329757,
    },
    zoom: 15,
  };

  currentUser?: User;
  @ViewChild("mapContainer", { static: false }) mapContainer!: ElementRef;
  map?: google.maps.Map;
  restaurants: Restaurant[] = [];

  constructor(
    private $userClient: UserClient,
    private $map: GoogleMapService,
    private $restaurantClient: RestaurantClient
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

          // Di chuyen map toi vi tri cua user
          const pos = new google.maps.LatLng(loc.lat(), loc.lng());
          this.map?.panTo(pos);

          // Them cham do vao map
          new google.maps.Marker({
            position: pos,
            map: this.map,
          });

          return of(undefined);
        })
      )
      .subscribe();

    this.$restaurantClient
      .search(new SearchRequest())
      .pipe(
        switchMap((page) => {
          if (!page.content) return of(undefined);

          this.restaurants = page.content;
          return of(undefined);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
