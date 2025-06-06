import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  showPassword = false;
  showRepeatedPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.createForm();
  }

  /**
   * Lifecycle hook: sets email from localStorage if available.
   */
  ngOnInit(): void {
    this.prefillEmailFromLocalStorage();
  }

  /**
   * Creates the sign up form with validation.
   */
  private createForm(): FormGroup {
    return this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
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
   * Prefills the email field if a signUpEmail is stored in localStorage.
   * Redirects to home if no email found.
   */
  private prefillEmailFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const storedEmail = localStorage.getItem('signUpEmail');
      if (storedEmail) {
        this.signUpForm.patchValue({ email: storedEmail });
      } else {
        this.router.navigate(['/home']); // Redirect to home page
      }
    }
  }

  /**
   * Toggles visibility of the first password input.
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggles visibility of the repeated password input.
   */
  toggleRepeatedPassword(): void {
    this.showRepeatedPassword = !this.showRepeatedPassword;
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
    }
  }
}
