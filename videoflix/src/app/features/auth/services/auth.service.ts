import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Observable, map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '../../../core/services/api-service/api.service';
import { UserEndpoints } from '../../../core/endpoints/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  /**
   * Stores authentication credentials (token, user ID, username) in localStorage.
   * @param token - Authentication token string
   * @param userId - User identifier string
   * @param username - Username string
   */
  setAuthCredentials(token: string, userId: string, username: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('auth-token', token);
      localStorage.setItem('auth-user-id', userId);
      localStorage.setItem('auth-user', username);
    }
  }

  /**
   * Removes authentication credentials from localStorage.
   */
  removeAuthCredentials(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      ['auth-token', 'auth-user-id', 'auth-user'].forEach((k) =>
        localStorage.removeItem(k)
      );
    }
  }

  /**
   * Retrieves the authentication token from localStorage.
   * @returns The stored auth token string or null if not found
   */
  getAuthToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth-token');
    }
    return null;
  }

  /**
   * Sends a registration request with FormData and returns full HTTP response as Observable.
   * @param formData - Must include 'email', 'username', 'password', etc.
   * @returns Observable of HttpResponse for registration request
   */
  register(formData: FormData): Observable<HttpResponse<any>> {
    return this.apiService
      .post<any>(UserEndpoints.registration, formData, false)
      .pipe(map((response) => response));
  }

  /**
   * Sends login request with FormData and returns full HTTP response as Observable.
   * @param formData - Must include 'email' and 'password'
   * @returns Observable of HttpResponse with full login response
   */
  login(formData: FormData): Observable<HttpResponse<any>> {
    return this.apiService
      .post<any>(UserEndpoints.login, formData, false)
      .pipe(map((response) => response));
  }

  /**
   * Sends a password reset request with FormData containing the user's email.
   * @param formData - Must include 'email'
   * @returns Observable of HttpResponse for password reset request
   */
  forgotPassword(formData: FormData): Observable<HttpResponse<any>> {
    return this.apiService
      .post<any>(UserEndpoints.passwordRest, formData, false)
      .pipe(map((response) => response));
  }

  /**
   * Sends a password reset confirmation request with form data.
   * @param formData - FormData containing reset token and new password details
   * @returns Observable of HttpResponse with the API response
   */
  resetPassword(formData: FormData): Observable<HttpResponse<any>> {
    return this.apiService
      .post<any>(UserEndpoints.passwordConfirm, formData, false)
      .pipe(map((response) => response));
  }
}
