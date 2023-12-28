package com.capgeminiprerwork.ecommercebackend.dto;

import com.capgeminiprerwork.ecommercebackend.entity.Address;
import com.capgeminiprerwork.ecommercebackend.entity.Customer;
import com.capgeminiprerwork.ecommercebackend.entity.Order;
import com.capgeminiprerwork.ecommercebackend.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
