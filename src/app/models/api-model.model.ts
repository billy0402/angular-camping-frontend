export interface ApiModel<T> {
  result: boolean;
  errorCode: string;
  message: string;
  data: T;
}
