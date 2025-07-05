import React from 'react';

type Props = { drop: any };

export default function Drop({ drop }: Props) {
  return (
    <div className="flex gap-4 w-[500px] rounded-sm bg-white p-2">
      <div className="capitalize text-black">{drop.name}</div>
      <div className="capitalize text-green-800">${drop.price}</div>
      <div className="capitalize text-yellow-700">{drop.bucket.name}</div>
      <div className="capitalize text-black">{new Date(drop.date).toDateString()}</div>
      <div className="capitalize text-blue-800">{drop.account.name}</div>
    </div>
  );
}
