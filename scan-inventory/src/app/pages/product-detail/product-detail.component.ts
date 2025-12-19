import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { InventoryService } from '../../services/inventory.service';

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule],
  template: `
    <ActionBar title="Product Details" class="bg-gray-800 text-white" />

    <ScrollView class="p-4 bg-gray-50">
      @if (product) {
        <StackLayout class="bg-white p-4 rounded-lg shadow space-y-3">

          <Label [text]="product.name" class="text-xl font-semibold text-gray-800"></Label>
          <Label [text]="product.code" class="text-gray-600"></Label>

          <Button
            text="Edit"
            (tap)="edit()"
            class="bg-gray-800 text-white rounded-lg py-2 shadow"
          ></Button>

        </StackLayout>
      } @else {
        <Label text="Not found" class="text-red-500 font-medium text-center mt-4"></Label>
      }
    </ScrollView>
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
