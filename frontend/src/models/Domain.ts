/**
 * Domain model interface representing the domain entity
 */
export interface Domain {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
}

/**
 * DomainDTO interface for creating/updating domains
 */
export interface DomainDTO {
  name: string;
  description: string;
}

/**
 * DomainVO interface for domain view objects returned from API
 */
export interface DomainVO {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Domain status enum
 */
export enum DomainStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  DELETED = 'DELETED'
}

/**
 * Domain list response type
 */
export type DomainListResponse = DomainVO[];

/**
 * Domain detail response type
 */
export interface DomainDetailResponse {
  data: DomainVO;
}

/**
 * Domain create/update response type
 */
export interface DomainMutationResponse {
  data: DomainVO;
}

/**
 * Domain delete response type
 */
export interface DomainDeleteResponse {
  success: boolean;
}
