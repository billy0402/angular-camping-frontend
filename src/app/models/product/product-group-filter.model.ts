import { ProductType } from './product-type.model';
import { City } from '../city/city.model';

export interface ProductGroupFilter {
  type: ProductType[];
  city: City;
}
