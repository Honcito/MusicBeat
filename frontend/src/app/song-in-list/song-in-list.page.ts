
import { Component, OnInit } from '@angular/core';
import axios from 'axios';  // Importa Axios para las peticiones HTTP

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

  constructor() { }

  ngOnInit() {
    // Cargar las canciones y playlists cuando la página se inicializa
    this.loadSongs();
    this.loadPlaylists();
  }

  loadSongs() {
    axios.get('http://localhost:8080/api/songs') // Asegúrate de que esta URL sea la correcta
      .then(response => {
        this.songs = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
        this.loading = false;
      });
  }

  loadPlaylists() {
    axios.get('http://localhost:8080/api/playlists') // Asegúrate de que esta URL sea la correcta
      .then(response => {
        this.playlists = response.data;
      })
      .catch(error => {
        console.error('Error fetching playlists:', error);
      });
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

    axios.post('http://localhost:8080/api/songInList', data) // Asegúrate de que esta URL sea la correcta
      .then(response => {
        alert('Canción añadida a la playlist');
      })
      .catch(error => {
        console.error('Error adding song to playlist:', error);
        alert('Hubo un problema al añadir la canción.');
      });
  }
}
