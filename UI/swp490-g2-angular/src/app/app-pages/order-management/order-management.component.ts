import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { OrderClient } from 'src/app/ngswag/client';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orderProductDetail: any
  totalPrice: number
  constructor(private $orderClient: OrderClient) { }

  ngOnInit() {
    this.$orderClient.getAllByRole('SELLER', { page: 0, size: 15 } as any).subscribe(res => {
      this.orderProductDetail = res.content;
      console.log(this.orderProductDetail);

      this.orderProductDetail.forEach(order => {
        const totalPriceForOrder = order.orderProductDetails.reduce((total, item) => total + item.price, 0);
        console.log('total price for order:', totalPriceForOrder);
      });
    });
  }

}
