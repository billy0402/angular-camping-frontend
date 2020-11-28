import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoolProofDialogComponent } from './fool-proof-dialog/fool-proof-dialog.component';
import { ImageCropperDialogComponent } from './image-cropper-dialog/image-cropper-dialog.component';
import { StarComponent } from './star/star.component';
import { TopBarComponent } from './top-bar/top-bar.component';



@NgModule({
  declarations: [FoolProofDialogComponent, ImageCropperDialogComponent, StarComponent, TopBarComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
