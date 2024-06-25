import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO } from './types/product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API: string = environment.API;

  constructor(private http: HttpClient) {}

  listar(): Observable<{ content: ProductDTO[] }> {
    return this.http.get<{ content: ProductDTO[] }>(`${this.API}/products`);
  }
}
