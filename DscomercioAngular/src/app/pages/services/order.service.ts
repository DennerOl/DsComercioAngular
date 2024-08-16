import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { OrderDTO } from './types/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl: string = environment.API;

  constructor(private http: HttpClient) {}

  findByIdRequest(id: number): Observable<OrderDTO> {
    const url = `${this.apiUrl}/orders/${id}`;
    return this.http.get<OrderDTO>(url, { withCredentials: true });
  }

  placeOrderRequest(cart: OrderDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, cart, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
