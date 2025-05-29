import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  showFirstPassword = false;
  showSecondPassword = false;

  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.createForm();
  }

  /**
   * Creates the reset-password form group with email, password, and confirmPassword.
   * Adds custom validator to check for password match.
   * @returns A FormGroup instance with validation rules
   */
  private createForm(): FormGroup {
    const form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
    return form;
  }

  /**
   * Validates that password and confirmPassword are equal.
   * @param group The FormGroup to validate
   * @returns Validation error or null
   */
  private passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Toggles the visibility of the first password input.
   * Called when the visibility icon is clicked.
   */
  toggleFirstPassword(): void {
    this.showFirstPassword = !this.showFirstPassword;
  }

  /**
   * Toggles the visibility of the second password input.
   * Called when the visibility icon is clicked.
   */
  toggleSecondPassword(): void {
    this.showSecondPassword = !this.showSecondPassword;
  }

  /**
   * Handles the form submission.
   * Logs form values to the console if valid.
   */
  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    }
  }
}
