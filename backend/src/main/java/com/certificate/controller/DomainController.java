package com.certificate.controller;

import com.certificate.dto.DomainDTO;
import com.certificate.service.DomainService;
import com.certificate.vo.DomainVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Domain REST API controller for managing domain operations.
 */
@RestController
@RequestMapping("/api/domains")
public class DomainController {

    private final DomainService domainService;

    @Autowired
    public DomainController(DomainService domainService) {
        this.domainService = domainService;
    }

    /**
     * Add a new domain.
     * @param domainDTO Domain data transfer object
     * @return ResponseEntity containing the created domain view object
     */
    @PostMapping
    public ResponseEntity<DomainVO> addDomain(@RequestBody DomainDTO domainDTO) {
        DomainVO createdDomain = domainService.createDomain(domainDTO);
        return ResponseEntity.ok(createdDomain);
    }

    /**
     * Update an existing domain.
     * @param id Domain ID
     * @param domainDTO Domain data transfer object
     * @return ResponseEntity containing the updated domain view object
     */
    @PutMapping("/{id}")
    public ResponseEntity<DomainVO> updateDomain(
            @PathVariable String id,
            @RequestBody DomainDTO domainDTO) {
        DomainVO updatedDomain = domainService.updateDomain(id, domainDTO);
        return ResponseEntity.ok(updatedDomain);
    }

    /**
     * Get all domains.
     * @return ResponseEntity containing list of domain view objects
     */
    @GetMapping
    public ResponseEntity<List<DomainVO>> listDomains() {
        List<DomainVO> domains = domainService.listDomains();
        return ResponseEntity.ok(domains);
    }

    /**
     * Get domain by ID.
     * @param id Domain ID
     * @return ResponseEntity containing the domain view object
     */
    @GetMapping("/{id}")
    public ResponseEntity<DomainVO> getDomain(@PathVariable String id) {
        DomainVO domain = domainService.getDomain(id);
        return ResponseEntity.ok(domain);
    }

    /**
     * Delete domain by ID.
     * @param id Domain ID
     * @return ResponseEntity with boolean indicating success
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteDomain(@PathVariable String id) {
        boolean result = domainService.deleteDomain(id);
        return ResponseEntity.ok(result);
    }
}
