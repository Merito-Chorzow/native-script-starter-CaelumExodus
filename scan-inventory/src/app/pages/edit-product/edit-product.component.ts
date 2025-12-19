import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NativeScriptCommonModule, TextValueAccessor } from '@nativescript/angular';
import { InventoryService } from '../../services/inventory.service';

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule, ReactiveFormsModule, TextValueAccessor],
  template: `
    <ActionBar title="Edit Product" class="bg-gray-800 text-white" />

    <ScrollView class="p-4 bg-gray-50">
      @if (product) {
        <StackLayout [formGroup]="form" class="space-y-4">

          <TextField
            formControlName="name"
            hint="Name"
            class="border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
          ></TextField>

          <TextField
            formControlName="code"
            hint="Code"
            class="border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
          ></TextField>

          <Button
            text="Save changes"
            (tap)="save()"
            class="bg-gray-800 text-white rounded-lg py-2 shadow"
          ></Button>

        </StackLayout>
      } @else {
        <Label text="Product not found" class="text-red-500 font-medium text-center mt-4"></Label>
      }
    </ScrollView>
  `
})
export class EditProductComponent {
  product = this.inventory.getById(this.route.snapshot.params['id']);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private inventory: InventoryService,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (this.product) {
      this.form.patchValue({
        name: this.product.name,
        code: this.product.code
      });
    }
  }

  save() {
    if (!this.product || this.form.invalid) {
      return;
    }

    const { name, code } = this.form.getRawValue();

    this.inventory.update({
      ...this.product,
      name,
      code
    });

    this.router.navigate(['/']);
  }
}
