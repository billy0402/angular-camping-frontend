import { City } from '../city/city.model';
import { Product, ProductEdit } from './product.model';

export interface ProductGroup {
  id: number;
  name: string;
  coverImage: string | null;
  price: number;
  borrowStartDate: Date;
  borrowEndDate: Date;
  city: string;
  userName: string;
  productTypeArray: string[];
  comment: number | null;
}

export interface ProductGroupDetail {
  name: string;
  coverImage: string | null;
  city: City;
  price: number;
  borrowStartDate: Date;
  borrowEndDate: Date;
  productOwnerAccount: string;
  productOwnerName: string;
  contact: string;
  comment: number | null;
  productArray: Product[];
  bankAccount?: string;
}

export interface ProductGroupEdit {
  id?: number;
  name: string;
  coverImage: string | null;
  cityId: number;
  price: number;
  borrowStartDate: Date;
  borrowEndDate: Date;
  productArray: ProductEdit[];
}
