import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfirmationService, MessageService } from "primeng/api";
import { map, of, switchMap } from "rxjs";
import {
  Order,
  OrderClient,
  Restaurant,
  RestaurantClient,
  SearchRequest,
  User,
  UserClient,
  OrderProductDetail,
  Product
} from "src/app/ngswag/client";



@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.scss']
})
export class OrderInformationComponent implements OnInit{
  orders: Order[] = [];
  @Input()
  isBuyer = false;
  currentUser?: User;
  loading = true;
  searchRequest = new SearchRequest({
    page: 0,
    size: 10,
  });
  totalRecords = 0;
  products: Product[] = [];

  constructor(
    private $orderClient: OrderClient,
    private $message: MessageService,
    private $restaurantClient: RestaurantClient,
    private $http: HttpClient,
    private $userClient: UserClient,
    private $confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;

    this.$userClient
      .getCurrentUser()
      .pipe(
        switchMap((user) => {
          this.currentUser = user;

          let role: string;
          if (this.isBuyer) role = "BUYER";
          else {
            if (this.currentUser.admin) role = "ADMIN";
            else role = "SELLER";
          }

          return this.$orderClient.getAllByRole(role, this.searchRequest);
        }),
        map((res) => {
          this.totalRecords = res.totalElements!;
          if (res.content) this.orders = res.content;

          this.loading = false;
        })
      )
      .subscribe();
  }

  userExisted(): boolean {
    return !!(this.currentUser && this.currentUser.email);
  }

  getUserFullName(): string{
    if (this.userExisted()) {
      return <string>(this.currentUser?.firstName+" "+this.currentUser?.middleName+" "+this.currentUser?.lastName);
    }
    return "Account";
  }

  getUserEmail(): string{
    if (this.userExisted()) {
      return <string>this.currentUser?.email;
    }
    return "Account";
  }

  getProduct(detail: OrderProductDetail): Product | undefined {
    return this.products.find(p => p.id === detail.product?.id);
  }

  

}
