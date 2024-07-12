import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../../services/types/product';
import { ProductsService } from 'src/app/pages/services/products.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  listaProductDTO: ProductDTO[] = [];

  paginaAtual: number = 0;
  filtro: string = '';

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro).subscribe((response) => {
      if (response && Array.isArray(response.content)) {
        this.listaProductDTO = response.content.filter(
          (product) => product.id !== 0
        );
      } else {
        console.error('Expected an array but got', response.content);
      }
    });
  }
  carregarMaisProducts() {
    this.service
      .listar(++this.paginaAtual, this.filtro)
      .subscribe((listaProductDTO) => {
        this.listaProductDTO.push(...listaProductDTO.content);
      });
  }

  pesquisarProducts() {
    this.paginaAtual;
    this.service
      .listar(this.paginaAtual, this.filtro)
      .subscribe((listaProductDTO) => {
        this.listaProductDTO = listaProductDTO.content;
      });
  }
}
