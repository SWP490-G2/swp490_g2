import { Component, HostListener, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { of, switchMap } from "rxjs";
import { FilterRequest, Order, OrderProductDetail, Product, ProductClient, Restaurant, SearchRequest } from "src/app/ngswag/client";
import { CartService } from "src/app/service/cart.service";

@Component({
  selector: "app-cart-pages",
  templateUrl: "./cart-pages.component.html",
  styleUrls: ["./cart-pages.component.scss"],
})
export class CartPagesComponent implements OnInit {
  order: Order;
  totalPrice = 0;
  visibleDialog: boolean;
  verticalOffset = 0;
  products: Product[] = [];

  constructor(private $cart: CartService, private $productClient: ProductClient, private $message: MessageService) { }

  refresh() {
    this.$cart.getOrderObservable()
      .pipe(
        switchMap((order) => {
          this.order = order;
          this.calculateTotal();

          if (order.orderProductDetails?.length && this.$cart.restaurant$.value) {
            return this.$productClient.search(
              this.$cart.restaurant$.value.id!,
              new SearchRequest({
                filters: [
                  new FilterRequest({
                    key1: "id",
                    operator: "IN",
                    fieldType: "LONG",
                    values: order.orderProductDetails?.map(opd => opd.product?.id),
                  })
                ]
              }));
          }

          return of(undefined);
        }),
        switchMap(page => {
          if (page?.content)
            this.products = page.content;

          return of();
        })
      )
      .subscribe();
  }

  calculateTotal(newNumber?: number, detail?: OrderProductDetail) {
    if (newNumber !== undefined && detail) {
      detail.quantity = newNumber;
    }

    if (this.order.orderProductDetails?.length) {
      this.totalPrice = this.order.orderProductDetails
        .map((item) => item.price! * item.quantity!)
        .reduce(
          (prevPrice, currPrice) => (prevPrice + currPrice)
        );
    }
  }

  ngOnInit() {
    this.refresh();
  }

  get hasOrder(): boolean {
    return !!this.order.orderProductDetails?.some(opd => opd.quantity);
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    this.verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
  }

  getProduct(detail: OrderProductDetail): Product | undefined {
    return this.products.find(p => p.id === detail.product?.id);
  }

  remove(detail: OrderProductDetail) {
    this.$cart.removeFromCart(detail);
  }

  emptyCart() {
    this.$cart.clearCart();
  }

  addOrder() {
    this.$cart.addOrder().pipe(
      switchMap(errorMessage => {
        if (errorMessage) {
          throw new Error(errorMessage);
        }

        this.$message.add({
          severity: "success",
          summary: "Success",
          detail: "Order has been placed!"
        });

        return of();
      })
    ).subscribe();
  }

  get restaurant(): Restaurant | undefined {
    return this.$cart.restaurant$.value;
  }
}
