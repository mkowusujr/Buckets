'use client';

import { useQuery } from '@tanstack/react-query';
import { dropQueryKeys, filterQueryKeys } from './query-keys';
import { DropFilters } from './types';

export const useDrops = () => {
  const defaults = {
    buckets: [],
    accounts: []
  };

  const { data: filters } = useQuery({
    queryKey: filterQueryKeys.all.queryKey,
    queryFn: () => defaults as DropFilters,
    initialData: defaults as DropFilters
  });

  return useQuery({ ...dropQueryKeys.drops(filters), enabled: !!filters });
};
