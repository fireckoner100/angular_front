import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage = '';

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Please complete all fields correctly.';
      return;
    }

    const { email, password } = this.profileForm.value;

    console.log('Datos enviados:', { email, password });

    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.user.name);
        console.log('Login exitoso:', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Incorrect credentials.';
        console.error('Error en login:', err);
      }
    });
  }
}
