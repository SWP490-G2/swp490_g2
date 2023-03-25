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
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import {
  Address,
  City,
  District,
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

  constructor(
    private messageService: MessageService,
    private $router: Router,
    private $route: ActivatedRoute,
    private $auth: AuthService,
    private $title: Title,
    private $userClient: UserClient,
    private $message: MessageService,
    private $map: GoogleMapService
  ) {
    $title.setTitle("Account Information");
  }

  ngOnInit() {
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
    this.$router.navigate(["list-of-restaurants"], { relativeTo: this.$route });
  }

  get isBuyer(): boolean {
    return this.user?.role === "BUYER";
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
}
