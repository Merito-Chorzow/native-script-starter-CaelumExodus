import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private _products = signal<Product[]>([]);

  products = this._products.asReadonly();

  load() {
    // symulacja API GET
    this._products.set([
      { id: '1', name: 'Laptop', code: 'LP-0011' }
    ]);
  }

  add(product: Product) {
    // symulacja API POST
    this._products.update(p => [...p, product]);
  }

  getById(id: string) {
    return this._products().find(p => p.id === id);
  }
}
