package com.capgeminiprerwork.ecommercebackend.dto;

import lombok.Data;

@Data
public class PaymentInfo {

	private String currency;
	private int amount;	// in cents
}
