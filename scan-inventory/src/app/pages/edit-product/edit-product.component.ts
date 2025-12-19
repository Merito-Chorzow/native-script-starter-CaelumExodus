import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NativeScriptCommonModule, TextValueAccessor } from '@nativescript/angular';
import { InventoryService } from '../../services/inventory.service';

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule, ReactiveFormsModule, TextValueAccessor],
  template: `
    <ActionBar title="Edit Product" />

    <StackLayout *ngIf="product; else notFound" [formGroup]="form">
      <TextField formControlName="name" hint="Name"></TextField>
      <TextField formControlName="code" hint="Code"></TextField>

      <Button text="Save changes" (tap)="save()"></Button>
    </StackLayout>

    <ng-template #notFound>
      <Label text="Product not found"></Label>
    </ng-template>
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
