export type Pagination = {
  page: number;
  pageSize: number;
};
export type PaginationOutput = {
  skip: number;
  take: number;
};

export const PAGE_SIZE = 10;

export function getPagination({
  page = 1,
  pageSize = PAGE_SIZE,
}: Pagination): PaginationOutput {
  const skip = (page - 1) * pageSize;
  return {
    skip,
    take: pageSize,
  };
}
