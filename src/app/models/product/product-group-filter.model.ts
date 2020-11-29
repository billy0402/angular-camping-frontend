import { SelectType } from '../select-type.model';
import { City } from '../city/city.model';

export interface ProductGroupFilter {
  type: SelectType[];
  city: City;
}
