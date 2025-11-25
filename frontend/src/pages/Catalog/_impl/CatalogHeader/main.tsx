import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/core/components/breadcrumb';
import type { CatalogHeaderProps } from './types';

function CatalogHeader({ totalProducts }: CatalogHeaderProps) {
  return (
    <div className="mb-6 space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Catálogo</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-primary text-3xl font-bold tracking-tight">
          Catálogo de Produtos - Lozorio Móveis
        </h1>
        <p className="text-muted-foreground mt-2">
          {totalProducts} {totalProducts === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>
      </div>
    </div>
  );
}

export { CatalogHeader };
