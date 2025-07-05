'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { dropQueryKeys, filterQueryKeys } from './query-keys';
import { DropFilters } from './types';

export const useDrops = () => {
  const queryClient = useQueryClient();

  const defaults = {
    buckets: [],
    accounts: []
  };

  const { data: filters } = useQuery({
    queryKey: filterQueryKeys.all.queryKey,
    queryFn: () =>
      (queryClient.getQueryData(filterQueryKeys.all.queryKey) ?? defaults) as DropFilters
  });

  return useQuery({ ...dropQueryKeys.drops(filters!), enabled: !!filters });
};
