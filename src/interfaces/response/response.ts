/**
 * according to JSend JSON specification
 * see https://labs.omniti.com/labs/jsend
 */
export interface Response<T> {
  status: 'success' | 'fail' | 'error';
  data?: { [key: string]: T };
  message?: string;
  code?: number;
}
