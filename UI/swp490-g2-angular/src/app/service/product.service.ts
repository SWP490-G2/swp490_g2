import { ProductInformationRequest } from "./../ngswag/client";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProductInformationRequest } from "../ngswag/client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://localhost:8080";
  constructor(private http: HttpClient) {}

  addNewProduct(
    productInformationRequest: any,
    productImages: File[]
  ): Observable<any> {
    const formData = new FormData();
    formData.append(
      "productInformationRequest",
      JSON.stringify(productInformationRequest)
    );
    for (let i = 0; i < productImages.length; i++) {
      formData.append("file", productImages[i]);
    }
    return this.http.post(`${this.apiUrl}/product/add-new-product`, formData);
  }
}
