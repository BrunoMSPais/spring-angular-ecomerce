package com.capgeminiprerwork.ecommercebackend.service;

import com.capgeminiprerwork.ecommercebackend.dao.CustomerRepository;
import com.capgeminiprerwork.ecommercebackend.dto.PaymentInfo;
import com.capgeminiprerwork.ecommercebackend.dto.Purchase;
import com.capgeminiprerwork.ecommercebackend.dto.PurchaseResponse;
import com.capgeminiprerwork.ecommercebackend.entity.Customer;
import com.capgeminiprerwork.ecommercebackend.entity.Order;
import com.capgeminiprerwork.ecommercebackend.entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CheckoutServiceImpl implements CheckoutService {
	private final CustomerRepository customerRepository;

	@Autowired
	public CheckoutServiceImpl(CustomerRepository customerRepository,
	                           @Value("${stripe.secret.key}") String secretKey) {
		this.customerRepository = customerRepository;

		// init Stripe API with secret key
		Stripe.apiKey = secretKey;
	}

	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		// retrieve the order info from dto
		Order order = purchase.getOrder();

		// generate tracking number
		String orderTrackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber(orderTrackingNumber);

		// populate order with orderItems
		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(order::add);

		// populate order with billingAddress and shippingAddress
		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());

		// populate customer with order
		Customer customer = purchase.getCustomer();

		// check if this is an existing customer
		String theEmail = customer.getEmail();
		Customer customerFromDB = customerRepository.findByEmail(theEmail);
		if (customerFromDB != null) {
			// we found them ... let's assign them accordingly
			customer = customerFromDB;
		}

		// add order to customer
		customer.add(order);

		// save to the database
		customerRepository.save(customer);

		// return a response
		return new PurchaseResponse(orderTrackingNumber);
	}

	@Override
	public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {

		List<String> paymentMethodTypes = new ArrayList<>();
		paymentMethodTypes.add("card");

		Map<String, Object> params = new HashMap<>();
		params.put("amount", paymentInfo.getAmount());
		params.put("currency", paymentInfo.getCurrency());
		params.put("payment_method_types", paymentMethodTypes);

		return PaymentIntent.create(params);
	}

	private String generateOrderTrackingNumber() {
		// generate a random UUID number (UUID version-4)
		// For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier

		// check if the UUID is unique in the orders database
		// if not unique, then regenerate UUID
		// if unique, then return the UUID
        /*
        boolean isUnique = false;
        while (!isUnique) {
            Order order = ordersRepository.findByOrderTrackingNumber(uuid);
            if (order == null) {
                isUnique = true;
            } else {
                uuid = UUID.randomUUID().toString();
            }
        }
        */

		return UUID.randomUUID().toString();
	}
}
