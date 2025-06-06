import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  /**
 * Stores authentication credentials in localStorage.
 */
export function setAuthCredentials(token, userId, username) {
  localStorage.setItem('auth-token', token);
  localStorage.setItem('auth-user', username);
  localStorage.setItem('auth-user-id', userId);
}

/**
 * Removes authentication credentials from localStorage.
 */
export function removeAuthCredentials() {
  localStorage.removeItem('auth-token');
  localStorage.removeItem('auth-user');
  localStorage.removeItem('auth-user-id');
}

/**
 * Returns the authentication token from localStorage.
 */
export function getAuthToken() {
  return localStorage.getItem('auth-token');
}

/**
 * Returns the username from localStorage.
 */
export function getAuthUser() {
  return localStorage.getItem('auth-user');
}

/**
 * Returns the user ID from localStorage.
 */
export function getAuthUserId() {
  return localStorage.getItem('auth-user-id');
}

/**
 * Converts a JSON object to FormData.
 */
export function jsonToFormData(json) {
  const formData = new FormData();

  const appendFormData = (data, parentKey) => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        appendFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      formData.append(parentKey, data);
    }
  };

  appendFormData(json, '');
  return formData;
}

/**
 * Creates headers for HTTP requests with optional auth token.
 */
export function createHeaders() {
  const headers = {};
  const token = getAuthToken();
  if (token) headers['Authorization'] = `Token ${token}`;
  return headers;
}

/**
 * Returns a human-readable error message based on the error type.
 */
export function getErrorMessage(error) {
  if (error instanceof TypeError) {
    return 'There was an issue with the request or network connection.';
  } else if (error instanceof SyntaxError) {
    return 'Response was not valid JSON.';
  } else if (error.message.includes('Failed to fetch')) {
    return 'Failed to connect to the server.';
  }
  return 'Network error';
}

/**
 * Sends a GET request to a given endpoint.
 */
export async function getData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: createHeaders(),
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    return { ok: false, status: 'error', message: getErrorMessage(error) };
  }
}

/**
 * Sends a POST request with FormData to a given endpoint.
 */
export async function postData(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: createHeaders(),
      body: data
    });
    const responseData = await response.json();
    return { ok: response.ok, status: response.status, data: responseData };
  } catch (error) {
    return { ok: false, status: 'error', message: getErrorMessage(error) };
  }
}

/**
 * Sends a POST request with JSON data to a given endpoint.
 */
export async function postDataWJSON(endpoint, data) {
  const headers = { ...createHeaders(), 'Content-Type': 'application/json' };
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return { ok: response.ok, status: response.status, data: responseData };
  } catch (error) {
    return { ok: false, status: 'error', message: getErrorMessage(error) };
  }
}

/**
 * Sends a PATCH request with JSON data.
 */
export async function patchDataWoFiles(endpoint, data) {
  const headers = { ...createHeaders(), 'Content-Type': 'application/json' };
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return { ok: response.ok, status: response.status, data: responseData };
  } catch (error) {
    return { ok: false, status: 'error', message: getErrorMessage(error) };
  }
}

/**
 * Sends a PATCH request with FormData.
 */
export async function patchData(endpoint, formData) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: createHeaders(),
      body: formData
    });
    const responseData = await response.json();
    return { ok: response.ok, status: response.status, data: responseData };
  } catch (error) {
    return { ok: false, status: 'error', message: getErrorMessage(error) };
  }
}

/**
 * Sends a DELETE request to a given endpoint.
 */
export async function deleteData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });
    return { ok: response.ok, status: response.status, data: {} };
  } catch (error) {
    return { ok: false, status: 'error', message: getErrorMessage(error) };
  }
}
}
