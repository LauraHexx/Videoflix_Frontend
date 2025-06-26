import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api-service/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  notificationVisible = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.createForm();
  }

  /**
   * Creates the forgot password form with email field and validation.
   * @returns A FormGroup instance with required + email validators.
   */
  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Handles the forgot password form submission.
   * Sends request to backend and shows notification regardless of result.
   */
  async onSubmit(): Promise<void> {
    if (this.forgotPasswordForm.invalid) return;

    const email = this.forgotPasswordForm.value.email;
    const formData = new FormData();
    formData.append('email', email);

    try {
      await this.authService.postData('password-reset/request/', formData);
    } catch (error) {
      console.error('Password reset request failed:', error);
    }

    this.showNotification();
  }

  /**
   * Shows notification
   */
  private showNotification(): void {
    this.notificationVisible = true;
  }

  /**
   * Hides the notification container manually.
   */
  hideNotification(): void {
    this.notificationVisible = false;
  }
}
