
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

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
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // Ejemplo de una solicitud autenticada
  getUserProfile() {
    return this.http.get(`${environment.apiUrl}/api/users/profile`, this.getAuthHeaders());
  }

  // Método de inicio de sesión
  login(email: string, password: string) {
    this.http
      .post<{ token: string }>(`${environment.apiUrl}/api/users/login`, { email, password })
      .subscribe((response) => {
        if (response.token) {
          // Guardamos el token en localStorage
          localStorage.setItem('token', response.token);
          console.log('Token guardado:', response.token);

          // Decodificamos el token
          try {
            const decodedToken: any = jwtDecode(response.token);
            console.log('Decoded Token:', decodedToken);  // Verifica todo el contenido del token decodificado

            // Verifica que el id esté presente
            if (decodedToken && decodedToken.id) {
              const userId = decodedToken.id;
              localStorage.setItem('userId', userId.toString());
              console.log('User ID guardado:', userId);  // Verifica que el ID se extrae correctamente
            } else {
              console.error('Error: El token no contiene un campo "id"');
            }
          } catch (error) {
            console.error('Error al decodificar el token:', error);
          }
        }
      }, (error) => {
        console.error('Error en la solicitud de login:', error);
      });
  }

  // Método para obtener el userId del usuario logueado
  getUserId() {
    const userId = localStorage.getItem('userId');
    console.log('User ID desde localStorage:', userId);  // Verifica que el ID esté disponible en el localStorage
    return userId;
  }

  // Método para cerrar sesión
  logout() {
    this.http.post(`${environment.apiUrl}/api/users/logout`, {}).subscribe({
      next: (response) => {
        console.log('Logout exitoso');
        console.log('Token antes de eliminar:', localStorage.getItem('token'));
        console.log('UserId antes de eliminar:', localStorage.getItem('userId'));
        localStorage.removeItem('token');  // Limpia el token del almacenamiento
        localStorage.removeItem('userId');  // Limpia también el userId
        console.log('Token después de eliminar:', localStorage.getItem('token'));
        console.log('UserId después de eliminar:', localStorage.getItem('userId'));
      },
      error: (err) => console.error('Error al hacer logout:', err),
    });
  }
}
