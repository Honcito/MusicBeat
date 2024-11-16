
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importa AuthService
import { HttpClient, HttpHeaders } from '@angular/common/http'; 


@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = 'http://localhost:8080/api/playlists'; // Cambia esta URL según tu backend

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inyecta AuthService
  ) {}

  // Método para crear una nueva playlist
  createPlaylist(name: string): Observable<any> {
    const userId = this.authService.getUserId(); // Obtiene el userId del usuario logueado
    const body = { name, userId };
    return this.http.post(this.apiUrl, body);
  }

  // Método para obtener todas las playlists
  getAllPlaylists(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para obtener una playlist por ID
  getPlaylistsByUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    // Asegúrate de que el token esté bien configurado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Asegúrate de que la URL es correcta
    return this.http.get(`${this.apiUrl}/user/${userId}`, { headers });
  }

  // Método para eliminar una playlist por ID
  deletePlaylist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
