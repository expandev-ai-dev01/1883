import { useState, useEffect } from 'react';
import { useProductList } from '@/domain/product/hooks';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { AlertCircle } from 'lucide-react';
import { CatalogHeader } from './_impl/CatalogHeader';
import { CatalogControls } from './_impl/CatalogControls';
import { CatalogGrid } from './_impl/CatalogGrid';
import { CatalogPagination } from './_impl/CatalogPagination';
import { CatalogEmpty } from './_impl/CatalogEmpty';
import type { CatalogFilters, ViewLayout } from './types';
import type { Product } from '@/domain/product/types';

function CatalogPage() {
  const [filters, setFilters] = useState<CatalogFilters>({
    page: 1,
    pageSize: 12,
    sortBy: 'date_desc',
    category: null,
  });

  const [viewLayout, setViewLayout] = useState<ViewLayout>('grid_medium');

  const { products, pagination, isLoading, error } = useProductList({
    filters,
  });

  useEffect(() => {
    const savedLayout = localStorage.getItem('catalog_view_layout') as ViewLayout | null;
    if (savedLayout) {
      setViewLayout(savedLayout);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters.page]);

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value as CatalogFilters['sortBy'], page: 1 }));
  };

  const handlePageSizeChange = (value: number) => {
    setFilters((prev) => ({ ...prev, pageSize: value, page: 1 }));
  };

  const handleViewLayoutChange = (value: ViewLayout) => {
    setViewLayout(value);
    localStorage.setItem('catalog_view_layout', value);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product);
  };

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <CatalogHeader totalProducts={0} />
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Erro ao carregar produtos</AlertTitle>
          <AlertDescription>
            Ocorreu um erro ao carregar os produtos. Por favor, tente novamente mais tarde.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <CatalogHeader totalProducts={pagination?.totalItems ?? 0} />

      <CatalogControls
        sortBy={filters.sortBy}
        onSortChange={handleSortChange}
        pageSize={filters.pageSize}
        onPageSizeChange={handlePageSizeChange}
        viewLayout={viewLayout}
        onViewLayoutChange={handleViewLayoutChange}
      />

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      ) : products?.length === 0 ? (
        <CatalogEmpty />
      ) : (
        <>
          <CatalogGrid
            products={products ?? []}
            viewLayout={viewLayout}
            onProductClick={handleProductClick}
          />

          {pagination && (
            <CatalogPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export { CatalogPage };
