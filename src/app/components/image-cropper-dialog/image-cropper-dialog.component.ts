import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ImageCroppedEvent } from 'ngx-image-cropper';

interface ImageCropperDialogData {
  image: string;
  isEdit: boolean;
}

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss'],
})
export class ImageCropperDialogComponent implements OnInit {
  imageChangedEvent!: Event;
  croppedImage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ImageCropperDialogData,
    private dialogRef: MatDialogRef<ImageCropperDialogComponent>
  ) {}

  ngOnInit(): void {}

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64 || '';
  }

  imageLoaded(): void {
    // show cropper
  }

  cropperReady(): void {
    // cropper ready
  }

  loadImageFailed(): void {
    // show message
  }

  onSubmit(): void {
    this.dialogRef.close({
      image: this.croppedImage,
      isEdit: this.data.isEdit,
    });
  }
}
