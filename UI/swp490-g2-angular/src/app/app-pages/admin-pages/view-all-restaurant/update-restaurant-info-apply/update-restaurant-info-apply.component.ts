import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { finalize, of, switchMap } from "rxjs";
import { AuthService } from "src/app/global/auth.service";
import { UserClient } from "src/app/ngswag/client";
import {
  AdminClient,
  AuthenticationResponse,
  File,
  Restaurant,
  RestaurantClient,
  User,
  Ward,
} from "src/app/ngswag/client";
import { DateUtils } from "src/app/utils";

@Component({
  selector: "app-update-restaurant-info-apply",
  templateUrl: "./update-restaurant-info-apply.component.html",
})
export class UpdateRestaurantInfoApplyComponent
  implements OnInit, AfterViewInit
{
  @ViewChild("form", { static: false }) form!: NgForm;
  selectedDelivery: any = null;
  time1: Date;
  time2: Date;
  time3: Date;
  time4: Date;
  deliveries: any[] = [
    { name: "Yes", key: "Y" },
    { name: "No", key: "N" },
  ];

  uploadedFiles: any[] = [];
  $addressClient: any;
  cities: any;
  address: any;
  districts: any;
  wards: any;
  $client: any;
  _registerButtonDisabled: boolean;
  codeValidatorDialogVisible: boolean;
  selectedGender: any;
  genders: any;

  restaurantId: number;
  restaurant?: Restaurant;
  user?: User;
  uploadUrl: string;

  constructor(
    private $restaurantClient: RestaurantClient,
    private $adminClient: AdminClient,
    private $userClient: UserClient,
    private $auth: AuthService,
    private $message: MessageService,
    private $route: ActivatedRoute
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );

    this.restaurantId = id;
    this.uploadUrl = "restaurant/update-avatar/" + id;
    this.refresh();
  }

  refresh() {
    this.$adminClient
      .getRestaurantById(this.restaurantId)
      .pipe(
        switchMap((restaurant) => {
          this.restaurant = restaurant;
          if (restaurant.id) {
            return this.$userClient.getAllOwnersByRestaurantIds([
              restaurant.id,
            ]);
          } else return of(undefined);
        })
      )
      .subscribe((owners) => {
        if (owners) {
          (this.restaurant as any).owners = owners;
        }
      });

    this.$auth.getCurrentUser().subscribe((user) => (this.user = user));
  }

  submit(): void {
    if (!this.restaurant) return;

    if (this.restaurant.address) {
      this.restaurant.address.ward = new Ward({
        id: this.form.value.ward.id,
      });

      this.restaurant.address.specificAddress = this.form.value.specificAddress;
    }

    this.$restaurantClient.update(this.restaurant).subscribe(() => {
      this.$message.add({
        severity: "success",
        summary: "Success",
        detail: "Restaurant's information has changed",
      });
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls["phoneNumber"].addValidators([
        Validators.required,
        Validators.pattern("^(0[3|5|7|8|9])+([0-9]{8})$"),
      ]);
      this.form.controls["phoneNumber"].updateValueAndValidity();
      this.form.controls["contact"].addValidators([
        Validators.required,
        Validators.pattern("^(0[3|5|7|8|9])+([0-9]{8})$"),
      ]);
      this.form.controls["contact"].updateValueAndValidity();
    }, 0);
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.$message.add({
      severity: "info",
      summary: "File Uploaded",
      detail: "",
    });
  }

  updateResInfo(): void {
    this.$client
      .updateResInfo(this.form.value)
      .pipe(
        finalize(() => {
          this._registerButtonDisabled = false;
        })
      )
      .subscribe({
        next: (authenticationResponse: AuthenticationResponse) => {
          if (authenticationResponse.errorMessage) {
            throw new Error(authenticationResponse.errorMessage);
          }
          this.codeValidatorDialogVisible = true;
        },
      });
  }

  ngOnInit() {}

  updateAvatar(image: File) {
    if (!this.restaurant) return;

    this.restaurant.avatarFile = image;
    this.$restaurantClient
      .update(this.restaurant)
      .subscribe(() => location.reload());
  }

  get editable(): boolean {
    if (!this.user || !this.user.id) return false;
    if (AuthService.isAdmin(this.user)) return true;
    if (
      AuthService.isSeller(this.user) &&
      this.user.restaurants?.some(
        (restaurant) => restaurant.id === this.restaurant?.id
      )
    ) {
      return true;
    }

    return false;
  }

  getOwners(restaurant: Restaurant): string {
    if (!(restaurant as any).owners) return "";

    return (restaurant as any).owners.map((o) => o.email).join(", ");
  }
}
