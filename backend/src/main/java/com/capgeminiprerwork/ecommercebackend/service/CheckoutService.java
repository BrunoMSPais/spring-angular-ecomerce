package com.capgeminiprerwork.ecommercebackend.service;

import com.capgeminiprerwork.ecommercebackend.dto.PaymentInfo;
import com.capgeminiprerwork.ecommercebackend.dto.Purchase;
import com.capgeminiprerwork.ecommercebackend.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
