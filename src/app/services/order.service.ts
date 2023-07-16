import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://spring-app-api-09.azurewebsites.net/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(orderId: number): Observable<Order> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.get<Order>(url);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrder(orderId: number, order: Order): Observable<Order> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.put<Order>(url, order);
  }

  deleteOrder(orderId: number): Observable<void> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.delete<void>(url);
  }
}
