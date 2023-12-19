package com.capgeminiprerwork.ecommercebackend.dao;

import com.capgeminiprerwork.ecommercebackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
