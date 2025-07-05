import { useQuery } from '@tanstack/react-query';
import { accountsQueryKeys } from './query-keys';

export const useAccounts = () => {
  return useQuery({
    ...accountsQueryKeys.all,
    initialData: []
  });
};
