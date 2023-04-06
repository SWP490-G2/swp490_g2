import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  Body2,
  ProductCategory,
  ProductCategoryClient,
  ProductClient,
  ProductInformationRequest,
} from "src/app/ngswag/client";
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  invalid = false;
  restaurantId: number;
  productCategories: ProductCategory[];
  productForm: FormGroup;
  productImages: File[] = [];
  constructor(
    private fb: FormBuilder,
    private $productClient: ProductClient,
    private $productCategoryClient: ProductCategoryClient,
    private $route: ActivatedRoute,
    private productService: ProductService
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );
    this.restaurantId = id;
    this.productForm = this.fb.group({
      productName: [null],
      price: [null],
      quantity: [null],
      description: [null],
      productImages: [null],
      productCategories: [null],
      restaurantId: [this.restaurantId],
      productStatusId: [null],
    });
  }

  ngOnInit() {
    this.$productCategoryClient
      .getAllByRestaurantId(this.restaurantId)
      .subscribe((categories) => {
        this.productCategories = categories;
      });
  }
  onFileSelected(event: any) {
    this.productImages = event.target.files;
  }
  onSubmit() {
    const productInformationRequest = this.productForm.value;
    console.log(productInformationRequest);
    console.log(this.productImages);

    this.productService
      .addNewProduct(productInformationRequest, this.productImages)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
