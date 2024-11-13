import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = 'http://localhost:8080/api/songs'; // Cambia esto a tu URL real

  constructor(private http: HttpClient) {}

  getAllSongs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createSong(song: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, song);
  }

  getSongById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateSong(id: number, song: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, song);
  }

  // Método para obtener las canciones de una playlist por ID
  getSongsByPlaylist(playlistId: number): Observable<any[]> {
    // Ruta correcta para obtener las canciones de una playlist específica
    return this.http.get<any[]>(`http://localhost:8080/api/songInList/playlist/${playlistId}`);
  }

  
}