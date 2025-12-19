import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { InventoryService } from '../../services/inventory.service';

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule],
  template: `
    <ActionBar title="Inventory" class="bg-gray-800 text-white">
      <ActionItem text="+" (tap)="goAdd()" ios.position="right" class="font-bold text-white" />
    </ActionBar>

    <ListView [items]="products()" class="bg-gray-50 p-2">
      <ng-template let-item="item">
        <StackLayout
          (tap)="open(item.id)"
          class="bg-white p-4 mb-2 rounded-lg shadow"
        >
          <Label [text]="item.name" class="text-lg font-semibold text-gray-800"></Label>
          <Label [text]="item.code" class="text-xs text-gray-500 mt-1"></Label>
        </StackLayout>
      </ng-template>
    </ListView>
  `
})
export class ProductListComponent implements OnInit {
  products = this.inventory.products;

  constructor(
    private inventory: InventoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.inventory.load();
  }

  goAdd() {
    this.router.navigate(['/add']);
  }

  open(id: string) {
    this.router.navigate(['/detail', id]);
  }
}
