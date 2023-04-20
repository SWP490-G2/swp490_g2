import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { map, of, switchMap } from "rxjs";
import {
  Order,
  OrderClient,
  Restaurant,
  RestaurantClient,
  SearchRequest,
} from "src/app/ngswag/client";

@Component({
  selector: "app-order-management",
  templateUrl: "./order-management.component.html",
  styleUrls: ["./order-management.component.scss"],
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  totalPrice = 0;
  visible = false;
  selectedOrder?: Order;
  searchRequest = new SearchRequest({
    page: 0,
    size: 10,
  });

  totalRecords = 0;
  loading = true;

  @Input() isBuyer = false;
  selectedRestaurant?: Restaurant;
  qrData?: string;
  bankImagePath?: string;

  constructor(
    private $orderClient: OrderClient,
    private $message: MessageService,
    private $restaurantClient: RestaurantClient,
    private $http: HttpClient
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    return this.$orderClient
      .getAllByRole(this.isBuyer ? "BUYER" : "SELLER", this.searchRequest)
      .pipe(
        map((res) => {
          this.totalRecords = res.totalElements!;
          if (res.content) this.orders = res.content;

          this.loading = false;
        })
      )
      .subscribe();
  }

  getOrderTotalPrice(order: any): number {
    return order.orderProductDetails.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getSeverity(status: string): string {
    switch (status) {
      case "PENDING":
        return "warning";
      case "DELIVERING":
        return "info";
      case "COMPLETED":
        return "success";
      case "ABORTED":
        return "danger";
      case "REJECTED":
        return "danger";
      default:
        return "";
    }
  }
  showDialog(id: number): void {
    this.visible = true;
    this.selectedOrder = this.orders.find((item) => item.id === id);
    if (
      this.selectedOrder?.orderProductDetails?.length &&
      this.selectedOrder.orderProductDetails[0].product?.id
    ) {
      this.$restaurantClient
        .getByProductId(this.selectedOrder.orderProductDetails[0].product.id)
        .pipe(
          switchMap((r) => {
            this.selectedRestaurant = r;
            if (
              r.bankDetail?.accountName &&
              r.bankDetail?.accountNumber &&
              r.bankDetail?.acqId
            ) {
              return this.$http.post<any>(
                "https://api.vietqr.io/v2/generate",
                {
                  accountNo: r.bankDetail.accountNumber + "",
                  accountName: r.bankDetail.accountName,
                  acqId: r.bankDetail.acqId + "",
                  addInfo: `Order ${this.selectedOrder?.id}`,
                  amount: this.getOrderTotalPrice(this.selectedOrder) + "",
                  template: "compact",
                },
                {
                  headers: {
                    "x-client-id": "4949cfcc-9672-4606-8482-d76dd49eddf0",
                    "x-api-key": "6bc45654-fcd3-48ab-b312-3925213c0193",
                    "Content-Type": "application/json",
                  },
                }
              );
            }

            return of(undefined);
          }),
          switchMap((res) => {
            if (!res) return of(undefined);

            if (res?.data?.qrCode) this.qrData = res.data.qrCode;
            this.bankImagePath = res.data.qrDataURL;

            return of(undefined);
          })
        )
        .subscribe();
    }
  }

  onPage(event: { first: number; rows: number }) {
    console.log(event);
    this.searchRequest.page = event.first / event.rows;
    this.searchRequest.size = event.rows;
    this.refresh();
  }

  accept() {
    if (!this.selectedOrder?.id) return;

    this.$orderClient
      .accept(this.selectedOrder.id)
      .pipe(
        map((errorMessage) => {
          if (errorMessage) throw new Error(errorMessage);

          this.$message.add({
            severity: "success",
            summary: "Accepted",
            detail: `Order #${this.selectedOrder?.id} has been accepted!`,
          });

          this.visible = false;
          this.refresh();
        })
      )
      .subscribe();
  }

  reject() {
    if (!this.selectedOrder?.id) return;

    this.$orderClient
      .reject(this.selectedOrder.id)
      .pipe(
        map((errorMessage) => {
          if (errorMessage) throw new Error(errorMessage);

          this.$message.add({
            severity: "warn",
            summary: "Rejected",
            detail: `Order #${this.selectedOrder?.id} has been rejected!`,
          });

          this.visible = false;
          this.refresh();
        })
      )
      .subscribe();
  }

  startDelivery() {
    if (!this.selectedOrder?.id) return;

    this.$orderClient
      .deliver(this.selectedOrder.id)
      .pipe(
        map((errorMessage) => {
          if (errorMessage) throw new Error(errorMessage);

          this.$message.add({
            severity: "success",
            summary: "Delivery started",
            detail: `Order #${this.selectedOrder?.id} has been started delivering!`,
          });

          this.visible = false;
          this.refresh();
        })
      )
      .subscribe();
  }

  abort() {
    if (!this.selectedOrder?.id) return;

    this.$orderClient
      .abort(this.selectedOrder.id)
      .pipe(
        map((errorMessage) => {
          if (errorMessage) throw new Error(errorMessage);

          this.$message.add({
            severity: "warn",
            summary: "Delivery aborted",
            detail: `Delivery of order #${this.selectedOrder?.id} has been aborted!`,
          });

          this.visible = false;
          this.refresh();
        })
      )
      .subscribe();
  }

  complete() {
    if (!this.selectedOrder?.id) return;

    this.$orderClient
      .complete(this.selectedOrder.id)
      .pipe(
        map((errorMessage) => {
          if (errorMessage) throw new Error(errorMessage);

          this.$message.add({
            severity: "success",
            summary: "Delivery completed",
            detail: `Delivery of order #${this.selectedOrder?.id} has been completed!`,
          });

          this.visible = false;
          this.refresh();
        })
      )
      .subscribe();
  }

  get showQr(): boolean {
    return !!(
      this.selectedRestaurant?.bankDetail?.accountName &&
      this.selectedRestaurant?.bankDetail?.accountNumber &&
      this.selectedRestaurant?.bankDetail?.acqId
    );
  }
}
