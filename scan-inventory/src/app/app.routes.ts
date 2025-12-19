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
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component')
        .then(m => m.ProductDetailComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/edit-product/edit-product.component')
        .then(m => m.EditProductComponent)
  }
];
