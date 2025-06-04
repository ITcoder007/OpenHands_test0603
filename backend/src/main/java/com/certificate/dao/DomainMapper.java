package com.certificate.dao;

import com.certificate.model.Domain;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * MyBatis mapper interface for Domain entity.
 * All SQL implementations are in DomainMapper.xml
 */
public interface DomainMapper {

    /**
     * Insert a new domain record
     * @param domain Domain entity to insert
     * @return Number of affected rows
     */
    int insert(Domain domain);

    /**
     * Update an existing domain record
     * @param domain Domain entity to update
     * @return Number of affected rows
     */
    int update(Domain domain);

    /**
     * Get all domain records
     * @return List of all domains
     */
    List<Domain> selectAll();

    /**
     * Get domain by ID
     * @param id Domain ID
     * @return Domain entity
     */
    Domain selectById(@Param("id") String id);

    /**
     * Delete domain by ID
     * @param id Domain ID to delete
     * @return Number of affected rows
     */
    int delete(@Param("id") String id);
}
