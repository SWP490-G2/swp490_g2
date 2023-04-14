import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
} from "@angular/core";
import {
  AbstractControl,
  NgForm,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import {
  Address,
  BuyerClient,
  City,
  District,
  FileClient,
  Restaurant,
  User,
  UserClient,
  UserInformationRequest,
  Ward,
} from "src/app/ngswag/client";
import { Title } from "@angular/platform-browser";
import { DateUtils, getFullAddress } from "src/app/utils";
import { finalize, of, switchMap } from "rxjs";
import { GoogleMapService } from "src/app/global/google-map.service";

@Component({
  selector: "app-account-information",
  templateUrl: "./account-information.component.html",
  styleUrls: ["./account-information.component.scss"],
})
export class AccountInformationComponent implements OnInit, AfterViewInit {
  @ViewChild("form", { static: false }) form!: NgForm;
  @Input()
  display = false;
  user?: User;
  restaurants: Restaurant[];
  restaurantsShown = false;

  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $auth: AuthService,
    $title: Title,
    private $userClient: UserClient,
    private $message: MessageService,
    private $map: GoogleMapService,
    private $confirmation: ConfirmationService,
    private $fileClient: FileClient,
    private $buyerClient: BuyerClient
  ) {
    $title.setTitle("Account Information");
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.$auth.getCurrentUser(true).subscribe((user) => {
      this.user = user;
      if (!this.user) return;

      this.form.controls["firstName"].setValue(this.user.firstName);
      this.form.controls["middleName"].setValue(this.user.middleName);
      this.form.controls["lastName"].setValue(this.user.lastName);
      this.form.controls["dateOfBirth"].setValue(
        DateUtils.fromDB(this.user.dateOfBirth)
      );
    });
  }

  ngAfterViewInit(): void {
    const dateOfBirthValidator = (): ValidatorFn => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value >= new Date()) {
          return { dateOfBirth: true };
        }

        return null;
      };
    };

    setTimeout(() => {
      this.form.controls["dateOfBirth"].addValidators([
        Validators.required,
        dateOfBirthValidator(),
      ]);
      this.form.controls["dateOfBirth"].updateValueAndValidity(); // !Important: this line must be added after validators created
    }, 0);
  }

  showDialog() {
    this.display = true;
  }

  navToOpenNewRestaurant() {
    this.$router.navigate(["open-restaurant-request"], {
      relativeTo: this.$route,
    });
  }

  navToListOfRestaurants() {
    this.restaurantsShown = true;
  }

  get isBuyer(): boolean {
    return !!this.user?.buyer;
  }

  getRestaurantName(): string {
    return (<any>this.user).requestingRestaurant.restaurantName;
  }

  getCreatedDate(): any {
    return (<any>this.user).requestingRestaurant.createdAt;
  }

  // get requestingRestaurantJson(): any {
  //   return (<any>this.user)?.requestingRestaurant;
  // }

  getUserDisplay(): string {
    if (this.userExisted()) {
      return <string>this.user?.email;
    }
    return "Account";
  }

  userExisted(): boolean {
    return !!(this.user && this.user.email);
  }

  private _submitButtonDisabled = false;
  get submitButtonDisabled(): boolean {
    return !!this.form?.invalid || this._submitButtonDisabled;
  }

  set submitButtonDisabled(value: boolean) {
    this._submitButtonDisabled = value;
  }

  save() {
    this._submitButtonDisabled = true;
    const formValue = this.form.value;

    this.$map
      .getAddressDetails(
        getFullAddress(
          new Address({
            specificAddress: formValue.specificAddress,
            ward: new Ward({
              wardName: formValue.ward.wardName,
              district: new District({
                districtName: formValue.ward.district.districtName,
                city: new City({
                  cityName: formValue.ward.district.city.cityName,
                }),
              }),
            }),
          })
        )
      )
      .pipe(
        switchMap((res) => {
          const loc = res?.geometry.location;
          return this.$userClient.update(
            new UserInformationRequest({
              firstName: formValue.firstName,
              middleName: formValue.middleName,
              lastName: formValue.lastName,
              dateOfBirth: DateUtils.toDB(formValue.dateOfBirth),
              wardId: formValue.ward.id,
              specificAddress: formValue.specificAddress,
              addressLat: loc?.lat(),
              addressLng: loc?.lng(),
              addressId: this.user?.address?.id,
            })
          );
        }),
        switchMap(() => {
          this.$message.add({
            severity: "success",
            summary: "Success",
            detail: "Account information updated successfully!",
          });

          return of();
        }),
        finalize(() => {
          this._submitButtonDisabled = false;
        })
      )
      .subscribe();
  }

  selectRestaurant(restaurant: Restaurant) {
    this.$confirmation.confirm({
      header: "Confirmation",
      message: `Are you sure that you want to select restaurant "${restaurant.restaurantName}"?`,
      accept: () => {
        const marker = { ...restaurant["marker"] };
        restaurant["marker"] = null;
        this.$buyerClient
          .requestOpeningNewRestaurant(restaurant)
          .subscribe((errorMessage) => {
            if (errorMessage) throw new Error(errorMessage);

            restaurant["marker"] = marker;
            this.display = false;
            location.reload();
          });
      },
    });
  }

  onRestaurantNameClick(restaurant: Restaurant) {
    this.$router.navigate(["restaurant", restaurant.id]);
  }
}
