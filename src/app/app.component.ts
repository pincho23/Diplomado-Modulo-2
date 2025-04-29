import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from './services/product.service';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ContactPageComponent } from "./contact-page/contact-page.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    ContactPageComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
