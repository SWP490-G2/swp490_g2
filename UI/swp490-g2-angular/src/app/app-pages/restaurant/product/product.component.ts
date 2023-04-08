import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { finalize, of, switchMap } from "rxjs";
import { File, Product, ProductClient } from "src/app/ngswag/client";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  @ViewChild("form", { static: false }) form!: NgForm;
  productId: number | undefined;
  restaurantId: number;
  product: Product = new Product({
    categories: [],
    images: [],
  });

  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $productClient: ProductClient,
    private $message: MessageService,
  ) {
    this.productId = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("productId")
    );

    this.restaurantId = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );
  }

  refresh() {
    if (this.productId) {
      this.$productClient.getById(this.productId).subscribe((product) => {
        this.product = product;
      });
    }
  }

  ngOnInit(): void {
    this.refresh();
  }

  addImage(image: File) {
    if (!this.product) return;
    if (!this.product.images) this.product.images = [];
    this.product.images.push(image);
    this.$productClient.update(this.product).subscribe(() => location.reload());
  }

  onSubmit() {
    this._submitButtonDisabled = true;

    const apiCall = this.productId
      ? this.$productClient.update(this.product)
        .pipe(switchMap(() => of()))
      : this.$productClient.addNewProduct(this.restaurantId, this.product);


    apiCall.pipe(
      switchMap((errorMessage: string | undefined) => {
        if (errorMessage)
          throw new Error(errorMessage);

        this.$message.add({
          severity: "success",
          summary: "Success",
          detail: `Product [${this.product.productName}] has been successfully ${this.productId ? "added" : "updated"}!`
        });

        return of();
      }),
      finalize(() => {
        this._submitButtonDisabled = false;
      })
    ).subscribe();

  }

  private _submitButtonDisabled = false;
  get submitButtonDisabled(): boolean {
    return !!this.form?.invalid || this._submitButtonDisabled;
  }

  deleteImage(image: File) {
    if (!this.productId || !image.id)
      return;

    this.$productClient.deleteImage(this.productId, image.id)
      .subscribe(() => {
        this.$message.add({
          severity: "success",
          summary: "Success",
          detail: "Image has been deleted successfully!"
        });

        this.refresh();
      });
  }
}
