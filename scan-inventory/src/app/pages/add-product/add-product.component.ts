import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeScriptCommonModule, TextValueAccessor } from '@nativescript/angular';
import { InventoryService } from '../../services/inventory.service';
import { CameraService } from '../../services/camera.service';

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule, ReactiveFormsModule, TextValueAccessor],
  template: `
    <ActionBar title="Add Product" class="bg-gray-800 text-white" />

    <ScrollView class="p-4 bg-gray-50">
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
          text="Take Photo"
          (tap)="photo()"
          class="bg-gray-700 text-white rounded-lg py-2 shadow"
        ></Button>

        @if (image()) {
          <Label text="Photo added" class="text-green-600 font-medium"></Label>
        } @else {
          <Label text="No photo yet" class="text-gray-500"></Label>
        }

        <Button
          text="Save"
          (tap)="save()"
          class="bg-gray-800 text-white rounded-lg py-2 shadow"
        ></Button>

      </StackLayout>
    </ScrollView>
  `
})
export class AddProductComponent {
  image = signal<string | null>(null);

  form = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private inventory: InventoryService,
    private camera: CameraService,
    private router: Router
  ) {}

  async photo() {
    const photoPath = await this.camera.takePhoto();
    if (photoPath) {
      this.image.set(photoPath);
    }
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const value = this.form.getRawValue();

    this.inventory.add({
      id: Date.now().toString(),
      name: value.name!,
      code: value.code!,
      imagePath: this.image() ?? undefined
    });

    this.router.navigate(['/']);
  }
}
