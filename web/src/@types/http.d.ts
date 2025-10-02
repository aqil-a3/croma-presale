export interface BasicResponse {
  message: string;
  ok: boolean;
}

export interface ResponseWithData<T> {
  message: string;
  ok: boolean;
  data: T;
}
