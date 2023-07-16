import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  newOrder: Order = {
    customerName: '',
    shippingAddress: '',
    totalAmount: 0,
    status: ''
  };

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  createOrder() {
    this.orderService.createOrder(this.newOrder).subscribe(
      response => {
        console.log('Order created:', response);
        this.newOrder = {
          customerName: '',
          shippingAddress: '',
          totalAmount: 0,
          status: ''
        };
      },
      error => console.error('Error creating order:', error)
    );
  }
}
