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
    <ActionBar title="Add Product" />

    <StackLayout [formGroup]="form">
      <TextField formControlName="name" hint="Name"></TextField>
      <TextField formControlName="code" hint="Code"></TextField>

      <Button text="Take Photo" (tap)="photo()"></Button>

      @if(image()) {
        <Label text="Photo added"></Label>
      }

      <Button
        text="Save"
        (tap)="save()"
        ></Button>
    </StackLayout>
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
    this.image.set(await this.camera.takePhoto());
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
