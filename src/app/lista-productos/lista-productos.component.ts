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
  productos$: Observable<any[]>; 
  currentPage = 0;
  itemsPerPage = 12;
  isLoading = false;
  errorMessage = '';
  hasError = false;
  cart: any[] = [];
  searchQuery: string = '';
  hasError$: Observable<boolean>;
 

  constructor(private productService: ProductService) {
    this.productos$ = this.productService.filteredProducts$;
    this.hasError$ = this.productService.hasError$;
  }

  ngOnInit() {
    this.loadProductos();
    this.cart = this.productService.getCart();
  }

  loadProductos() {
    this.isLoading = true;
    this.errorMessage = '';
    this.hasError = false;
  
    this.productService.fetchProductos(this.currentPage * this.itemsPerPage, this.itemsPerPage)
      .subscribe({
        next: (data: any[]) => {
          this.productService.actualizarProductos(data); // Actualiza la lista de productos
          this.productService.filterProducts(''); // Resetea el filtro
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error de red:', error);
          if (!navigator.onLine) {
            this.errorMessage = 'No hay conexión a Internet. Verifica tu red e intenta de nuevo.';
          } else {
            this.errorMessage = 'Error al cargar productos. Inténtalo de nuevo.';
          }
          this.isLoading = false;
          this.hasError = true;
        }
      });
  }

  retryLoadProductos() {
    this.loadProductos();
    this.productService.resetError();
  }

  nextPage() {
    this.currentPage++;
    this.loadProductos();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProductos();
    }
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
