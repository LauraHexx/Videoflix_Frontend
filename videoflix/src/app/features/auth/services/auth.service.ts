import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../core/services/api-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  setAuthCredentials(token: string, userId: string, username: string): void {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('auth-user-id', userId);
    localStorage.setItem('auth-user', username);
  }

  removeAuthCredentials(): void {
    ['auth-token', 'auth-user-id', 'auth-user'].forEach((k) =>
      localStorage.removeItem(k)
    );
  }

  getAuthToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  getAuthUser(): string | null {
    return localStorage.getItem('auth-user');
  }

  getAuthUserId(): string | null {
    return localStorage.getItem('auth-user-id');
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
}
