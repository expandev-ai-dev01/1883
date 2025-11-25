/**
 * @summary
 * Type definitions for product catalog service.
 * Defines interfaces for product entities, requests, and responses.
 *
 * @module services/product/productTypes
 */

/**
 * @interface ProductEntity
 * @description Represents a product in the catalog
 *
 * @property {number} idProduct - Product identifier
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {string} category - Product category
 * @property {number | null} price - Current price
 * @property {number | null} originalPrice - Original price before discount
 * @property {number} discountPercentage - Calculated discount percentage
 * @property {string} imageUrl - Product image URL
 * @property {ProductStatus} status - Product status
 * @property {boolean} featured - Featured product flag
 * @property {boolean} isNew - New product flag
 * @property {Date} dateCreated - Product creation date
 */
export interface ProductEntity {
  idProduct: number;
  name: string;
  description: string;
  category: string;
  price: number | null;
  originalPrice: number | null;
  discountPercentage: number;
  imageUrl: string;
  status: ProductStatus;
  featured: boolean;
  isNew: boolean;
  dateCreated: Date;
}

/**
 * @enum ProductStatus
 * @description Product availability status
 */
export enum ProductStatus {
  Available = 0,
  OnRequest = 1,
  OutOfStock = 2,
}

/**
 * @interface ProductListRequest
 * @description Request parameters for product listing
 *
 * @property {number} page - Page number
 * @property {number} pageSize - Products per page
 * @property {string} sortBy - Sort criteria
 * @property {string | null} category - Category filter
 */
export interface ProductListRequest {
  page: number;
  pageSize: number;
  sortBy: string;
  category: string | null;
}

/**
 * @interface PaginationMetadata
 * @description Pagination metadata for product listing
 *
 * @property {number} totalProducts - Total number of products
 * @property {number} totalPages - Total number of pages
 * @property {number} currentPage - Current page number
 * @property {number} pageSize - Products per page
 * @property {boolean} hasNextPage - Has next page flag
 * @property {boolean} hasPreviousPage - Has previous page flag
 */
export interface PaginationMetadata {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * @interface ProductListResponse
 * @description Response structure for product listing
 *
 * @property {ProductEntity[]} products - List of products
 * @property {PaginationMetadata} pagination - Pagination metadata
 */
export interface ProductListResponse {
  products: ProductEntity[];
  pagination: PaginationMetadata;
}
