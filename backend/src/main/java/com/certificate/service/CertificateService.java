package com.certificate.service;

import com.certificate.dao.CertificateMapper;
import com.certificate.dto.CertificateDTO;
import com.certificate.exception.CertificateNotFoundException;
import com.certificate.exception.CertificateOperationFailedException;
import com.certificate.model.Certificate;
import com.certificate.vo.CertificateVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CertificateService {
    private static final Logger logger = LoggerFactory.getLogger(CertificateService.class);
    private static final String ACTIVE_STATUS = "ACTIVE";

    private final CertificateMapper certificateMapper;

    @Autowired
    public CertificateService(CertificateMapper certificateMapper) {
        this.certificateMapper = certificateMapper;
    }

    @Transactional
    public CertificateVO createCertificate(CertificateDTO certificateDTO) {
        validateCertificateDTO(certificateDTO);
        
        Certificate certificate = new Certificate();
        certificate.setId(UUID.randomUUID().toString());
        certificate.setName(certificateDTO.getName());
        certificate.setDomainId(certificateDTO.getDomainId());
        certificate.setStartDate(certificateDTO.getStartDate());
        certificate.setEndDate(certificateDTO.getEndDate());
        certificate.setStatus(ACTIVE_STATUS);
        certificate.setContentMd5(certificateDTO.getContentMd5());
        certificate.setCreatedBy(getCurrentUsername());
        certificate.setCreatedAt(new Date());

        try {
            int rowsAffected = certificateMapper.insert(certificate);
            if (rowsAffected == 0) {
                throw new CertificateOperationFailedException("Failed to create certificate");
            }
            logger.info("Created certificate with id: {}", certificate.getId());
            return convertToVO(certificateMapper.selectById(certificate.getId()));
        } catch (Exception e) {
            logger.error("Error creating certificate", e);
            throw new CertificateOperationFailedException("Error creating certificate", e);
        }
    }

    @Transactional
    public CertificateVO updateCertificate(String id, CertificateDTO certificateDTO) {
        validateCertificateDTO(certificateDTO);
        
        Certificate existingCertificate = certificateMapper.selectById(id);
        if (existingCertificate == null) {
            throw new CertificateNotFoundException("Certificate not found with id: " + id);
        }

        existingCertificate.setName(certificateDTO.getName());
        existingCertificate.setDomainId(certificateDTO.getDomainId());
        existingCertificate.setStartDate(certificateDTO.getStartDate());
        existingCertificate.setEndDate(certificateDTO.getEndDate());
        existingCertificate.setContentMd5(certificateDTO.getContentMd5());
        existingCertificate.setUpdatedBy(getCurrentUsername());
        existingCertificate.setUpdatedAt(new Date());

        try {
            int rowsAffected = certificateMapper.update(existingCertificate);
            if (rowsAffected == 0) {
                throw new CertificateOperationFailedException("Failed to update certificate");
            }
            logger.info("Updated certificate with id: {}", id);
            return convertToVO(certificateMapper.selectById(id));
        } catch (Exception e) {
            logger.error("Error updating certificate with id: {}", id, e);
            throw new CertificateOperationFailedException("Error updating certificate", e);
        }
    }

    public List<CertificateVO> listCertificatesByDomain(String domainId) {
        if (!StringUtils.hasText(domainId)) {
            throw new IllegalArgumentException("Domain ID cannot be empty");
        }
        
        try {
            List<Certificate> certificates = certificateMapper.selectByDomainId(domainId);
            logger.debug("Found {} certificates for domain {}", certificates.size(), domainId);
            return certificates.stream()
                    .map(this::convertToVO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error listing certificates for domain: {}", domainId, e);
            throw new CertificateOperationFailedException("Error listing certificates", e);
        }
    }

    public CertificateVO getCertificate(String id) {
        if (!StringUtils.hasText(id)) {
            throw new IllegalArgumentException("Certificate ID cannot be empty");
        }
        
        Certificate certificate = certificateMapper.selectById(id);
        if (certificate == null) {
            throw new CertificateNotFoundException("Certificate not found with id: " + id);
        }
        return convertToVO(certificate);
    }

    @Transactional
    public boolean changeCertificateStatus(String id, String status) {
        if (!StringUtils.hasText(id) || !StringUtils.hasText(status)) {
            throw new IllegalArgumentException("ID and status cannot be empty");
        }
        
        try {
            int rowsAffected = certificateMapper.updateStatus(id, status);
            if (rowsAffected > 0) {
                logger.info("Changed status of certificate {} to {}", id, status);
                return true;
            }
            return false;
        } catch (Exception e) {
            logger.error("Error changing status for certificate: {}", id, e);
            throw new CertificateOperationFailedException("Error changing certificate status", e);
        }
    }

    @Transactional
    public boolean deleteCertificate(String id) {
        if (!StringUtils.hasText(id)) {
            throw new IllegalArgumentException("Certificate ID cannot be empty");
        }
        
        try {
            int rowsAffected = certificateMapper.delete(id);
            if (rowsAffected > 0) {
                logger.info("Deleted certificate with id: {}", id);
                return true;
            }
            return false;
        } catch (Exception e) {
            logger.error("Error deleting certificate: {}", id, e);
            throw new CertificateOperationFailedException("Error deleting certificate", e);
        }
    }

    private CertificateVO convertToVO(Certificate certificate) {
        CertificateVO vo = new CertificateVO();
        vo.setId(certificate.getId());
        vo.setName(certificate.getName());
        vo.setDomainId(certificate.getDomainId());
        vo.setStartDate(certificate.getStartDate());
        vo.setEndDate(certificate.getEndDate());
        vo.setStatus(certificate.getStatus());
        vo.setContentMd5(certificate.getContentMd5());
        vo.setCreatedAt(certificate.getCreatedAt());
        vo.setUpdatedAt(certificate.getUpdatedAt());
        return vo;
    }

    private void validateCertificateDTO(CertificateDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("CertificateDTO cannot be null");
        }
        if (!StringUtils.hasText(dto.getName())) {
            throw new IllegalArgumentException("Certificate name cannot be empty");
        }
        if (!StringUtils.hasText(dto.getDomainId())) {
            throw new IllegalArgumentException("Domain ID cannot be empty");
        }
        if (dto.getStartDate() == null || dto.getEndDate() == null) {
            throw new IllegalArgumentException("Start and end dates cannot be null");
        }
        if (dto.getStartDate().after(dto.getEndDate())) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }
    }

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
