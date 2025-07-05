'use client';

import Drop from './Drop';
import { useDrops } from '@/lib/useDrops';

export default function Drops() {
  const { data } = useDrops();
  return (
    <div className="flex flex-col flex-wrap gap-4 p-2">
      {data?.map((d, i) => (
        <Drop key={i} drop={d} />
      ))}
    </div>
  );
}
