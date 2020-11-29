import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { SelectType } from '@models/select-type.model';
import {
  ProductGroup,
  ProductGroupDetail,
} from '@models/product/product-group.model';
import { ProductGroupFilter } from '@models/product/product-group-filter.model';

import { HttpWithRxService } from '@services/http-with-rx.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = '/product-group';

  constructor(private httpWithRxService: HttpWithRxService) {}

  getProductGroups(params: string): Observable<ProductGroup[]> {
    return this.httpWithRxService.get<ProductGroup[]>(
      `${this.baseUrl}?${params}`
    );
  }

  getProductGroupsByUser(account: string): Observable<ProductGroup[]> {
    return this.httpWithRxService.get<ProductGroup[]>(
      `${this.baseUrl}/user/${account}`
    );
  }

  getProductGroup(id: number): Observable<ProductGroupDetail> {
    return this.httpWithRxService.get<ProductGroupDetail>(
      `${this.baseUrl}/${id}`
    );
  }

  getProductGroupForEdit(id: number): Observable<ProductGroupDetail> {
    return this.httpWithRxService.get<ProductGroupDetail>(
      `${this.baseUrl}/update/${id}`
    );
  }

  addProductGroup(data: object): Observable<boolean> {
    return this.httpWithRxService.post<string>(this.baseUrl, data);
  }

  updateProductGroup(id: number, data: object): Observable<boolean> {
    return this.httpWithRxService.patch<string>(`${this.baseUrl}/${id}`, data);
  }

  deleteProductGroup(id: number): Observable<boolean> {
    return this.httpWithRxService.delete<string>(`${this.baseUrl}/${id}`);
  }

  addProductGroupComment(id: number, data: object): Observable<boolean> {
    return this.httpWithRxService.post<string>(
      `${this.baseUrl}/${id}/comment`,
      data
    );
  }

  updateProducts(groupId: number, data: object): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/${groupId}/product`,
      data
    );
  }

  updateProduct(
    groupId: number,
    productId: number,
    data: object
  ): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/${groupId}/product/${productId}`,
      data
    );
  }

  deleteProduct(productId: number): Observable<boolean> {
    return this.httpWithRxService.delete<string>(
      `${this.baseUrl}/product/${productId}`
    );
  }

  deleteProductImage(imageId: number): Observable<boolean> {
    return this.httpWithRxService.delete<string>(
      `${this.baseUrl}/product/image/${imageId}`
    );
  }

  getProductTypes(): Observable<SelectType[]> {
    return this.httpWithRxService.get<SelectType[]>(
      `${this.baseUrl}/product/type`
    );
  }

  getProductFilter(): Observable<ProductGroupFilter> {
    return this.httpWithRxService.get<ProductGroupFilter>(
      `${this.baseUrl}/filter`
    );
  }

  getProductBrands(): Observable<SelectType[]> {
    return this.httpWithRxService.get<SelectType[]>(`${this.baseUrl}/brand`);
  }

  getProductBrandTypes(brandId: number): Observable<SelectType[]> {
    return this.httpWithRxService.get<SelectType[]>(
      `${this.baseUrl}/type?brand=${brandId}`
    );
  }

  getProductBrandSubTypes(
    brandId: number,
    typeId: number
  ): Observable<SelectType[]> {
    return this.httpWithRxService.get<SelectType[]>(
      `${this.baseUrl}/sub-type?brand=${brandId}&type=${typeId}`
    );
  }

  getProductRecommendPrice(
    brandId: number,
    typeId: number,
    subTypeId: number
  ): Observable<{ price: number }> {
    return this.httpWithRxService.get<{ price: number }>(
      `${this.baseUrl}/recommend-price?brand=${brandId}&type=${typeId}&subType=${subTypeId}`
    );
  }
}
