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

    });
  }
  getOrderTotalPrice(order: any): number {
    return order.orderProductDetails.reduce((total, item) => total + item.price, 0);
  }
  getSeverity(status: string) {
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
}
