import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-lista-productos',
  imports: [MatListModule, CommonModule, ProductCardComponent],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {
  productos: any[] = [];
  cart: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productos = this.productService.getProducts();
    this.cart = this.productService.getCart();
  }
}
