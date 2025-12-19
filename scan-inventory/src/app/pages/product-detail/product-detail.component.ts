import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { InventoryService } from '../../services/inventory.service';

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule],
  template: `
    <ActionBar title="Product Details" />

    @if(product) {
      <StackLayout>
        <Label [text]="product.name"></Label>
        <Label [text]="product.code"></Label>

        <Button
          text="Edit"
          (tap)="edit()">
        </Button>
      </StackLayout>
    } @else {
      <Label text="Not found"></Label>
    }
  `
})
export class ProductDetailComponent {
  product = this.inventory.getById(
    this.route.snapshot.params['id']
  );

  constructor(
    private route: ActivatedRoute,
    private inventory: InventoryService,
    private router: Router,
) {}

  edit() {
    this.router.navigate(['/edit', this.product!.id]);
  }
}
