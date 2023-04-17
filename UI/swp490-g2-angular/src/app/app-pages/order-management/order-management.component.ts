import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { map } from "rxjs";
import {
  Order,
  OrderClient,
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

  constructor(
    private $orderClient: OrderClient,
    private $message: MessageService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    return this.$orderClient
      .getAllByRole("SELLER", this.searchRequest)
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
      (total, item) => total + item.price,
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
}
