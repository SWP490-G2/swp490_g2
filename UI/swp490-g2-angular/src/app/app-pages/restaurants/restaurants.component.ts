import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Observable, of, switchMap } from "rxjs";
import { GoogleMapService } from "src/app/global/google-map.service";
import {
  Address,
  PageRestaurant,
  Restaurant,
  RestaurantCategory,
  RestaurantCategoryClient,
  RestaurantClient,
  SearchRequest,
  SearchRestaurantsRequest,
  User,
  UserClient,
} from "src/app/ngswag/client";
import { getFullAddress, getLocal, setLocal } from "src/app/utils";

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

  distance: any;

  categories: RestaurantCategory[] = [];
  selectedCategories: RestaurantCategory[] = [];

  restaurantMarkers: google.maps.Marker[] = [];
  restaurantFullText = "";
  timeout: any;

  totalRestaurants = 0;
  pageIndex = 0;
  pageSize = 6;

  @Input() hasCurrentUser = true;
  @Input() hasPagination = true;
  @Input() navigateWhenClick = true;
  @Output() restaurantClick = new EventEmitter<Restaurant>();
  @Input() includeInactive = false;
  @Input() isOwner = false;

  constructor(
    private $userClient: UserClient,
    private $map: GoogleMapService,
    private $restaurantClient: RestaurantClient,
    private $title: Title,
    private $router: Router,
    private $restaurantCategoryClient: RestaurantCategoryClient
  ) {
    this.distance =
      getLocal(this.$router.url + "/distance") || this.distances[2];
  }

  ngAfterViewInit(): void {
    if (this.hasCurrentUser) this.$title.setTitle("Restaurants");
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

          if (this.hasCurrentUser)
            return this.getAddressAndMark(this.currentUser.address);

          return of();
        })
      )
      .subscribe();
  }

  searchRestaurants() {
    setLocal(this.$router.url + "/distance", this.distance);

    this.restaurantMarkers.map((marker) => {
      marker.setMap(null);
    });

    this.restaurantMarkers = [];
    const searchRestaurantsRequest = new SearchRestaurantsRequest({
      searchRequest: new SearchRequest({
        page: this.pageIndex,
        size: this.pageSize,
      }),
      restaurantCategories: this.selectedCategories,
    });

    let searchRestaurants: Observable<PageRestaurant>;
    if (this.isOwner) {
      searchRestaurants = this.$restaurantClient.search(
        undefined,
        undefined,
        this.restaurantFullText,
        this.includeInactive,
        true,
        searchRestaurantsRequest
      );
    } else {
      searchRestaurants = this.hasCurrentUser
        ? this.$restaurantClient.search(
            this.distance.value,
            <number>this.currentUser?.id,
            this.restaurantFullText,
            this.includeInactive,
            false,
            searchRestaurantsRequest
          )
        : this.$restaurantClient.search(
            undefined,
            undefined,
            this.restaurantFullText,
            this.includeInactive,
            false,
            searchRestaurantsRequest
          );
    }

    searchRestaurants
      .pipe(
        switchMap((restaurants) => {
          if (!restaurants.content || !restaurants.totalElements) return of();

          this.restaurants = restaurants.content;
          this.totalRestaurants = restaurants.totalElements;

          this.restaurants.map((restaurant) => {
            this.getAddressAndMark(restaurant.address, restaurant).subscribe();
          });

          return of();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.$restaurantCategoryClient
      .getAll()
      .pipe(
        switchMap((categories) => {
          this.categories = [...categories];
          this.selectedCategories = [...this.categories];
          return of();
        })
      )
      .subscribe();
  }

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
          animation: google.maps.Animation.DROP,
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
          if (restaurant) this.onRestaurantNameClick(restaurant);
        });

        if (restaurant) {
          this.restaurantMarkers.push(marker);
          (restaurant as any).marker = marker;
        }

        return of();
      })
    );
  }

  onRestaurantListItemClick(restaurant: Restaurant) {
    if (!(restaurant as any).marker) return;

    this.map?.panTo(
      (restaurant as any).marker.getPosition() as google.maps.LatLng
    );
  }

  onFullTextSearchChange() {
    window.clearTimeout(this.timeout);

    this.timeout = window.setTimeout(() => {
      this.searchRestaurants();
    }, 300);
  }

  onPageChange(event: any) {
    this.pageIndex = event.page;
    this.pageSize = event.rows;
    this.searchRestaurants();
  }

  onRestaurantNameClick(restaurant: Restaurant) {
    if (this.navigateWhenClick) {
      this.$router.navigate(["restaurant", restaurant.id]);
    } else {
      this.restaurantClick.emit(restaurant);
    }
  }
}
