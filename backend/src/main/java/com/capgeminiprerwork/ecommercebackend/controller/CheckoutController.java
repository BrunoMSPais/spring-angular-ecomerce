package com.capgeminiprerwork.ecommercebackend.controller;

import com.capgeminiprerwork.ecommercebackend.dto.Purchase;
import com.capgeminiprerwork.ecommercebackend.dto.PurchaseResponse;
import com.capgeminiprerwork.ecommercebackend.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        return checkoutService.placeOrder(purchase);
    }
}
