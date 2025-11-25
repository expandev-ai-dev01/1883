import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/core/components/empty';
import { PackageOpen } from 'lucide-react';
import { Button } from '@/core/components/button';

function CatalogEmpty() {
  return (
    <Empty className="min-h-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpen />
        </EmptyMedia>
        <EmptyTitle>Nenhum produto encontrado</EmptyTitle>
        <EmptyDescription>
          Não encontramos produtos para os critérios selecionados.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Recarregar página
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export { CatalogEmpty };
