export type FindAll<T> = {
  data: T[];
  currentPage: number;
  numberOfPages: number;
  numberOfRecords: number;
};

export type GetAll = {
  limit?: number;
  page?: number;
  sort?: string;
  order?: string;
  search?: string;
  paginate?: boolean;
  fields?: string;
  populate?: string[] | any[];
};