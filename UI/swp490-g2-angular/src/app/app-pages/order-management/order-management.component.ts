import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { OrderClient } from 'src/app/ngswag/client';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orderProductDetail: any;
  orderProduct: any;
  totalPrice: number = 0;
  visible = false;
  constructor(private $orderClient: OrderClient) { }

  ngOnInit() {
    this.$orderClient.getAllByRole('SELLER', { page: 0, size: 15 } as any).pipe(
      map(res => {
        this.orderProduct = res.content;
        console.log(this.orderProduct);
      }
      )).subscribe(res => {
        this.orderProductDetail = this.orderProduct.map(item => item.orderProductDetails);
        console.log(this.orderProductDetail);


      });
  }
  getOrderTotalPrice(order: any): number {
    return order.orderProductDetails.reduce((total, item) => total + item.price, 0);
  }
  getSeverity(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'DELIVERING':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'ABORTED':
        return 'warning';
      case 'REJECTED':
        return 'danger';
      default:
        return '';
    }
  }
  showDialog(): void {
    this.visible = true;
  }
}
