import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importa AuthService

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
  getPlaylistById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Método para eliminar una playlist por ID
  deletePlaylist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
