export class SliderImage {
  image: string;
  thumbImage: string;
  alt = 'product';

  constructor(image: string) {
    this.image = image;
    this.thumbImage = image;
  }
}
