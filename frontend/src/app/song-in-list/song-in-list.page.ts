import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importar HttpClient
import { Router } from '@angular/router';  // Importar Router para redirección

@Component({
  selector: 'app-song-in-list',
  templateUrl: './song-in-list.page.html',
  styleUrls: ['./song-in-list.page.scss'],
})
export class SongInListPage implements OnInit {

  songs: any[] = []; // Lista de canciones
  playlists: any[] = []; // Listado de playlists del usuario
  selectedPlaylist: string = ''; // Playlist seleccionada
  loading: boolean = true; // Estado de carga de los datos

  constructor(
    private http: HttpClient, // Inyectamos HttpClient
    private router: Router  // Inyectamos Router
  ) {}

  ngOnInit() {
    // Cargar las canciones y playlists cuando la página se inicializa
    this.loadSongs();
    this.loadPlaylists();
  }

  loadSongs() {
    this.http.get('http://localhost:8080/api/songs') // Usamos HttpClient para hacer la solicitud
      .subscribe(
        (response: any) => {
          this.songs = response;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching songs:', error);
          this.loading = false;
        }
      );
  }

  loadPlaylists() {
    const userId = localStorage.getItem('userId');  // Asegúrate de que el userId esté en localStorage

    if (!userId) {
      console.error('No se encontró el userId');
      return;
    }

    this.http.get(`http://localhost:8080/api/playlists/user/${userId}`)  // Llamada a la API para obtener las playlists del usuario
      .subscribe(
        (response: any) => {
          this.playlists = response;
        },
        (error) => {
          console.error('Error fetching playlists:', error);
        }
      );
  }

  // Función para añadir canción a una playlist
  addSongToPlaylist(songId: number) {
    if (!this.selectedPlaylist) {
      alert('Por favor, selecciona una playlist.');
      return;
    }

    const data = {
      playlistId: this.selectedPlaylist,
      songId: songId
    };

    this.http.post('http://localhost:8080/api/songInList', data)  // Usamos HttpClient para realizar una solicitud POST
      .subscribe(
        (response) => {
          alert('Canción añadida a la playlist');
      
        },
        (error) => {
          console.error('Error adding song to playlist:', error);
          alert('Song already exists in this playlist.');
        }
      );
  }
}
