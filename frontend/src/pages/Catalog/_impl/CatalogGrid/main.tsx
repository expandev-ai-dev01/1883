import { ProductCard } from '@/domain/product/components';
import { cn } from '@/core/lib/utils';
import type { CatalogGridProps } from './types';

function CatalogGrid({ products, viewLayout, onProductClick }: CatalogGridProps) {
  const gridClasses = {
    grid_small: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    grid_medium: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    grid_large: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={cn('grid gap-6', gridClasses[viewLayout])}>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} onClick={onProductClick} />
      ))}
    </div>
  );
}

export { CatalogGrid };
