package com.capgeminiprerwork.ecommercebackend.dao;

import com.capgeminiprerwork.ecommercebackend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);    // select * from product where category_id = :id

    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);  // select * from product where name like CONCAT('%', :name, '%')
}
