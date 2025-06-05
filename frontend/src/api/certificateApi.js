import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
/**
 * Certificate API client for interacting with certificate-related endpoints
 */
export const certificateApi = {
    /**
     * Get certificate by ID
     * @param id Certificate ID
     * @returns Promise resolving to CertificateVO
     */
    getCertificate: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/certificates/${id}`);
        return response.data;
    },
    /**
     * Add new certificate
     * @param data CertificateDTO containing certificate data
     * @returns Promise resolving to created CertificateVO
     */
    addCertificate: async (data) => {
        const response = await axios.post(`${API_BASE_URL}/certificates`, data);
        return response.data;
    },
    /**
     * Update existing certificate
     * @param id Certificate ID to update
     * @param data CertificateDTO containing updated data
     * @returns Promise resolving to updated CertificateVO
     */
    updateCertificate: async (id, data) => {
        const response = await axios.put(`${API_BASE_URL}/certificates/${id}`, data);
        return response.data;
    },
    /**
     * Get certificates by domain ID
     * @param domainId Domain ID to filter certificates
     * @returns Promise resolving to array of CertificateVO
     */
    getCertificatesByDomain: async (domainId) => {
        const response = await axios.get(`${API_BASE_URL}/certificates`, {
            params: { domainId }
        });
        return response.data;
    },
    /**
     * Change certificate status
     * @param id Certificate ID to update
     * @param status New status value
     * @returns Promise resolving to boolean indicating success
     */
    changeCertificateStatus: async (id, status) => {
        const response = await axios.post(`${API_BASE_URL}/certificates/${id}/status`, null, {
            params: { status }
        });
        return response.data;
    },
    /**
     * Delete certificate
     * @param id Certificate ID to delete
     * @returns Promise resolving to boolean indicating success
     */
    deleteCertificate: async (id) => {
        const response = await axios.delete(`${API_BASE_URL}/certificates/${id}`);
        return response.data;
    }
};
// Export all API methods as named exports
export const { getCertificate, addCertificate, updateCertificate, getCertificatesByDomain, changeCertificateStatus, deleteCertificate } = certificateApi;
