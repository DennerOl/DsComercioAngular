import { HttpClient, HttpParams } from '@angular/common/http';
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

  listar(
    pagina: number,
    filtro: string
  ): Observable<{ content: ProductDTO[] }> {
    const itensPorPagina = 6;
    let params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'name');

    if (filtro.trim().length > 2) {
      params = params.set('name', filtro.trim());
    }

    const url = `${this.API}/products`;

    return this.http.get<{ content: ProductDTO[] }>(url, { params: params });
  }
}
