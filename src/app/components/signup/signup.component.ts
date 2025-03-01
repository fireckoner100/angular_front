import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  errorMessage: string = '';
  successMessage: string = '';

  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'password_confirmation') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  register() {
    if (this.signupForm.invalid) return;
  
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
  
    this.usersService.createUser(this.signupForm.value).subscribe({
      next: () => {
        this.successMessage = 'User registered successfully!';
        this.signupForm.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('Error:', error);
        this.errorMessage = error.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  
}
