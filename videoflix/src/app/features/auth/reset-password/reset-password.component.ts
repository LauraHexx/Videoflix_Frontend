import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api-service/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  showPassword = false;
  showRepeatedPassword = false;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.createForm();
  }

  /**
   * OnInit lifecycle hook to extract token from route.
   */
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      console.error('No token found in URL.');
      this.router.navigate(['/home']);
    }
  }

  /**
   * Builds the reset form with validation.
   */
  private createForm(): FormGroup {
    return this.fb.group(
      {
        password: [
          '',
          [Validators.required, this.minLengthPassword.bind(this)],
        ],
        repeatedPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator.bind(this) }
    );
  }

  /**
   * Custom validator to check if passwords match.
   */
  private passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const passwordControl = group.get('password');
    const repeatedPasswordControl = group.get('repeatedPassword');
    if (!passwordControl || !repeatedPasswordControl) return null;

    return this.validatePasswordMatch(
      passwordControl.value,
      repeatedPasswordControl
    );
  }

  /**
   * Checks if password and repeated password match.
   * Sets or clears the 'passwordMismatch' error on the repeatedPassword control.
   */
  private validatePasswordMatch(
    password: string,
    repeatedPasswordControl: AbstractControl
  ): ValidationErrors | null {
    if (password !== repeatedPasswordControl.value) {
      repeatedPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    this.clearPasswordMismatchError(repeatedPasswordControl);
    return null;
  }

  /**
   * Removes the 'passwordMismatch' error without affecting other errors.
   */
  private clearPasswordMismatchError(control: AbstractControl): void {
    if (!control.errors) return;
    const errors = { ...control.errors };
    delete errors['passwordMismatch'];
    control.setErrors(Object.keys(errors).length ? errors : null);
  }

  /**
   * Validator: Password must have at least 10 characters.
   */
  minLengthPassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.length < 10) {
      return { minLengthPassword: true };
    }
    return null;
  }

  /**
   * Toggles visibility for the password field.
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggles visibility for the repeated password field.
   */
  toggleRepeatedPassword(): void {
    this.showRepeatedPassword = !this.showRepeatedPassword;
  }

  /**
   * Handles the password reset form submission.
   */
  async onSubmit(): Promise<void> {
    if (!this.resetPasswordForm.valid || !this.token) return;

    const formData = this.createFormDataFromForm();
    const response = await this.authService.postData(
      'password-reset/confirm/',
      formData
    );

    if (this.isSuccessful(response)) {
      this.router.navigate(['/login']);
    } else {
      this.handleSubmissionError(response);
    }
  }

  /**
   * Builds FormData object to send to backend.
   */
  private createFormDataFromForm(): FormData {
    const rawData = {
      token: this.token,
      password: this.resetPasswordForm.value.password,
      password_confirmed: this.resetPasswordForm.value.repeatedPassword,
    };
    return this.apiService.jsonToFormData(rawData);
  }

  /**
   * Checks if API call succeeded.
   */
  private isSuccessful(response: any): boolean {
    return response && response.ok;
  }

  /**
   * Handles failed password reset.
   */
  private handleSubmissionError(response: any): void {
    const errorMessage =
      response?.data?.detail || response?.message || 'Unknown error';
    console.error('Password reset failed:', errorMessage);
  }
}
