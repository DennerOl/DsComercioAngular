import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
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

  findAllRequest(
    pagina: number,
    size: number = 5
  ): Observable<{ content: OrderDTO[] }> {
    const headers = this.createAuthHeaders();
    const itensPorPagina = 1;
    let params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina);

    return this.http
      .get<{ content: OrderDTO[] }>(`${this.apiUrl}/orders`, {
        headers: headers,
        withCredentials: true,
        params,
      })
      .pipe(
        catchError((error) => {
          // Se o erro for 404 (não encontrado), apenas suprimimos ele (não exibe no console)
          if (error.status === 404) {
            // Não faz nada, suprime o erro
            return of({ content: [] }); // Retorna uma resposta vazia sem exibir no console
          }

          // Se o erro for diferente de 404, exibe no console
          console.error('Erro ao buscar pedidos:', error);
          return throwError(error); // Repassa o erro para que o código no componente possa lidar com ele
        })
      );
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.tokenService.retornarToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}
