import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private _products = signal<Product[]>([]);

  products = this._products.asReadonly();

  load() {
    if (this._products().length === 0) {
      this._products.set([
        { id: '1', name: 'Laptop', code: 'LP-0011' }
      ]);
    }
  }

  add(product: Product) {
    this._products.update(p => [...p, product]);
  }

  getById(id: string) {
    return this._products().find(p => p.id === id);
  }

  update(updated: Product) {
    this._products.update(products =>
      products.map(p => (p.id === updated.id ? updated : p))
    );
  }
}
