import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private handleError(err: any): Observable<never> {
    let msg = 'Network error';
    if (err.error instanceof ErrorEvent) {
      msg = err.error.message;
    } else if (err.status === 0) {
      msg = 'Failed to connect to the server.';
    } else if (err.error && typeof err.error === 'object') {
      msg = JSON.stringify(err.error);
    }
    return throwError(() => new Error(msg));
  }

  get<T>(endpoint: string, params?: Record<string, unknown>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v != null) {
          httpParams = httpParams.set(k, String(v));
        }
      });
    }
    return this.http
      .get<T>(`${this.apiUrl}${endpoint}`, { params: httpParams })
      .pipe(catchError((e) => this.handleError(e)));
  }

  post<T>(endpoint: string, body: any, asJson = true): Observable<T> {
    const options = asJson
      ? { headers: { 'Content-Type': 'application/json' } }
      : {};
    const payload = asJson ? JSON.stringify(body) : body;
    return this.http
      .post<T>(`${this.apiUrl}${endpoint}`, payload, options)
      .pipe(catchError((e) => this.handleError(e)));
  }

  patch<T>(endpoint: string, body: any, asJson = true): Observable<T> {
    const options = asJson
      ? { headers: { 'Content-Type': 'application/json' } }
      : {};
    const payload = asJson ? JSON.stringify(body) : body;
    return this.http
      .patch<T>(`${this.apiUrl}${endpoint}`, payload, options)
      .pipe(catchError((e) => this.handleError(e)));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}${endpoint}`)
      .pipe(catchError((e) => this.handleError(e)));
  }

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
