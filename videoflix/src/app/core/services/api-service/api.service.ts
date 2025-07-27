import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Handles HTTP errors and returns a user-friendly message.
   * @param err - The error object received from the HTTP call.
   * @returns An observable that emits an error.
   */
  private handleError(err: any): Observable<never> {
    let msg = 'Network error';

    if (typeof window !== 'undefined' && err.error instanceof ErrorEvent) {
      msg = err.error.message;
    } else if (err.status === 0) {
      msg = 'Failed to connect to the server.';
    } else if (err.error && typeof err.error === 'object') {
      msg = JSON.stringify(err.error);
    }
    return throwError(() => new Error(msg));
  }

  /**
   * Sends a GET request to the specified API endpoint with optional parameters.
   * @param endpoint - The API endpoint path.
   * @param params - Optional query parameters.
   * @returns An observable of the HTTP response.
   */
  get<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Observable<HttpResponse<T>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v != null) {
          httpParams = httpParams.set(k, String(v));
        }
      });
    }
    return this.http
      .get<T>(`${this.apiUrl}${endpoint}`, {
        params: httpParams,
        observe: 'response' as const,
      })
      .pipe(catchError((e) => this.handleError(e)));
  }

  /**
   * Sends a POST request with a given payload to the specified API endpoint.
   * @param endpoint - The API endpoint path.
   * @param body - The request payload.
   * @param asJson - Flag to determine JSON or form submission.
   * @returns An observable of the HTTP response.
   */
  post<T>(
    endpoint: string,
    body: any,
    asJson = true
  ): Observable<HttpResponse<T>> {
    const options = asJson
      ? {
          headers: { 'Content-Type': 'application/json' },
          observe: 'response' as const,
        }
      : { observe: 'response' as const };
    const payload = asJson ? JSON.stringify(body) : body;
    return this.http
      .post<T>(`${this.apiUrl}${endpoint}`, payload, options)
      .pipe(catchError((e) => this.handleError(e)));
  }

  /**
   * Sends a PATCH request with a given payload to the specified API endpoint.
   * @param endpoint - The API endpoint path.
   * @param body - The partial update payload.
   * @param asJson - Flag to determine JSON or form submission.
   * @returns An observable of the HTTP response.
   */
  patch<T>(
    endpoint: string,
    body: any,
    asJson = true
  ): Observable<HttpResponse<T>> {
    const options = asJson
      ? {
          headers: { 'Content-Type': 'application/json' },
          observe: 'response' as const,
        }
      : { observe: 'response' as const };
    const payload = asJson ? JSON.stringify(body) : body;
    return this.http
      .patch<T>(`${this.apiUrl}${endpoint}`, payload, options)
      .pipe(catchError((e) => this.handleError(e)));
  }

  /**
   * Sends a DELETE request to the specified API endpoint.
   * @param endpoint - The API endpoint path.
   * @returns An observable of the HTTP response.
   */
  delete<T>(endpoint: string): Observable<HttpResponse<T>> {
    return this.http
      .delete<T>(`${this.apiUrl}${endpoint}`, { observe: 'response' as const })
      .pipe(catchError((e) => this.handleError(e)));
  }

  /**
   * Converts a nested object into FormData, handling nested keys and files.
   * @param obj - The object to convert.
   * @returns A FormData instance representing the object.
   */
  jsonToFormData(obj: any): FormData {
    const form = new FormData();
    const build = (val: any, key?: string) => {
      if (val && typeof val === 'object' && !(val instanceof File)) {
        Object.entries(val).forEach(([k, v]) =>
          build(v, key ? `${key}[${k}]` : k)
        );
      } else if (key) {
        form.append(key, val);
      }
    };
    build(obj);
    return form;
  }
}
