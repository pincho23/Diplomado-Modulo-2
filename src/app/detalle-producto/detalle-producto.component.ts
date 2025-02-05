import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  imports: [CommonModule, MatCardModule,ProductCardComponent],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {
  producto: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const nombreProducto = this.route.snapshot.paramMap.get('nombre');
    if (nombreProducto) {
      this.producto = this.productService.getProductByName(nombreProducto);
    }
  }
  goBack() {
    this.router.navigate(['/productos']);
  }
}
