import type { ViewLayout } from '../../types';

export interface CatalogControlsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  viewLayout: ViewLayout;
  onViewLayoutChange: (value: ViewLayout) => void;
}
