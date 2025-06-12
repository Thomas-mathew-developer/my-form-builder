import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule]
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const isAuthenticated = this.authService.login(username!, password!);

      if (isAuthenticated) {
        const role = this.authService.getRole();
        if (role === 'Admin') {
          this.router.navigate(['/form-builder']);
        } else if (role === 'User') {
          this.router.navigate(['/submit-forms']);
        }
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    }
  }
}
