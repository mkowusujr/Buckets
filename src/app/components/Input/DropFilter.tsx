'use client';

import { filterQueryKeys } from '@/lib/query-keys';
import { XCircleIcon } from '@heroicons/react/16/solid';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import Tag from './Tag';
import { useBuckets } from '@/lib/useBuckets';

export default function DropFilter() {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue] = useDebounceValue(inputValue, 1000);
  const [buckets, setBuckets] = useState<string[]>([]);
  const { data: validBuckets } = useBuckets();

  useEffect(() => {
    const splits = debouncedValue.trim().split(/\s+/); // handles multiple spaces
    const newBuckets: string[] = [];

    const cleanedTokens = splits.filter(token => {
      if (token.startsWith('#')) {
        const tag = token.slice(1).toLowerCase();
        if (validBuckets.includes(tag)) {
          newBuckets.push(tag);
          return false;
        }
        return true; // exclude from cleaned input
      }

      // Placeholder logic for future filter parsing
      if (token.startsWith('+#')) {
        // TODO: handle creating a bucket
        return true;
      } else if (token.startsWith('@<')) {
        // TODO: handle filtering dates
        return true;
      } else if (token.startsWith('@')) {
        // TODO: handle parsing date
        return true;
      } else if (token.startsWith('$<')) {
        // TODO: handle cost filtering
        return true;
      }

      return true;
    });

    setBuckets(prev => Array.from(new Set([...prev, ...newBuckets])));
    setInputValue(cleanedTokens.join(' '));
  }, [debouncedValue]);

  useEffect(() => {
    queryClient.setQueryData(filterQueryKeys.all.queryKey, {
      buckets,
      accounts: []
    });
  }, [buckets]);

  return (
    <div className="rounded-sm flex gap-2 bg-white text-black w-92 p-2">
      {buckets.map((b, i) => (
        <Tag key={i} tag={b} setState={setBuckets} />
      ))}
      <input
        className="flex-1 rounded-sm bg-white text-black px-2"
        placeholder="Filter"
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
    </div>
  );
}
