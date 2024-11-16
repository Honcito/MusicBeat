// playlist.page.ts

import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  playlists: any[] = [];
  newPlaylistName: string = '';
  //loading = true;
  userId: string = ''; // Inicializamos el userId

  constructor(
    private playlistService: PlaylistService,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');  // Obtener el userId desde el localStorage

    if (userId) {
      this.userId = userId;
      this.loadPlaylists();  // Cargar las playlists del usuario
    } else {
      console.error('No se encontró el ID de usuario.');
      //this.loading = false;
    }
  }

  loadPlaylists() {
    if (!this.userId) {
      console.error('No se encontró el userId');
      return;
    }

    // Llamada a la API para obtener las playlists del usuario
    this.playlistService.getPlaylistsByUser(this.userId).subscribe(
      (data) => {
        this.playlists = data;  // Guardamos las playlists
        //this.loading = false;
      },
      (error) => {
        console.error('Error al cargar las playlists:', error);
        //this.loading = false;
      }
    );
  }

  // Método para crear una playlist
  createPlaylist() {
    if (this.newPlaylistName.trim() === '') {
      alert('Por favor, ingresa un nombre para la playlist');
      return;
    }

    const token = localStorage.getItem('token');
    const userId = this.userId; // Usamos el userId del localStorage o del componente
    console.log('Token desde localStorage:', token);
    console.log('User Id desde localStorage:', userId);

    // Verifica que el ID de usuario y el nombre de la playlist sean válidos
    if (!userId) {
      alert('Usuario no autenticado. No se puede crear la playlist.');
      return;
    }

    // Enviar la solicitud para crear la playlist
    fetch('http://localhost:8080/api/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: this.newPlaylistName, userId: userId }), // Enviar el nombre y el ID del usuario
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Playlist creada:', data); // Mostrar la respuesta del servidor
        this.loadPlaylists(); // Recargar las playlists
        this.newPlaylistName = ''; // Limpiar el campo de texto
      })
      .catch((error) => {
        console.error('Error al crear la playlist:', error);
        alert('Ocurrió un error al crear la playlist. Inténtalo de nuevo.'); // Mostrar un mensaje de error al usuario
      });
  }

  // Método para ver las canciones de la playlist
  viewSongsInPlaylist(playlistId: number) {
    this.navCtrl.navigateForward(`/song-in-list/${playlistId}`);
  }

  // Método para eliminar una playlist
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
