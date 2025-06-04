package com.certificate.dto;

import java.util.Objects;

/**
 * Data Transfer Object for Domain operations.
 * Used for receiving domain data from frontend requests.
 */
public class DomainDTO {
    private String name;
    private String description;

    /**
     * Default constructor.
     */
    public DomainDTO() {
    }

    /**
     * Constructor with all fields.
     * @param name The name of the domain
     * @param description The description of the domain
     */
    public DomainDTO(String name, String description) {
        this.name = name;
        this.description = description;
    }

    /**
     * Gets the domain name.
     * @return The domain name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the domain name.
     * @param name The domain name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the domain description.
     * @return The domain description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the domain description.
     * @param description The domain description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DomainDTO domainDTO = (DomainDTO) o;
        return Objects.equals(name, domainDTO.name) && 
               Objects.equals(description, domainDTO.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, description);
    }

    @Override
    public String toString() {
        return "DomainDTO{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
