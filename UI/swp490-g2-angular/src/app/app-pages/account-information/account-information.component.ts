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
import { Restaurant, User } from "src/app/ngswag/client";
import { Title } from "@angular/platform-browser";

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
    private $title: Title
  ) {
    $title.setTitle("Account Information");
  }

  ngOnInit() {
    this.$auth.getCurrentUser(true).subscribe((user) => {
      this.user = user;
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
}
