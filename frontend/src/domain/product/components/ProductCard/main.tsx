import { Badge } from '@/core/components/badge';
import { Card, CardContent } from '@/core/components/card';
import { cn } from '@/core/lib/utils';
import type { ProductCardProps } from './types';

function ProductCard({ product, onClick }: ProductCardProps) {
  const handleClick = () => {
    onClick?.(product);
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return null;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const discountPercentage =
    product.originalPrice && product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

  const statusLabels = {
    available: 'Disponível',
    out_of_stock: 'Esgotado',
    on_request: 'Sob Consulta',
  };

  return (
    <Card
      className={cn(
        'group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg',
        product.status === 'out_of_stock' && 'opacity-60'
      )}
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl || '/assets/images/no-image.jpg'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-2">
          {product.isFeatured && <Badge variant="default">Destaque</Badge>}
          {product.isNew && <Badge variant="secondary">Lançamento</Badge>}
          {discountPercentage && <Badge variant="destructive">-{discountPercentage}%</Badge>}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-base font-semibold leading-tight">{product.name}</h3>
        </div>
        <p className="text-muted-foreground mb-3 text-sm">{product.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            {product.price !== null ? (
              <>
                <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-muted-foreground text-sm line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground text-sm font-medium">
                {statusLabels[product.status]}
              </span>
            )}
          </div>
          {product.status === 'out_of_stock' && <Badge variant="outline">Esgotado</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}

export { ProductCard };
