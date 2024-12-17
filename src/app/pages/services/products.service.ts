import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategoryDTO, ProductDTO } from './types/product';
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

    return this.http.get<{ content: ProductDTO[] }>(`${this.API}/products`, {
      params,
    });
  }

  buscarPorId(id: number): Observable<ProductCategoryDTO> {
    return this.http.get<ProductCategoryDTO>(`${this.API}/products/${id}`);
  }

  formatCurrency(value: number | undefined): string {
    if (value === undefined || value === null) {
      return 'R$ 0,00';
    }
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }
}
