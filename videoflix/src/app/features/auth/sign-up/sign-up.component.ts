import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../../../core/services/api-service/api.service';

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
  isEmailPrefilled = false;
  errorVisible = false;
  private route = inject(ActivatedRoute);

  /**
   * Initializes the SignUpComponent with necessary services and sets up the form.
   *
   * @param fb - FormBuilder service for creating reactive forms
   * @param router - Angular Router used for navigation after signup
   * @param apiService - Custom service for handling API requests
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {
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
   * Prefills the email field from localStorage if the 'fromHome' query param is set.
   */
  private prefillEmailFromLocalStorage(): void {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      if (params['fromHome'] === '1') {
        const storedEmail = localStorage.getItem('signUpEmail');
        if (storedEmail) {
          this.signUpForm.patchValue({ email: storedEmail });
          this.isEmailPrefilled = true;
        }
      }
    });
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

  /**
   * Handles the form submission.
   */
  async onSubmit(): Promise<void> {
    if (!this.signUpForm.valid) return;

    const formData = this.createFormDataFromForm();
    const response = await this.authService.postData('registration/', formData);

    if (this.isSuccessful(response)) {
      this.finalizeSuccessfulSubmission();
    } else {
      this.showErrorTemporarily();
    }
  }

  /**
   * Converts form values to FormData object.
   * @returns FormData object with email, password and repeated password.
   */
  private createFormDataFromForm(): FormData {
    const rawData = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      repeated_password: this.signUpForm.value.repeatedPassword,
    };
    return this.apiService.jsonToFormData(rawData);
  }

  /**
   * Checks if the API response was successful.
   * Returns false if user is already verified.
   * @param response - API response object
   * @returns True if response is ok and user is not already verified
   */
  private isSuccessful(response: any): boolean {
    console.log(response.userIsAlreadyVerified);
    return response.ok;
  }

  /**
   * Handles the post-submission process after successful registration.
   */
  private finalizeSuccessfulSubmission(): void {
    localStorage.removeItem('signUpEmail');
    this.router.navigate(['/email-was-sent']);
  }

  /**
   * Shows error and hides it after 3 seconds.
   */
  private showErrorTemporarily(): void {
    this.errorVisible = true;
    setTimeout(() => {
      this.errorVisible = false;
    }, 3000);
  }

  /**
   * Hides the error container by setting errorVisible to false.
   */
  hideError(): void {
    this.errorVisible = false;
  }
}
