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
  totalPrice: any;
  visible = false;
  detailOrder: any;
  orderId: number;

  constructor(private $orderClient: OrderClient) { }

  ngOnInit() {
    this.$orderClient.getAllByRole('SELLER', { page: 0, size: 15 } as any).subscribe(res => {
        this.orderProduct = res.content;
        console.log(this.orderProduct);
        
        this.totalPrice = this.getOrderTotalPrice(this.orderProduct);
        this.orderProduct = this.orderProduct.map((order, index) => ({ ...order, totalPrice: this.totalPrice[index] }));
        this.orderProductDetail = this.orderProduct.map((item,index) => (
          {
            id: item.id,
            order: item.orderProductDetails,
          }
        ));
      });
  }
  getOrderTotalPrice(orders: any[]): number[] {
    if (!orders) {
      return [];
    }
    
    return orders.map(order => {
      if (order && order.orderProductDetails) {
        return order.orderProductDetails.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
      } else {
        return 0;
      }
    });
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
  showDialog(id: number): void {
    this.visible = true;
    this.orderId = id;
    this.detailOrder = this.orderProductDetail.filter(item => item.id === id)
      .map(order => order.order).flat(1)
    console.log(this.detailOrder);
  }
  handleAcceptOrder(): void {
    this.$orderClient.accept(this.orderId).subscribe(res => console.log(res)
    )
  }
  handleAbortOrder(): void {
    this.$orderClient.abort(this.orderId).subscribe(res => console.log(res)
    )
  }
}
