import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación
import { Router } from '@angular/router';  // Para redirigir al usuario después del login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';  // Variable para almacenar errores

  constructor(private authService: AuthService, private router: Router) {}

  handleLogin() {
    // Llamar al servicio de login
    this.authService.loginUser(this.email, this.password).subscribe(
      (data) => {
        // Si la autenticación es exitosa, guardamos el token y redirigimos
        sessionStorage.setItem('token', data.token);  // Guardamos el token recibido en sessionStorage

        console.log('Login successful', data);
        // Redirigir al usuario a la página protegida, como el perfil
        this.router.navigate(['/profile']);  // Redirige a /profile o donde necesites
      },
      (error) => {
        // En caso de error, mostramos un mensaje
        this.error = error || 'Credenciales incorrectas';  // Mostramos el error recibido o un mensaje predeterminado
        console.error('Login error', error);  // Mostramos el error en la consola para depuración
      }
    );
  }
}
