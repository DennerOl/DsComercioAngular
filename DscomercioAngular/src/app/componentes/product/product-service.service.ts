import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDTO } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  private readonly API = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  listar(): Observable<{ content: ProductDTO[] }> {
    return this.http.get<{ content: ProductDTO[] }>(this.API);
  }

  buscarPorId(id: number): Observable<ProductDTO> {
    const url = `${this.API}/${id}`;
    return this.http.get<ProductDTO>(url);
  }
}
