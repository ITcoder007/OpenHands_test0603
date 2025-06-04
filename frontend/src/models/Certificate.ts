/**
 * Certificate data transfer object (DTO) for creating/updating certificates
 */
export interface CertificateDTO {
  name: string;
  domainId: string;
  startDate: Date;
  endDate: Date;
  contentMd5: string;
}

/**
 * Certificate view object (VO) for displaying certificate details
 */
export interface CertificateVO {
  id: string;
  name: string;
  domainId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  contentMd5: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Certificate status change request payload
 */
export interface CertificateStatusChangeRequest {
  status: string;
}

/**
 * Certificate list filter parameters
 */
export interface CertificateFilterParams {
  domainId?: string;
  status?: string;
  startDateFrom?: Date;
  startDateTo?: Date;
  endDateFrom?: Date;
  endDateTo?: Date;
}

/**
 * Certificate status enum
 */
export enum CertificateStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  PENDING = 'PENDING'
}

/**
 * Certificate metadata for display purposes
 */
export interface CertificateMetadata {
  daysRemaining: number;
  isExpired: boolean;
  isAboutToExpire: boolean;
}
