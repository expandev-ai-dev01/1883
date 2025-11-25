import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { Button } from '@/core/components/button';
import { Grid2x2, Grid3x3, LayoutGrid } from 'lucide-react';
import type { CatalogControlsProps } from './types';
import type { ViewLayout } from '../../types';

function CatalogControls({
  sortBy,
  onSortChange,
  pageSize,
  onPageSizeChange,
  viewLayout,
  onViewLayoutChange,
}: CatalogControlsProps) {
  const sortOptions = [
    { value: 'date_desc', label: 'Mais recentes' },
    { value: 'name_asc', label: 'Nome (A-Z)' },
    { value: 'name_desc', label: 'Nome (Z-A)' },
    { value: 'price_asc', label: 'Preço (menor-maior)' },
    { value: 'price_desc', label: 'Preço (maior-menor)' },
  ];

  const pageSizeOptions = [
    { value: 12, label: '12 por página' },
    { value: 24, label: '24 por página' },
    { value: 36, label: '36 por página' },
  ];

  const viewLayouts: { value: ViewLayout; icon: React.ReactNode; label: string }[] = [
    { value: 'grid_small', icon: <Grid3x3 />, label: 'Grid pequeno' },
    { value: 'grid_medium', icon: <Grid2x2 />, label: 'Grid médio' },
    { value: 'grid_large', icon: <LayoutGrid />, label: 'Grid grande' },
  ];

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm font-medium">Ordenar:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm font-medium">Exibir:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium">Visualização:</span>
        <div className="flex gap-1">
          {viewLayouts.map((layout) => (
            <Button
              key={layout.value}
              variant={viewLayout === layout.value ? 'default' : 'outline'}
              size="icon-sm"
              onClick={() => onViewLayoutChange(layout.value)}
              title={layout.label}
            >
              {layout.icon}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { CatalogControls };
