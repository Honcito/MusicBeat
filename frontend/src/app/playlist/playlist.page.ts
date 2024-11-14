import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';  // Asegúrate de importar el AuthService

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  playlists: any[] = [];
  newPlaylistName: string = '';

  constructor(
    private playlistService: PlaylistService,
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService // Inyectamos AuthService para acceder al userId
  ) {}

  ngOnInit() {
    this.loadPlaylists();
  }

  loadPlaylists() {
    this.playlistService.getAllPlaylists().subscribe(
      (data) => {
        this.playlists = data;
      },
      (error) => {
        console.error('Error al cargar las playlists:', error);
      }
    );
  }

  createPlaylist() {
    if (this.newPlaylistName.trim() === '') {
      alert('Por favor, ingresa un nombre para la playlist');
      return;
    }
  
    const token = localStorage.getItem('token');
    const userId = this.authService.getUserId(); // Usamos el método getUser Id() del AuthService
    console.log('Token desde localStorage:', token);
    console.log('User Id desde authService:', userId);
  
    // Verifica que el ID de usuario y el nombre de la playlist sean válidos
    if (!userId) {
      alert('Usuario no autenticado. No se puede crear la playlist.');
      return;
    }
  
    // Enviar la solicitud para crear la playlist
    fetch("http://localhost:8080/api/playlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name: this.newPlaylistName, userId: userId }), // Enviar el nombre y el ID del usuario
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Playlist creada:", data); // Mostrar la respuesta del servidor
      this.loadPlaylists(); // Recargar las playlists
      this.newPlaylistName = ''; // Limpiar el campo de texto
    })
    .catch(error => {
      console.error("Error al crear la playlist:", error);
      alert('Ocurrió un error al crear la playlist. Inténtalo de nuevo.'); // Mostrar un mensaje de error al usuario
    });
  }

  viewSongsInPlaylist(playlistId: number) {
    this.navCtrl.navigateForward(`/song-in-list/${playlistId}`);
  }

  deletePlaylist(id: number) {
    this.playlistService.deletePlaylist(id).subscribe(
      (response) => {
        this.loadPlaylists(); // Recargar las playlists
      },
      (error) => {
        console.error('Error al eliminar la playlist:', error);
      }
    );
  }
}
