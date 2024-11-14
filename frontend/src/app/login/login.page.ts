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
      password: this.password
    };
  
    this.http.post(`${environment.apiUrl}/api/users/login`, loginData).subscribe(
      (response: any) => {
        console.log('Login response:', response); // Log the entire response
  
        // Check if the user object exists and retrieve userId
        if (response.user && response.user.id) {
          localStorage.setItem('userId', response.user.id); // Store the userId
        } else {
          console.warn('userId not found in response');
        }
  
        localStorage.setItem('token', response.token); // Store the token
        this.router.navigate(['/tabs/home']); // Redirect to the home page
      },
      error => {
        console.error('Login error:', error); // Log the error for debugging
        alert('Login failed');
      }
    );
  }
}
