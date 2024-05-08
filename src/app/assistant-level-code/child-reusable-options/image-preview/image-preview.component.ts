import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [MatIconModule, ImageCropperModule],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.scss'
})
export class ImagePreviewComponent {
  @Input() imagePreviewUrl?: string | ArrayBuffer;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  @Output() clear: EventEmitter<void> = new EventEmitter();
  @Output() edited: EventEmitter<string> = new EventEmitter();

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.edited.emit(this.croppedImage);
  }

  clearPreview() {
    this.imagePreviewUrl = undefined;
    this.croppedImage = '';
    this.imageChangedEvent = '';
    this.clear.emit();
  }
}
