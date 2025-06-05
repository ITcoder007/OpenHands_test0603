import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
/**
 * Adds a new domain
 * @param data Domain data to create
 * @returns Promise resolving to the created DomainVO
 */
export const addDomain = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/domains`, data);
        return response.data;
    }
    catch (error) {
        console.error('Error adding domain:', error);
        throw error;
    }
};
/**
 * Updates an existing domain
 * @param id ID of the domain to update
 * @param data Updated domain data
 * @returns Promise resolving to the updated DomainVO
 */
export const updateDomain = async (id, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/domains/${id}`, data);
        return response.data;
    }
    catch (error) {
        console.error('Error updating domain:', error);
        throw error;
    }
};
/**
 * Gets all domains
 * @returns Promise resolving to an array of DomainVO
 */
export const getAllDomains = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/domains`);
        return response.data;
    }
    catch (error) {
        console.error('Error getting domains:', error);
        throw error;
    }
};
/**
 * Gets a single domain by ID
 * @param id ID of the domain to retrieve
 * @returns Promise resolving to the DomainVO
 */
export const getDomain = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/domains/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error getting domain:', error);
        throw error;
    }
};
/**
 * Deletes a domain
 * @param id ID of the domain to delete
 * @returns Promise resolving to boolean indicating success
 */
export const deleteDomain = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/domains/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error deleting domain:', error);
        throw error;
    }
};
const domainApi = {
    addDomain,
    updateDomain,
    getAllDomains,
    getDomain,
    deleteDomain
};
export default domainApi;
