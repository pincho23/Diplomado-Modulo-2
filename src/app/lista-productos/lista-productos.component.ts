import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-lista-productos',
  imports: [MatListModule, CommonModule, ProductCardComponent, FormsModule, MatFormField, MatLabel, MatInput],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {
  productos$!: Observable<any[]>;
  cart: any[] = [];
  searchQuery: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productos$ = this.productService.getProducts();
    this.cart = this.productService.getCart();
  }

  onSearch() {
    if (this.searchQuery.length < 3) {
      alert('Por favor, ingresa al menos 3 caracteres.');
      return;
    }
    this.productService.filterProducts(this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = '';
    this.productService.filterProducts('');
  }
}
