import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { of, switchMap } from "rxjs";
import { NgForm, Validators } from "@angular/forms";
import {
  Order,
  Restaurant,
  SearchRequest,
  User,
  UserClient,
  OrderProductDetail,
  Product,
  Address,
} from "src/app/ngswag/client";
import { Router } from "@angular/router";
import { CartService } from "src/app/service/cart.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-order-information",
  templateUrl: "./order-information.component.html",
  styleUrls: ["./order-information.component.scss"],
})
export class OrderInformationComponent implements OnInit {
  orders: Order[] = [];
  @Input() isBuyer = false;
  currentUser?: User;
  searchRequest = new SearchRequest({
    page: 0,
    size: 10,
  });
  totalRecords = 0;
  products: Product[] = [];

  newOrder: Order = Order.fromJS({});
  @ViewChild("form", { static: false }) form!: NgForm;

  constructor(
    private $userClient: UserClient,
    private $router: Router,
    private $cart: CartService,
    private $message: MessageService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls["phoneNumber"].addValidators([
        Validators.required,
        Validators.pattern("^(([+]84)[3|5|7|8|9]|0[3|5|7|8|9])+([0-9]{8})$"),
      ]);
      this.form.controls["phoneNumber"].updateValueAndValidity();
    }, 1000);
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.$userClient
      .getCurrentUser()
      .pipe(
        switchMap((user) => {
          this.currentUser = user;
          this.newOrder.phoneNumber = user.phoneNumber;
          return of(undefined);
        })
      )
      .subscribe();
  }

  userExisted(): boolean {
    return !!(this.currentUser && this.currentUser.email);
  }

  getUserFullName(): string {
    if (this.userExisted()) {
      return <string>(
        (this.currentUser?.firstName +
          " " +
          this.currentUser?.middleName +
          " " +
          this.currentUser?.lastName)
      );
    }
    return "Account";
  }

  getUserEmail(): string {
    if (this.userExisted()) {
      return <string>this.currentUser?.email;
    }
    return "Account";
  }

  getProduct(detail: OrderProductDetail): Product | undefined {
    return this.products.find((p) => p.id === detail.product?.id);
  }

  backToRestaurant() {
    this.$router.navigate(["restaurant", this.restaurant?.id]);
  }

  get restaurant(): Restaurant | undefined {
    return this.$cart.restaurant$.value;
  }

  submit() {
    if (!this.$cart.order$.value.orderProductDetails) return;

    this.newOrder.orderProductDetails = [
      ...this.$cart.order$.value.orderProductDetails,
    ];

    this.$cart.order$.next(this.newOrder);
    this.$cart
      .addOrder()
      .pipe(
        switchMap((errorMessage) => {
          if (errorMessage) {
            throw new Error(errorMessage);
          }

          this.$message.add({
            severity: "success",
            summary: "Success",
            detail: "Order has been placed!",
          });

          this.$router.navigate(["buyer-orders"]);
          return of(undefined);
        })
      )
      .subscribe();
  }
}
