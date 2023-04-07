import { map } from "rxjs";
import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  Body2,
  ProductCategory,
  ProductCategoryClient,
  ProductClient,
  ProductInformationRequest,
} from "src/app/ngswag/client";

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
  selectedCategories: any[] = [];
  constructor(
    private fb: FormBuilder,
    private $productClient: ProductClient,
    private $productCategoryClient: ProductCategoryClient,
    private $route: ActivatedRoute
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );
    this.restaurantId = id;
    this.productForm = this.fb.group({
      productName: [""],
      price: [0],
      quantity: [0],
      description: ["null"],
      productCategories: this.fb.array([]),
      restaurantId: [this.restaurantId],
      productStatusId: [0],
    });
  }

  ngOnInit() {
    this.$productCategoryClient
      .getAllByRestaurantId(this.restaurantId)
      .subscribe((categories) => {
        this.productCategories = categories;
        const categoryFormArray = this.productForm.get(
          "productCategories"
        ) as FormArray;
        categories.forEach(() =>
          categoryFormArray.push(this.fb.control(false))
        );
      });
  }
  onFileSelected(event: any) {
    this.productImages = event.target.files;
  }
  onSubmit() {
    const selectedCategories = this.productCategories
      .filter(
        (category, index) => this.productForm.value.productCategories[index]
      )
      .map((category) => ({
        id: category.id,
        productCategoryName: category.productCategoryName,
        toJSON: function () {
          // define a toJSON method for the object
          return {
            id: this.id,
            productCategoryName: this.productCategoryName,
          };
        },
      }));

    // const productInformationRequest = this.productForm.value;
    const body = {
      productName: this.productForm.value.productName,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      description: this.productForm.value.description,
      productCategories: selectedCategories,
      restaurantId: this.productForm.value.restaurantId,
      productStatusId: 1,
    };
    console.log(body);
    this.$productClient
      .addNewProduct(new ProductInformationRequest(body as any))
      .subscribe((res) => console.log(res));
  }
}
