import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-productos',
  imports: [MatListModule, CommonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {
  productos = [
    { nombre: 'Producto 1', descripcion: 'Descripción del producto 1', precio: 10 },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 20 },
    // ... más productos
  ];
}
