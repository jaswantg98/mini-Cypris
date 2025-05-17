import { Result } from './result.model';

export interface CoreApiResponse {
  totalHits: number;
  limit: number;
  offset: number;
  results: Result[];
}
