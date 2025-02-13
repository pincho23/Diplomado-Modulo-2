import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private productos = new BehaviorSubject<any[]>([]);
  productos$ = this.productos.asObservable();
  private hasErrorSubject = new BehaviorSubject<boolean>(false);
  hasError$ = this.hasErrorSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchProductos(offset: number = 0, limit: number = 12): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`).pipe(
      switchMap(response => {
        const peticiones = response.results.map((poke: any, index: number) => 
          this.http.get<any>(poke.url).pipe(
            map(details => ({
              id: offset + index + 1,
              nombre: poke.name,
              imagen: details.sprites.front_default, 
              habilidades: details.abilities.map((a: any) => a.ability.name).join(', '),
              tipos: details.types.map((t: any) => t.type.name).join(', '),
              descripcion: `Habilidades conocidas: ${details.abilities.map((a: any) => a.ability.name).join(', ')}`,
              categoria: details.types.map((t: any) => t.type.name).join(', '),
              precio: Math.floor(Math.random() * 100) + 10
            }))
          )
        );
        
        return forkJoin<any[]>(peticiones); // Espera a que todas las peticiones terminen antes de emitir los datos
      }),
      catchError(error => {
        console.error('Error al obtener productos:', error);
        this.hasErrorSubject.next(true);
        alert('Error de conexión: No se pudo obtener los productos.');
        return of([]); // Retorna un array vacío en caso de error
      }),
      
    );
  }

  actualizarProductos(productos: any[]) {
    this.productos.next(productos); // Actualiza el estado de productos
  }

  resetError() {
    this.hasErrorSubject.next(false);
  }

  private cart: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  private filteredProducts = new BehaviorSubject<any[]>([]);
  public filteredProducts$ = this.filteredProducts.asObservable();

    /**
     * Obtiene los productos filtrados.
     */
    getProducts(): Observable<any[]> {
      return this.filteredProducts$;
    }

    /**
     * Agrega un producto al carrito.
     * @param product - Producto a agregar.
     */
    addToCart(product: any) {
      this.cart.push(product);
      this.cartCount.next(this.cart.length);
    }

    /**
     * Obtiene el carrito de compras.
     */
    getCart() {
      return this.cart;
    }

    /**
     * Filtra los productos por nombre o categoría.
     * @param query - Texto de búsqueda.
     */
    filterProducts(query: string) {
      query = query.toLowerCase().trim();
      if (!query) {
        this.filteredProducts.next(this.productos.getValue());
        return;
      }

      const filtered = this.productos.getValue().filter(p =>
        p.nombre.toLowerCase().includes(query) || p.categoria.toLowerCase().includes(query)
      );

      this.filteredProducts.next(filtered);
    }

    /**
     * Obtiene un producto por su nombre.
     * @param nombre - Nombre del producto.
     * @returns Producto encontrado o undefined si no existe.
     */
    getProductByName(nombre: string): any {
      return this.productos.getValue().find(p => p.nombre === nombre);
    }
  }
