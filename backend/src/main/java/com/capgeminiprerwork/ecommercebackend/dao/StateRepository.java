package com.capgeminiprerwork.ecommercebackend.dao;


import com.capgeminiprerwork.ecommercebackend.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {
    /**
     * @param code the country code
     * @return the list of states for a given country code
     */
    List<State> findByCountryCode(@Param("code") String code);
}
