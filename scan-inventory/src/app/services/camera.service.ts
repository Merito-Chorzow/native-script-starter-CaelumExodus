import { Injectable } from '@angular/core';
import { takePicture, requestPermissions } from '@nativescript/camera';

@Injectable({ providedIn: 'root' })
export class CameraService {
  async takePhoto(): Promise<string | null> {
    await requestPermissions();
    const image = await takePicture({ width: 300, height: 300 });
    return image?.android || null;
  }
}
