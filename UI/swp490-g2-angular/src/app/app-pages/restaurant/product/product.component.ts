import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { File, Product, ProductClient } from "src/app/ngswag/client";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  productId: number;
  product?: Product;

  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $productClient: ProductClient
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );

    this.productId = id;
  }

  ngOnInit(): void {
    this.$productClient.getById(this.productId).subscribe((product) => {
      this.product = product;
    });
  }

  addImage(image: File) {
    if (!this.product) return;
    if (!this.product.images) this.product.images = [];
    this.product.images.push(image);
    this.$productClient.update(this.product).subscribe(() => location.reload());
  }
}
