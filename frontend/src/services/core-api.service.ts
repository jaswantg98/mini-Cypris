import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoreApiResponse } from 'src/app/models/core-api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CoreApiService {
  private baseUrl = environment.coreApiBaseUrl;
  private apiKey = environment.coreApiKey;

  constructor(private http: HttpClient) {}

  // core-api.service.ts
  // core-api.service.ts
  aggregateWorks(query: string, aggregations: string[]): Observable<any> {
        const url = `${this.baseUrl}/aggregate`;
        const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
    });
        const body = { q: query, aggregations };
        return this.http.post<any>(url, body, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || 'Aggregation failed')))
    );
  }



  searchOutputsByKeywords(keywords: string, limit?: number): Observable<CoreApiResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`
    });

    let params = new HttpParams()
      // .set('q', `fullText:"${keywords}"`)
      .set('q', keywords);

      if (limit && limit > 0) {
        params = params.set('limit', limit.toString());
      }

      return this.http.get<CoreApiResponse>(this.baseUrl, { headers, params }).pipe(
        catchError((error) => {
          console.error(`API error: ${error.status} - ${error.message}`);
          return throwError(() => new Error('Failed to fetch data from CORE API'));
        })
      );
  }
}
