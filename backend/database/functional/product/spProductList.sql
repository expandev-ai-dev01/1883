/**
 * @summary
 * Lists products from catalog with pagination, sorting, and filtering capabilities.
 * Supports multiple sort criteria and layout options for catalog display.
 *
 * @procedure spProductList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/internal/product
 *
 * @parameters
 * @param {INT} page
 *   - Required: No
 *   - Description: Page number for pagination (default: 1)
 *
 * @param {INT} pageSize
 *   - Required: No
 *   - Description: Number of products per page (default: 12, options: 12, 24, 36)
 *
 * @param {NVARCHAR} sortBy
 *   - Required: No
 *   - Description: Sort criteria (default: 'date_desc', options: 'name_asc', 'name_desc', 'price_asc', 'price_desc', 'date_desc')
 *
 * @param {NVARCHAR} category
 *   - Required: No
 *   - Description: Filter by category name
 *
 * @returns {ProductList} List of products with pagination metadata
 *
 * @testScenarios
 * - List all products with default pagination
 * - List products with custom page size
 * - Sort products by name ascending/descending
 * - Sort products by price ascending/descending
 * - Sort products by date (most recent first)
 * - Filter products by category
 * - Handle empty result set
 * - Validate page number boundaries
 * - Validate sort criteria
 */
CREATE OR ALTER PROCEDURE [functional].[spProductList]
  @page INT = 1,
  @pageSize INT = 12,
  @sortBy NVARCHAR(50) = 'date_desc',
  @category NVARCHAR(100) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @offset INT;
  DECLARE @totalProducts INT;
  DECLARE @totalPages INT;

  /**
   * @validation Validate page number
   * @throw {pageNumberInvalid}
   */
  IF (@page < 1)
  BEGIN
    ;THROW 51000, 'pageNumberInvalid', 1;
  END;

  /**
   * @validation Validate page size
   * @throw {pageSizeInvalid}
   */
  IF (@pageSize NOT IN (12, 24, 36))
  BEGIN
    ;THROW 51000, 'pageSizeInvalid', 1;
  END;

  /**
   * @validation Validate sort criteria
   * @throw {sortCriteriaInvalid}
   */
  IF (@sortBy NOT IN ('name_asc', 'name_desc', 'price_asc', 'price_desc', 'date_desc'))
  BEGIN
    ;THROW 51000, 'sortCriteriaInvalid', 1;
  END;

  /**
   * @rule {be-pagination-calculation}
   * Calculate pagination offset
   */
  SET @offset = (@page - 1) * @pageSize;

  /**
   * @rule {fn-product-count}
   * Calculate total products for pagination metadata
   */
  SELECT @totalProducts = COUNT(*)
  FROM [functional].[product] [prd]
  WHERE [prd].[deleted] = 0
    AND (@category IS NULL OR [prd].[category] = @category);

  SET @totalPages = CEILING(CAST(@totalProducts AS FLOAT) / @pageSize);

  /**
   * @validation Validate page number against total pages
   * @throw {pageNumberExceedsTotal}
   */
  IF (@page > @totalPages AND @totalPages > 0)
  BEGIN
    ;THROW 51000, 'pageNumberExceedsTotal', 1;
  END;

  /**
   * @output {ProductList, n, n}
   * @column {INT} idProduct - Product identifier
   * @column {NVARCHAR} name - Product name
   * @column {NVARCHAR} description - Product description
   * @column {NVARCHAR} category - Product category
   * @column {NUMERIC} price - Current price (null if price on request)
   * @column {NUMERIC} originalPrice - Original price before discount (null if no discount)
   * @column {INT} discountPercentage - Calculated discount percentage
   * @column {NVARCHAR} imageUrl - Product image URL
   * @column {INT} status - Product status (0=Disponível, 1=Sob Consulta, 2=Esgotado)
   * @column {BIT} featured - Featured product flag
   * @column {BIT} isNew - New product flag (less than 30 days old)
   * @column {DATETIME2} dateCreated - Product creation date
   */
  SELECT
    [prd].[idProduct],
    [prd].[name],
    [prd].[description],
    [prd].[category],
    [prd].[price],
    [prd].[originalPrice],
    CASE
      WHEN [prd].[originalPrice] IS NOT NULL AND [prd].[price] IS NOT NULL
      THEN CAST((1 - ([prd].[price] / [prd].[originalPrice])) * 100 AS INT)
      ELSE 0
    END AS [discountPercentage],
    ISNULL([prd].[imageUrl], '/images/no-image.jpg') AS [imageUrl],
    [prd].[status],
    [prd].[featured],
    CASE
      WHEN DATEDIFF(DAY, [prd].[dateCreated], GETUTCDATE()) <= 30 THEN 1
      ELSE 0
    END AS [isNew],
    [prd].[dateCreated]
  FROM [functional].[product] [prd]
  WHERE [prd].[deleted] = 0
    AND (@category IS NULL OR [prd].[category] = @category)
  ORDER BY
    CASE WHEN @sortBy = 'name_asc' THEN [prd].[name] END ASC,
    CASE WHEN @sortBy = 'name_desc' THEN [prd].[name] END DESC,
    CASE WHEN @sortBy = 'price_asc' THEN [prd].[price] END ASC,
    CASE WHEN @sortBy = 'price_desc' THEN [prd].[price] END DESC,
    CASE WHEN @sortBy = 'date_desc' THEN [prd].[featured] END DESC,
    CASE WHEN @sortBy = 'date_desc' THEN [prd].[dateCreated] END DESC
  OFFSET @offset ROWS
  FETCH NEXT @pageSize ROWS ONLY;

  /**
   * @output {PaginationMetadata, 1, n}
   * @column {INT} totalProducts - Total number of products
   * @column {INT} totalPages - Total number of pages
   * @column {INT} currentPage - Current page number
   * @column {INT} pageSize - Products per page
   * @column {BIT} hasNextPage - Has next page flag
   * @column {BIT} hasPreviousPage - Has previous page flag
   */
  SELECT
    @totalProducts AS [totalProducts],
    @totalPages AS [totalPages],
    @page AS [currentPage],
    @pageSize AS [pageSize],
    CASE WHEN @page < @totalPages THEN 1 ELSE 0 END AS [hasNextPage],
    CASE WHEN @page > 1 THEN 1 ELSE 0 END AS [hasPreviousPage];
END;
GO