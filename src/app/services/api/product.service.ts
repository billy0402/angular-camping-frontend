import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model.model';
import {
  ProductGroup,
  ProductGroupDetail,
} from '@models/product/product-group.model';
import {
  ProductSubType,
  ProductType,
} from '@models/product/product-type.model';
import { ProductGroupFilter } from '@models/product/product-group-filter.model';
import { ProductBrand } from '@models/product/product-brand.model';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = '/product-group';

  constructor(private httpService: HttpService) {}

  getProductGroups(params: string): Observable<ApiModel<ProductGroup[]>> {
    return this.httpService.get<ProductGroup[]>(`${this.baseUrl}?${params}`);
  }

  getProductGroupsByUser(
    account: string
  ): Observable<ApiModel<ProductGroup[]>> {
    return this.httpService.get<ProductGroup[]>(
      `${this.baseUrl}/user/${account}`
    );
  }

  getProductGroup(id: number): Observable<ApiModel<ProductGroupDetail>> {
    return this.httpService.get<ProductGroupDetail>(`${this.baseUrl}/${id}`);
  }

  getProductGroupForEdit(id: number): Observable<ApiModel<ProductGroupDetail>> {
    return this.httpService.get<ProductGroupDetail>(
      `${this.baseUrl}/update/${id}`
    );
  }

  addProductGroup(data: object): Observable<ApiModel<string>> {
    return this.httpService.post<string>(this.baseUrl, data);
  }

  updateProductGroup(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(`${this.baseUrl}/${id}`, data);
  }

  deleteProductGroup(id: number): Observable<ApiModel<string>> {
    return this.httpService.delete<string>(`${this.baseUrl}/${id}`);
  }

  addProductGroupComment(
    id: number,
    data: object
  ): Observable<ApiModel<string>> {
    return this.httpService.post<string>(`${this.baseUrl}/${id}/comment`, data);
  }

  updateProducts(groupId: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${groupId}/product`,
      data
    );
  }

  updateProduct(
    groupId: number,
    productId: number,
    data: object
  ): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${groupId}/product/${productId}`,
      data
    );
  }

  deleteProduct(productId: number): Observable<ApiModel<string>> {
    return this.httpService.delete<string>(
      `${this.baseUrl}/product/${productId}`
    );
  }

  deleteProductImage(imageId: number): Observable<ApiModel<string>> {
    return this.httpService.delete<string>(
      `${this.baseUrl}/product/image/${imageId}`
    );
  }

  getProductTypes(): Observable<ApiModel<ProductType[]>> {
    return this.httpService.get<ProductType[]>(`${this.baseUrl}/product/type`);
  }

  getProductFilter(): Observable<ApiModel<ProductGroupFilter>> {
    return this.httpService.get<ProductGroupFilter>(`${this.baseUrl}/filter`);
  }

  getProductBrands(): Observable<ApiModel<ProductBrand[]>> {
    return this.httpService.get<ProductBrand[]>(`${this.baseUrl}/brand`);
  }

  getProductBrandTypes(brandId: number): Observable<ApiModel<ProductType[]>> {
    return this.httpService.get<ProductType[]>(
      `${this.baseUrl}/type?brand=${brandId}`
    );
  }

  getProductBrandSubTypes(
    brandId: number,
    typeId: number
  ): Observable<ApiModel<ProductSubType[]>> {
    return this.httpService.get<ProductSubType[]>(
      `${this.baseUrl}/sub-type?brand=${brandId}&type=${typeId}`
    );
  }

  getProductRecommendPrice(
    brandId: number,
    typeId: number,
    subTypeId: number
  ): Observable<ApiModel<{ price: number }>> {
    return this.httpService.get<{ price: number }>(
      `${this.baseUrl}/recommend-price?brand=${brandId}&type=${typeId}&subType=${subTypeId}`
    );
  }
}
