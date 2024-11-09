import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:8080/api/auth/login'; // Cambia la URL si es necesario

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Función para hacer login y obtener el token
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(API_URL, { email, password }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        // Aquí puedes manejar errores específicos de la llamada HTTP, por ejemplo, credenciales incorrectas
        return throwError('Login failed. Please check your credentials.');
      })
    );
  }

  // Función para hacer logout
  logoutUser(): void {
    sessionStorage.removeItem('token');  // Eliminar el token del sessionStorage
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token'); // Retorna true si el token existe
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Función para registrar un usuario (opcional, si es necesario)
  registerUser(email: string, password: string): Observable<any> {
    const REGISTER_URL = 'http://localhost:8080/api/auth/register'; // Cambia la URL si es necesario
    return this.http.post<any>(REGISTER_URL, { email, password }).pipe(
      catchError((error) => {
        console.error('Register error:', error);
        return throwError('Registration failed. Please try again.');
      })
    );
  }
}
