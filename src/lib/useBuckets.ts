import { useQuery } from '@tanstack/react-query';
import { bucketsQueryKeys } from './query-keys';

export const useBuckets = () => {
  return useQuery({
    ...bucketsQueryKeys.all,
    initialData: []
  });
};
