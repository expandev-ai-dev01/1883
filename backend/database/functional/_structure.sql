/**
 * @schema functional
 * Business logic schema for Lozorio Móveis catalog system
 */
CREATE SCHEMA [functional];
GO

/**
 * @table {product} Product catalog with detailed information
 * @multitenancy false
 * @softDelete true
 * @alias prd
 */
CREATE TABLE [functional].[product] (
  [idProduct] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [description] NVARCHAR(500) NOT NULL DEFAULT (''),
  [category] NVARCHAR(100) NOT NULL,
  [price] NUMERIC(18, 6) NULL,
  [originalPrice] NUMERIC(18, 6) NULL,
  [imageUrl] NVARCHAR(500) NULL,
  [status] INTEGER NOT NULL DEFAULT (0),
  [featured] BIT NOT NULL DEFAULT (0),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);
GO

/**
 * @primaryKey {pkProduct}
 * @keyType Object
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [pkProduct] PRIMARY KEY CLUSTERED ([idProduct]);
GO

/**
 * @check {chkProduct_Status} Product status validation
 * @enum {0} Disponível - Product available for viewing
 * @enum {1} Sob Consulta - Price on request
 * @enum {2} Esgotado - Out of stock
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [chkProduct_Status] CHECK ([status] BETWEEN 0 AND 2);
GO

/**
 * @index {ixProduct_Category} Category filtering optimization
 * @type Search
 * @filter Active products only
 */
CREATE NONCLUSTERED INDEX [ixProduct_Category]
ON [functional].[product]([category])
INCLUDE ([name], [price], [imageUrl], [featured])
WHERE [deleted] = 0;
GO

/**
 * @index {ixProduct_Featured} Featured products optimization
 * @type Performance
 * @filter Active featured products
 */
CREATE NONCLUSTERED INDEX [ixProduct_Featured]
ON [functional].[product]([featured], [dateCreated] DESC)
INCLUDE ([name], [category], [price], [imageUrl])
WHERE [deleted] = 0 AND [featured] = 1;
GO

/**
 * @index {ixProduct_DateCreated} Recent products optimization
 * @type Performance
 * @filter Active products only
 */
CREATE NONCLUSTERED INDEX [ixProduct_DateCreated]
ON [functional].[product]([dateCreated] DESC)
INCLUDE ([name], [category], [price], [imageUrl], [featured])
WHERE [deleted] = 0;
GO

/**
 * @index {ixProduct_Name} Name search optimization
 * @type Search
 * @filter Active products only
 */
CREATE NONCLUSTERED INDEX [ixProduct_Name]
ON [functional].[product]([name])
INCLUDE ([category], [price], [imageUrl], [featured])
WHERE [deleted] = 0;
GO

/**
 * @index {ixProduct_Price} Price sorting optimization
 * @type Performance
 * @filter Active products with price
 */
CREATE NONCLUSTERED INDEX [ixProduct_Price]
ON [functional].[product]([price])
INCLUDE ([name], [category], [imageUrl], [featured])
WHERE [deleted] = 0 AND [price] IS NOT NULL;
GO