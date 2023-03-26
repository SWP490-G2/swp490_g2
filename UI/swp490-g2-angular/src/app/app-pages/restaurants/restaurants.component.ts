import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { of, switchMap } from "rxjs";
import { GoogleMapService } from "src/app/global/google-map.service";
import {
  Address,
  FilterRequest,
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
  distances = [
    {
      name: "2 km",
      value: 2,
    },
    {
      name: "5 km",
      value: 5,
    },
    {
      name: "10 km",
      value: 10,
    },
  ];

  distance = this.distances[0];

  categories = ["All", "Cơm", "Phở", "Nước giải khát"];
  selectedCategory = this.categories[0];

  restaurantMarkers: google.maps.Marker[] = [];

  constructor(
    private $userClient: UserClient,
    private $map: GoogleMapService,
    private $restaurantClient: RestaurantClient,
    private $title: Title,
    private $router: Router
  ) {
    $title.setTitle("Restaurants");
  }

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
          if (!this.currentUser?.id || !this.currentUser?.address) return of();
          this.searchRestaurants();
          return this.getAddressAndMark(this.currentUser.address);
        })
      )
      .subscribe();
  }

  searchRestaurants() {
    this.restaurantMarkers.map((marker) => {
      marker.setMap(null);
    });

    this.restaurantMarkers = [];

    this.$restaurantClient
      .search(
        this.distance.value,
        <number>this.currentUser?.id,
        new SearchRequest()
      )
      .pipe(
        switchMap((restaurants) => {
          this.restaurants = restaurants;

          this.restaurants.map((restaurant) => {
            this.getAddressAndMark(restaurant.address, restaurant).subscribe();
          });

          return of();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  private getAddressAndMark(address?: Address, restaurant?: Restaurant) {
    if (!address?.id) return of();

    return this.$map.getAddressDetails(getFullAddress(address)).pipe(
      switchMap((result) => {
        const loc = result?.geometry.location;
        if (!loc) return of();

        // Di chuyen map toi vi tri cua user
        const pos = new google.maps.LatLng(loc.lat(), loc.lng());
        if (!restaurant) this.map?.panTo(pos);

        // Them cham do vao map
        const marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          icon: !restaurant ? "assets/images/user-marker.png" : null,
          label: restaurant
            ? {
                fontWeight: "bold",
                fontSize: "14px",
                text: restaurant.restaurantName!,
              }
            : null,
        });

        marker.addListener("click", () => {
          this.$router.navigate(["restaurant", restaurant?.id]);
        });

        if (restaurant) {
          this.restaurantMarkers.push(marker);
          (restaurant as any).marker = marker;
        }

        return of();
      })
    );
  }

  getRestaurantFullAddress(restaurant: Restaurant): string {
    return getFullAddress(restaurant.address);
  }

  changeRadius() {
    this.searchRestaurants();
  }

  onRestaurantListItemClick(restaurant: Restaurant) {
    this.map?.setCenter(
      (restaurant as any).marker.getPosition() as google.maps.LatLng
    );
  }
}
