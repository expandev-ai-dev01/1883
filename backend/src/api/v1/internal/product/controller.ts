/**
 * @summary
 * Product catalog API controller.
 * Handles HTTP requests for product listing operations.
 *
 * @module api/v1/internal/product/controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { productList } from '@/services/product';

/**
 * @api {get} /api/v1/internal/product List Products
 * @apiName ListProducts
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists products from catalog with pagination, sorting, and filtering
 *
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=12] Products per page (12, 24, or 36)
 * @apiParam {String} [sortBy=date_desc] Sort criteria (name_asc, name_desc, price_asc, price_desc, date_desc)
 * @apiParam {String} [category] Filter by category
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Array} data.products List of products
 * @apiSuccess {Object} data.pagination Pagination metadata
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  /**
   * @validation Query parameter schema
   */
  const querySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    pageSize: z.coerce.number().int().optional().default(12),
    sortBy: z.string().optional().default('date_desc'),
    category: z.string().optional().nullable(),
  });

  try {
    /**
     * @rule {be-parameter-validation}
     * Validate and parse query parameters
     */
    const validated = querySchema.parse(req.query);

    /**
     * @rule {be-business-logic-execution}
     * Execute product listing logic
     */
    const data = await productList({
      page: validated.page,
      pageSize: validated.pageSize,
      sortBy: validated.sortBy,
      category: validated.category || null,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    /**
     * @rule {be-error-handling}
     * Handle validation and business logic errors
     */
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json(errorResponse('Invalid query parameters', 'VALIDATION_ERROR', error.errors));
    } else if (error.message === 'pageNumberInvalid') {
      res
        .status(400)
        .json(errorResponse('Page number must be greater than 0', 'INVALID_PAGE_NUMBER'));
    } else if (error.message === 'pageSizeInvalid') {
      res.status(400).json(errorResponse('Page size must be 12, 24, or 36', 'INVALID_PAGE_SIZE'));
    } else if (error.message === 'sortCriteriaInvalid') {
      res.status(400).json(errorResponse('Invalid sort criteria', 'INVALID_SORT_CRITERIA'));
    } else if (error.message === 'pageNumberExceedsTotal') {
      res.status(400).json(errorResponse('Page number exceeds total pages', 'PAGE_EXCEEDS_TOTAL'));
    } else {
      next(error);
    }
  }
}
