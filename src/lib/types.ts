export type FreshDrop = {
  name: string;
  bucket: string;
  date: string;
  account: string;
  price: number;
};

export type DropFilters = {
  buckets: string[];
  accounts: string[];
};
