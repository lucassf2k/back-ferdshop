export type PaginationOptions = {
  take: number;
  skip: number;
};

export type ModelWithPagination<K extends string, E> = {
  [P in K]: E;
} & {
  total: number;
};
