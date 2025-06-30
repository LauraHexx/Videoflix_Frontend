import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

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
