/**
 * @summary
 * Product catalog business logic service.
 * Handles product listing with pagination, sorting, and filtering.
 *
 * @module services/product/productLogic
 */

import {
  ProductEntity,
  ProductListRequest,
  ProductListResponse,
  PaginationMetadata,
} from './productTypes';

/**
 * @remarks
 * In-memory product storage for demonstration.
 * In production, this would be replaced with database calls.
 */
const products: ProductEntity[] = [
  {
    idProduct: 1,
    name: 'Sofá Retrátil Premium',
    description:
      'Sofá retrátil de 3 lugares com tecido suede, estrutura em madeira maciça e sistema de reclinação',
    category: 'Sala de Estar',
    price: 2890.0,
    originalPrice: null,
    discountPercentage: 0,
    imageUrl: '/images/sofa-retratil-premium.jpg',
    status: 0,
    featured: true,
    isNew: true,
    dateCreated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    idProduct: 2,
    name: 'Mesa de Jantar Elegance',
    description: 'Mesa de jantar para 6 pessoas em madeira nobre com acabamento laqueado',
    category: 'Sala de Jantar',
    price: 1650.0,
    originalPrice: 1950.0,
    discountPercentage: 15,
    imageUrl: '/images/mesa-jantar-elegance.jpg',
    status: 0,
    featured: true,
    isNew: true,
    dateCreated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    idProduct: 3,
    name: 'Guarda-Roupa Casal Moderno',
    description: 'Guarda-roupa de 6 portas com espelho, gavetas e prateleiras internas',
    category: 'Quarto',
    price: 1890.0,
    originalPrice: null,
    discountPercentage: 0,
    imageUrl: '/images/guarda-roupa-moderno.jpg',
    status: 0,
    featured: false,
    isNew: true,
    dateCreated: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    idProduct: 4,
    name: 'Rack para TV Suspenso',
    description: 'Rack suspenso para TV até 65 polegadas com nichos e gavetas',
    category: 'Sala de Estar',
    price: 890.0,
    originalPrice: 1090.0,
    discountPercentage: 18,
    imageUrl: '/images/rack-tv-suspenso.jpg',
    status: 0,
    featured: false,
    isNew: true,
    dateCreated: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    idProduct: 5,
    name: 'Cama Box Queen Size',
    description: 'Cama box queen size com colchão de molas ensacadas e pillow top',
    category: 'Quarto',
    price: 2450.0,
    originalPrice: null,
    discountPercentage: 0,
    imageUrl: '/images/cama-box-queen.jpg',
    status: 0,
    featured: true,
    isNew: true,
    dateCreated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

/**
 * @summary
 * Lists products with pagination, sorting, and filtering
 *
 * @function productList
 * @module services/product/productLogic
 *
 * @param {ProductListRequest} params - List parameters
 *
 * @returns {Promise<ProductListResponse>} Product list with pagination
 *
 * @throws {Error} When page number is invalid
 * @throws {Error} When page size is invalid
 * @throws {Error} When sort criteria is invalid
 */
export async function productList(params: ProductListRequest): Promise<ProductListResponse> {
  const { page, pageSize, sortBy, category } = params;

  /**
   * @validation Validate page number
   */
  if (page < 1) {
    throw new Error('pageNumberInvalid');
  }

  /**
   * @validation Validate page size
   */
  if (![12, 24, 36].includes(pageSize)) {
    throw new Error('pageSizeInvalid');
  }

  /**
   * @validation Validate sort criteria
   */
  const validSortOptions = ['name_asc', 'name_desc', 'price_asc', 'price_desc', 'date_desc'];
  if (!validSortOptions.includes(sortBy)) {
    throw new Error('sortCriteriaInvalid');
  }

  /**
   * @rule {fn-product-filtering}
   * Filter products by category if specified
   */
  let filteredProducts = [...products];
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  /**
   * @rule {fn-product-sorting}
   * Sort products based on criteria
   */
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'price_asc':
        return (a.price || 0) - (b.price || 0);
      case 'price_desc':
        return (b.price || 0) - (a.price || 0);
      case 'date_desc':
      default:
        if (a.featured !== b.featured) {
          return b.featured ? 1 : -1;
        }
        return b.dateCreated.getTime() - a.dateCreated.getTime();
    }
  });

  /**
   * @rule {be-pagination-calculation}
   * Calculate pagination metadata
   */
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  /**
   * @validation Validate page number against total pages
   */
  if (page > totalPages && totalPages > 0) {
    throw new Error('pageNumberExceedsTotal');
  }

  /**
   * @rule {be-pagination-slice}
   * Extract products for current page
   */
  const offset = (page - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(offset, offset + pageSize);

  const pagination: PaginationMetadata = {
    totalProducts,
    totalPages,
    currentPage: page,
    pageSize,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  return {
    products: paginatedProducts,
    pagination,
  };
}
