export class CreateResponse<T> {
  success : boolean
  data : T
}
export class UpdateResponse<T> {
  success : boolean
  data : T
}
export class GetOneResponse<T> {
  success : boolean
  data : T
}
export class GetAllResponse<T> {
  success : boolean
  data : T[]
}

export class GetAllWithPagination<T> {
  success : boolean
  data : T[];
  currentPage?: number;  
  numberOfPages?: number;  
  numberOfRecords?: number;  
}
export class DeleteResponse {
  success : boolean
}