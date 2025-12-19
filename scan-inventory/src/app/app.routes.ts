import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/product-list/product-list.component')
        .then(m => m.ProductListComponent)
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/add-product/add-product.component')
        .then(m => m.AddProductComponent)
  },
];
