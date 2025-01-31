import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productos = [
    { nombre: 'Producto 1', descripcion: 'Descripción del producto 1', precio: 10 },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 20 },
    
  ];

  private cart: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();


  constructor() { }

  getProducts() {
    return this.productos;
  }

  addToCart(product: any) {
    this.cart.push(product);
    this.cartCount.next(this.cart.length);
  }

  getCart() {
    return this.cart;
  }
}
