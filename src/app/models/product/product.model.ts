import { ProductImage } from './product-image.model';

export interface Product {
  id?: number;
  type: string;
  name: string;
  count: number;
  brand: string;
  appearance: string;
  useInformation: string;
  brokenCompensation: string;
  relatedLink: string | null;
  memo: string | null;
  imageArray: ProductImage[] | null;
}

export interface ProductEdit {
  id?: number;
  type: number;
  name: string;
  count: number;
  brand: string;
  appearance: string;
  useInformation: string;
  brokenCompensation: string;
  relatedLink: string | null;
  memo: string | null;
  imageArray: ProductImage[] | null;
}
