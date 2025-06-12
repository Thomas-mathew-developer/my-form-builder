import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string | null = null;

  login(username: string, password: string): boolean {
    if (username === 'Admin' && password === '1234') {
      this.role = 'Admin';
      localStorage.setItem('role', 'Admin');
      return true;
    }
    if (username === 'User' && password === '1234') {
      this.role = 'User';
      localStorage.setItem('role', 'User');
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('role');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  logout(): void {
    localStorage.removeItem('role');
    this.role = null;
  }
}
