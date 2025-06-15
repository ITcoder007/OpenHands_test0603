package com.certificate.service;

import com.certificate.dao.DomainMapper;
import com.certificate.model.Domain;
import com.certificate.dto.DomainDTO;
import com.certificate.vo.DomainVO;
import com.certificate.exception.DomainNotFoundException;
import com.certificate.exception.DomainOperationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DomainService {
    private static final Logger logger = LoggerFactory.getLogger(DomainService.class);
    private static final String DEFAULT_STATUS = "ACTIVE";
    
    private final DomainMapper domainMapper;
    private final UserContext userContext;

    @Autowired
    public DomainService(DomainMapper domainMapper, UserContext userContext) {
        this.domainMapper = domainMapper;
        this.userContext = userContext;
    }

    @Transactional
    public DomainVO createDomain(DomainDTO domainDTO) {
        validateDomainDTO(domainDTO);
        
        Domain domain = new Domain();
        domain.setId(UUID.randomUUID().toString());
        domain.setName(domainDTO.getName());
        domain.setDescription(domainDTO.getDescription());
        domain.setStatus(DEFAULT_STATUS);
        domain.setCreatedBy(userContext.getCurrentUserId());
        domain.setCreatedAt(new Date());

        logger.info("Creating domain: {}", domainDTO.getName());
        
        int rowsAffected = domainMapper.insert(domain);
        if (rowsAffected == 0) {
            throw new DomainOperationException("Failed to create domain");
        }

        Domain createdDomain = domainMapper.selectById(domain.getId());
        return convertToVO(createdDomain);
    }

    @Transactional
    public DomainVO updateDomain(String id, DomainDTO domainDTO) {
        validateDomainDTO(domainDTO);
        
        Domain existingDomain = domainMapper.selectById(id);
        if (existingDomain == null) {
            throw new DomainNotFoundException(id);
        }

        existingDomain.setName(domainDTO.getName());
        existingDomain.setDescription(domainDTO.getDescription());
        existingDomain.setUpdatedBy(userContext.getCurrentUserId());
        existingDomain.setUpdatedAt(new Date());

        logger.info("Updating domain with id: {}", id);
        
        int rowsAffected = domainMapper.update(existingDomain);
        if (rowsAffected == 0) {
            throw new DomainOperationException("Failed to update domain");
        }

        Domain updatedDomain = domainMapper.selectById(id);
        return convertToVO(updatedDomain);
    }

    public List<DomainVO> listDomains() {
        logger.debug("Fetching all domains");
        List<Domain> domains = domainMapper.selectAll();
        return domains.stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    public DomainVO getDomain(String id) {
        logger.debug("Fetching domain with id: {}", id);
        Domain domain = domainMapper.selectById(id);
        if (domain == null) {
            throw new DomainNotFoundException(id);
        }
        return convertToVO(domain);
    }

    @Transactional
    public boolean deleteDomain(String id) {
        logger.info("Deleting domain with id: {}", id);
        int rowsAffected = domainMapper.delete(id);
        return rowsAffected > 0;
    }

    private DomainVO convertToVO(Domain domain) {
        DomainVO vo = new DomainVO();
        vo.setId(domain.getId());
        vo.setName(domain.getName());
        vo.setDescription(domain.getDescription());
        vo.setStatus(domain.getStatus());
        vo.setCreatedAt(domain.getCreatedAt());
        vo.setUpdatedAt(domain.getUpdatedAt());
        return vo;
    }

    private void validateDomainDTO(DomainDTO domainDTO) {
        if (domainDTO == null) {
            throw new IllegalArgumentException("DomainDTO cannot be null");
        }
        if (domainDTO.getName() == null || domainDTO.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Domain name cannot be empty");
        }
    }
}
