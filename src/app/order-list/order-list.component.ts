import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(
      orders => this.orders = orders,
      error => console.error('Error loading orders:', error)
    );
  }

 editOrder(orderId: number | undefined) {
  if (orderId !== undefined) {
    // Retrieve existing order details
    this.orderService.getOrderById(orderId).subscribe(
      (order: Order) => {
        const updatedStatus = prompt('Enter updated order status:', order.status);
        if (updatedStatus !== null) {
          const updatedOrder: Order = {
            id: order.id,
            customerName: order.customerName,
            shippingAddress: order.shippingAddress,
            totalAmount: order.totalAmount,
            status: updatedStatus
          };

          this.orderService.updateOrder(orderId, updatedOrder).subscribe(
            response => {
              console.log('Order updated:', response);
              this.loadOrders();
            },
            error => console.error('Error updating order:', error)
          );
        }
      },
      error => console.error('Error fetching order details:', error)
    );
  } else {
    console.error('Invalid order ID');
  }
}

  
  deleteOrder(orderId: number | undefined) {
    if (orderId !== undefined) {
      if (confirm('Are you sure you want to delete this order?')) {
        this.orderService.deleteOrder(orderId).subscribe(
          () => {
            console.log('Order deleted');
            this.loadOrders();
          },
          error => console.error('Error deleting order:', error)
        );
      }
    } else {
      console.error('Invalid order ID');
    }
  }
  
}
