import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { OrderDTO } from './types/order';
import { TokenService } from './serviceUser/token.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl: string = environment.API;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  findByIdRequest(id: number): Observable<OrderDTO> {
    const headers = this.createAuthHeaders();

    return this.http.get<OrderDTO>(`${this.apiUrl}/orders/${id}`, {
      headers: headers,
      withCredentials: true,
    });
  }

  placeOrderRequest(cart: OrderDTO): Observable<OrderDTO> {
    const headers = this.createAuthHeaders();

    return this.http.post<OrderDTO>(`${this.apiUrl}/orders`, cart, {
      headers: headers,
      withCredentials: true,
    });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.tokenService.retornarToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}
