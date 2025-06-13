import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_BASE_URL = 'http://localhost:8000/api/';

  constructor() {}

  /** Stores authentication credentials in localStorage */
  setAuthCredentials(token: string, userId: string, email: string): void {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('auth-user-id', userId);
    localStorage.setItem('auth-email', email);
  }

  /** Removes authentication credentials from localStorage */
  removeAuthCredentials(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user-id');
    localStorage.removeItem('auth-email');
  }

  /** Returns the authentication token from localStorage */
  getAuthToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  /** Returns the user ID from localStorage */
  getAuthUserId(): string | null {
    return localStorage.getItem('auth-user-id');
  }

  /** Returns the user email from localStorage */
  getAuthUser(): string | null {
    return localStorage.getItem('auth-email');
  }

  /** Converts a JSON object to FormData */
  jsonToFormData(json: any): FormData {
    const formData = new FormData();

    const appendFormData = (data: any, parentKey?: string): void => {
      if (
        data &&
        typeof data === 'object' &&
        !(data instanceof Date) &&
        !(data instanceof File)
      ) {
        Object.keys(data).forEach((key) => {
          appendFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        formData.append(parentKey!, data);
      }
    };

    appendFormData(json);
    return formData;
  }

  /** Creates headers for HTTP requests with optional auth token */
  createHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    const token = this.getAuthToken();
    if (token) headers['Authorization'] = `Token ${token}`;
    return headers;
  }

  /** Returns a human-readable error message based on the error */
  getErrorMessage(error: any): string {
    if (error instanceof TypeError) {
      return 'There was an issue with the request or network connection.';
    } else if (error instanceof SyntaxError) {
      return 'Response was not valid JSON.';
    } else if (error.message?.includes('Failed to fetch')) {
      return 'Failed to connect to the server.';
    }
    return 'Network error';
  }

  /** Sends a GET request to a given endpoint */
  async getData(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.createHeaders(),
      });
      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      return {
        ok: false,
        status: 'error',
        message: this.getErrorMessage(error),
      };
    }
  }

  /** Sends a POST request with FormData to a given endpoint */
  async postData(endpoint: string, data: FormData): Promise<any> {
    try {
      const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.createHeaders(),
        body: data,
      });
      const responseData = await response.json();
      return { ok: response.ok, status: response.status, data: responseData };
    } catch (error) {
      return {
        ok: false,
        status: 'error',
        message: this.getErrorMessage(error),
      };
    }
  }

  /** Sends a POST request with JSON data to a given endpoint */
  async postDataWJSON(endpoint: string, data: any): Promise<any> {
    const headers = {
      ...this.createHeaders(),
      'Content-Type': 'application/json',
    };
    try {
      const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return { ok: response.ok, status: response.status, data: responseData };
    } catch (error) {
      return {
        ok: false,
        status: 'error',
        message: this.getErrorMessage(error),
      };
    }
  }

  /** Sends a PATCH request with JSON data */
  async patchDataWoFiles(endpoint: string, data: any): Promise<any> {
    const headers = {
      ...this.createHeaders(),
      'Content-Type': 'application/json',
    };
    try {
      const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return { ok: response.ok, status: response.status, data: responseData };
    } catch (error) {
      return {
        ok: false,
        status: 'error',
        message: this.getErrorMessage(error),
      };
    }
  }

  /** Sends a PATCH request with FormData */
  async patchData(endpoint: string, formData: FormData): Promise<any> {
    try {
      const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: this.createHeaders(),
        body: formData,
      });
      const responseData = await response.json();
      return { ok: response.ok, status: response.status, data: responseData };
    } catch (error) {
      return {
        ok: false,
        status: 'error',
        message: this.getErrorMessage(error),
      };
    }
  }

  /** Sends a DELETE request to a given endpoint */
  async deleteData(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.createHeaders(),
      });
      return { ok: response.ok, status: response.status, data: {} };
    } catch (error) {
      return {
        ok: false,
        status: 'error',
        message: this.getErrorMessage(error),
      };
    }
  }
}
