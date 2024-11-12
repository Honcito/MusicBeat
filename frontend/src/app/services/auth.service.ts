import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Método para obtener los encabezados de autenticación
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // Ejemplo de una solicitud autenticada
  getUserProfile() {
    return this.http.get(`${environment.apiUrl}/api/users/profile`, this.getAuthHeaders());
  }

  // Método de inicio de sesión
  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/api/users/login`, { email, password });
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento
  }
}
