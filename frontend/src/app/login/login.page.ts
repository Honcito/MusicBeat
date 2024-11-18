import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post(`${environment.apiUrl}/api/users/login`, loginData).subscribe(
      (response: any) => {
        console.log('Login response:', response); // Log the entire response

        // Check if the user object exists and retrieve userId and role
        if (response.user) {
          const userId = response.user.id;
          const role = response.user.role;

          // Store userId and role in localStorage
          localStorage.setItem('userId', userId);
          localStorage.setItem('role', role);

          console.log(`User logged in. ID: ${userId}, Role: ${role}`);

          // Redirect based on the role
          if (role === 'admin') {
            this.router.navigate(['/tabs/home']); // Admin tabs
          } else if (role === 'user') {
            this.router.navigate(['/tabs-user/home']); // User tabs
          } else {
            alert('Role not recognized');
          }
        } else {
          console.warn('User data not found in response');
        }

        // Store the token in localStorage
        localStorage.setItem('token', response.token);
      },
      (error) => {
        console.error('Login error:', error); // Log the error for debugging
        alert('Login failed');
      }
    );
  }
}
