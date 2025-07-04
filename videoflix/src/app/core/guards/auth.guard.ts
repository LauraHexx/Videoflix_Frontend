import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

/**
 * Guard for protected routes. Allows access only if user is authenticated.
 * Redirects unauthenticated users to /login.
 */
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getAuthToken();

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

/**
 * Guard for auth routes. Prevents access if user is authenticated.
 * Redirects authenticated users to /media-home.
 */
export const noAuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getAuthToken();

  if (token) {
    router.navigate(['/media-home']);
    return false;
  } else {
    return true;
  }
};
