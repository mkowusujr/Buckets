"use client"

import { useDrops } from '@/lib/useDrops';
import React from 'react';

type Props = {};

export default function TotalStats({}: Props) {
  const { data } = useDrops();

  const totalExpenses = data
    ?.filter(d => d.price < 0)
    .reduce((v, c) => Math.abs(c.price) + v, 0);

  const totalIncome = data
    ?.filter(d => d.price > 0)
    .reduce((v, c) => Math.abs(c.price) + v, 0);

		const totalRemaining = data?.reduce((v, c) => c.price + v, 0);

  return (
    <div className='flex flex-col'>
      <div>{`Total Expenses -$${totalExpenses}`}</div>
      <div>{`Total Income $${totalIncome}`}</div>
      <div>{`Total Remaining $${totalRemaining}`}</div>
    </div>
  );
}
