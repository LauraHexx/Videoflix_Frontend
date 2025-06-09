import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
   * Typically triggers a backend request to send a reset link.
   */
  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;

    const email = this.forgotPasswordForm.value.email;
    console.log('Send password reset to:', email);
    // TODO: Call your backend service to send reset linkk
  }
}
