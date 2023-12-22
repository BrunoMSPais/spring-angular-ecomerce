import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../common/cart-item';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product(
    0,
    '',
    '',
    '',
    0,
    '',
    false,
    0,
    new Date(),
    new Date()
  );

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
    console.log('Product details:', { ...this.product });
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
      console.log('New product details:', { ...this.product });
    });
  }

  addToCart() {
    console.log('Adding to cart from product details', {
      name: this.product.name,
      unitPrice: this.product.unitPrice,
    });

    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
