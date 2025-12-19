import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { InventoryService } from '../../services/inventory.service';

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule],
  template: `
    <ActionBar title="Inventory">
      <ActionItem text="+" (tap)="goAdd()" ios.position="right" />
    </ActionBar>

    <ListView [items]="products()">
      <ng-template let-item="item">
        <StackLayout (tap)="open(item.id)">
          <Label [text]="item.name"></Label>
          <Label [text]="item.code" class="text-xs"></Label>
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
