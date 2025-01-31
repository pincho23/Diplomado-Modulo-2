import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.cart = this.productService.getCart();
  }
}
