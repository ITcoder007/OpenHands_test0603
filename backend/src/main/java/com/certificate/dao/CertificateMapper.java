package com.certificate.dao;

import com.certificate.model.Certificate;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * MyBatis Mapper interface for certificate operations.
 */
public interface CertificateMapper {

    /**
     * Inserts a new certificate record.
     * @param certificate The certificate to insert
     * @return Number of affected rows
     */
    int insert(Certificate certificate);

    /**
     * Updates an existing certificate record.
     * @param certificate The certificate to update
     * @return Number of affected rows
     */
    int update(Certificate certificate);

    /**
     * Finds certificates by domain ID.
     * @param domainId The domain ID to search by
     * @return List of certificates for the domain
     */
    List<Certificate> selectByDomainId(@Param("domainId") String domainId);

    /**
     * Finds a certificate by its ID.
     * @param id The certificate ID
     * @return The certificate or null if not found
     */
    Certificate selectById(@Param("id") String id);

    /**
     * Updates the status of a certificate.
     * @param id The certificate ID
     * @param status The new status
     * @return Number of affected rows
     */
    int updateStatus(@Param("id") String id, @Param("status") String status);

    /**
     * Deletes a certificate by its ID.
     * @param id The certificate ID to delete
     * @return Number of affected rows
     */
    int delete(@Param("id") String id);
}
