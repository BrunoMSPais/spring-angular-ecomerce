import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  // Get products for a given category id or all products if no category id (categoryId?: number -> means optional parameter of type number)
  getProductList(categoryId?: number): Observable<Product[]> {
    // URL based on category id
    const searchUrl = categoryId
      ? `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
      : this.baseUrl + '?size=100'; // URL for the first 100 products including all categories

    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
