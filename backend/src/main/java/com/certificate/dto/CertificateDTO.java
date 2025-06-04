package com.certificate.dto;

import java.util.Date;

/**
 * Data Transfer Object for Certificate operations.
 * Used for receiving certificate data from API requests.
 */
public class CertificateDTO {
    private String name;
    private String domainId;
    private Date startDate;
    private Date endDate;
    private String contentMd5;

    // Default constructor
    public CertificateDTO() {
    }

    // Parameterized constructor
    public CertificateDTO(String name, String domainId, Date startDate, Date endDate, String contentMd5) {
        this.name = name;
        this.domainId = domainId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.contentMd5 = contentMd5;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomainId() {
        return domainId;
    }

    public void setDomainId(String domainId) {
        this.domainId = domainId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getContentMd5() {
        return contentMd5;
    }

    public void setContentMd5(String contentMd5) {
        this.contentMd5 = contentMd5;
    }

    @Override
    public String toString() {
        return "CertificateDTO{" +
                "name='" + name + '\'' +
                ", domainId='" + domainId + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", contentMd5='" + contentMd5 + '\'' +
                '}';
    }
}
