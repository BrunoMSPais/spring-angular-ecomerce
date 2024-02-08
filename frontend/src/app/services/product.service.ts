import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ProductCategory } from '../common/product-category';
import { Product } from '../common/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private categoryUrl = environment.luv2shopApiUrl + '/product-category';
  private baseUrl = environment.luv2shopApiUrl + '/products';

  constructor(private httpClient: HttpClient) {}

  // Get product by id
  getProduct(theProductId: number): Observable<Product> {
    // URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  // Get products for a given category id or all products if no category id (categoryId?: number -> means optional parameter of type number)
  getProductList(categoryId?: number): Observable<Product[]> {
    // URL based on category id
    const searchUrl = categoryId
      ? `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
      : this.baseUrl; // URL for the first 100 products including all categories

    console.log(`Getting products from - ${searchUrl}`);

    return this.getProducts(searchUrl);
  }

  // Get product categories
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  // Search products by keyword
  searchProducts(theKeyword: string): Observable<Product[]> {
    // URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  // Pagination
  // Get products by category id and page number
  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId?: number
  ): Observable<GetResponseProducts> {
    if (!theCategoryId) {
      // URL based on page number and page size
      const url = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;

      return this.httpClient.get<GetResponseProducts>(url);
    }
    // URL based on category id, page number and page size
    const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(url);
  }

  // Pagination for search
  // Get products by keyword and page number
  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
