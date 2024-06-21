import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../product/product';
import { ProductServiceService } from '../product/product-service.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  listaProductDTO: ProductDTO[] = [];

  constructor(private service: ProductServiceService) {}

  ngOnInit(): void {
    this.service.listar().subscribe((response) => {
      if (response && Array.isArray(response.content)) {
        this.listaProductDTO = response.content.filter(
          (product) => product.id !== 0
        );
      } else {
        console.error('Expected an array but got', response.content);
      }
    });
  }
}
{
}
