package com.certificate.controller;

import com.certificate.dto.CertificateDTO;
import com.certificate.service.CertificateService;
import com.certificate.vo.CertificateVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @PostMapping
    public ResponseEntity<CertificateVO> addCertificate(@RequestBody CertificateDTO certificateDTO) {
        CertificateVO certificateVO = certificateService.createCertificate(certificateDTO);
        return ResponseEntity.ok(certificateVO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CertificateVO> updateCertificate(
            @PathVariable String id,
            @RequestBody CertificateDTO certificateDTO) {
        CertificateVO certificateVO = certificateService.updateCertificate(id, certificateDTO);
        return ResponseEntity.ok(certificateVO);
    }

    @GetMapping
    public ResponseEntity<List<CertificateVO>> listCertificatesByDomain(
            @RequestParam String domainId) {
        List<CertificateVO> certificates = certificateService.listCertificatesByDomain(domainId);
        return ResponseEntity.ok(certificates);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificateVO> getCertificate(@PathVariable String id) {
        CertificateVO certificateVO = certificateService.getCertificate(id);
        return ResponseEntity.ok(certificateVO);
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<Boolean> changeCertificateStatus(
            @PathVariable String id,
            @RequestParam String status) {
        boolean result = certificateService.changeCertificateStatus(id, status);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteCertificate(@PathVariable String id) {
        boolean result = certificateService.deleteCertificate(id);
        return ResponseEntity.ok(result);
    }
}
