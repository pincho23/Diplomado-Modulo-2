import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {ListaProductosComponent} from './lista-productos/lista-productos.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaProductosComponent, CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'productos';
  cartCount = 0;

  constructor(private productService: ProductService) {
    this.productService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
}
