package com.capgeminiprerwork.ecommercebackend.dao;

import com.capgeminiprerwork.ecommercebackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200") // allow Angular app to access this endpoint
public interface ProductRepository extends JpaRepository<Product, Long> {
}
