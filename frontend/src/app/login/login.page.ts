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
        localStorage.setItem('token', response.token); // Guardar el token en el localStorage
        this.router.navigate(['/home']); // Redirigir a la página de inicio
      },
      error => {
        alert('Login failed');
      }
    );
  }
}

