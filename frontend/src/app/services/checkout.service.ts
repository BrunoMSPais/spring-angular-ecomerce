import { environment } from '../../environments/environment';
import { PaymentInfo } from './../common/payment-info';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../common/purchase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private purchaseUrl = environment.luv2shopApiUrl + '/checkout/purchase';

  private paymentIntentUrl =
    environment.luv2shopApiUrl + '/checkout/payment-intent';

  constructor(private httpClient: HttpClient) {}

  placeOrder(purchase: Purchase) {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

  createPaymentIntent(paymentInfo: PaymentInfo) {
    return this.httpClient.post<PaymentInfo>(
      this.paymentIntentUrl,
      paymentInfo
    );
  }
}
