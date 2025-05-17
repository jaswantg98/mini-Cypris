// core-api.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreApiService {
  private baseUrl = environment.coreApiBaseUrl;
  private apiKey = environment.coreApiKey;

  constructor(private http: HttpClient) {}

  searchOutputsByKeywords(keywords: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`
    });

    const params = new HttpParams()
      .set('q', `fullText:"${keywords}"`)

    return this.http.get(this.baseUrl, { headers, params }).pipe(
      catchError((error) => {
        console.error(`API error: ${error.status} - ${error.message}`);
        return throwError(() => new Error('Failed to fetch data from CORE API'));
      })
    );
  }
}
