import { XCircleIcon } from '@heroicons/react/16/solid';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  tag: string;
  setState: Dispatch<Dispatch<SetStateAction<string[]>>>;
};

export default function Tag({ tag, setState }: Props) {
  return (
    <div
      key={tag}
      className="bg-yellow-700 capitalize text-white flex items-center gap-2 px-2 rounded-sm"
    >
      {tag}
      <XCircleIcon
        className="size-4 opacity-50 hover:opacity-100"
        onClick={() => {
          setState((prev: string[]) => prev.filter(s => s !== tag));
        }}
      />
    </div>
  );
}
