import { Component, HostListener, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { of, switchMap } from "rxjs";
import { FilterRequest, Order, OrderProductDetail, Product, ProductClient, SearchRequest } from "src/app/ngswag/client";
import { CartItem, CartService } from "src/app/service/cart.service";

@Component({
  selector: "app-cart-pages",
  templateUrl: "./cart-pages.component.html",
  styleUrls: ["./cart-pages.component.scss"],
})
export class CartPagesComponent implements OnInit {
  order: Order;
  totalPrice = 0;
  quantities1: number[] = [1, 1, 1];

  quantities2: number[] = [1, 1];

  quantityOptions: SelectItem[] = [{ label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }];

  visibleDialog: boolean;
  verticalOffset = 0;
  products: Product[] = [];

  constructor(private $cart: CartService, private $productClient: ProductClient) { }

  refresh() {
    this.$cart.getOrderObservable()
      .pipe(
        switchMap((order) => {
          this.order = order;
          this.calculateTotal();

          if (order.orderProductDetails?.length) {
            return this.$productClient.search(new SearchRequest({
              filters: [
                new FilterRequest({
                  key1: "id",
                  operator: "IN",
                  fieldType: "LONG",
                  values: order.orderProductDetails?.map(opd => opd.productId),
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
      this.order.orderProductDetails
        .map((item) => item.price! * item.quantity!)
        .reduce(
          (prevPrice, currPrice) => (this.totalPrice = prevPrice + currPrice)
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
    return this.products.find(p => p.id === detail.productId);
  }

  remove(detail: OrderProductDetail) {
    this.$cart.removeFromCart(detail);
  }

  emptyCart() {
    this.$cart.clearCart();
  }
}
