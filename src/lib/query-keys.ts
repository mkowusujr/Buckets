import { createQueryKeys } from '@lukemorales/query-key-factory';
import { DropFilters } from './types';
import { Drop } from '@prisma/client';

export const dropQueryKeys = createQueryKeys('drops', {
  drops: (filters: DropFilters) => ({
    queryKey: [filters],
    queryFn: () => {
      const accountFilters = filters.accounts.map(a => `account=${a}`);
      const bucketFilters = filters.buckets.map(b => `bucket=${b}`);

      const combinedFilters = [...accountFilters, ...bucketFilters];

      const filtersStr =
        combinedFilters.length > 0 ? `?${combinedFilters.join('&')}` : '';

      return fetch(`/api/drops${filtersStr}`)
        .then(f => f.json())
        .then(d => d.data) as Promise<Drop[]>;
    }
  })
  // filters: {}
  // buckets: {}
});

export const filterQueryKeys = createQueryKeys('filters', {
  all: { queryKey: null }
});

export const bucketsQueryKeys = createQueryKeys('buckets', {
  all: {
    queryKey: null,
    queryFn: () => {
      return fetch(`/api/buckets`)
        .then(f => f.json())
        .then(d => d.data) as Promise<string[]>;
    }
  }
});
