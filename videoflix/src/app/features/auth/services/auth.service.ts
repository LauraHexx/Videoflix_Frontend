import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../core/services/api-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  setAuthCredentials(token: string, userId: string, username: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('auth-token', token);
      localStorage.setItem('auth-user-id', userId);
      localStorage.setItem('auth-user', username);
    }
  }

  removeAuthCredentials(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      ['auth-token', 'auth-user-id', 'auth-user'].forEach((k) =>
        localStorage.removeItem(k)
      );
    }
  }

  getAuthToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth-token');
    }
    return null;
  }

  getAuthUser(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth-user');
    }
    return null;
  }

  getAuthUserId(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth-user-id');
    }
    return null;
  }

  //todo: must be changed...

  async postData(endpoint: string, formData: FormData): Promise<any> {
    return firstValueFrom(this.apiService.post(endpoint, formData, false));
  }

  async postDataWJSON(endpoint: string, data: any): Promise<any> {
    return firstValueFrom(this.apiService.post(endpoint, data, true));
  }

  async getData(endpoint: string): Promise<any> {
    return firstValueFrom(this.apiService.get(endpoint));
  }

  async patchData(endpoint: string, formData: FormData): Promise<any> {
    return firstValueFrom(this.apiService.patch(endpoint, formData, false));
  }

  async patchDataWoFiles(endpoint: string, data: any): Promise<any> {
    return firstValueFrom(this.apiService.patch(endpoint, data, true));
  }

  async deleteData(endpoint: string): Promise<any> {
    return firstValueFrom(this.apiService.delete(endpoint));
  }

  // isAuthenticated(): boolean {
  //   const token = this.getAuthToken();
  //   return !!token;
  // }

  // // Optional: Token-Validierung gegen Backend
  // async validateToken(): Promise<boolean> {
  //   try {
  //     const response = await this.getData('validate-token/');
  //     return response && response.ok;
  //   } catch (error) {
  //     console.error('Token validation failed:', error);
  //     this.removeAuthCredentials();
  //     return false;
  //   }
  // }
}
