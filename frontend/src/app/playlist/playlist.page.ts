import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service'; // Importa el servicio Playlist
import { Router } from '@angular/router'; // Si es necesario para navegar después de crear una playlist

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  playlists: any[] = []; // Para almacenar las playlists
  newPlaylistName: string = ''; // Para el nombre de la nueva playlist

  constructor(
    private playlistService: PlaylistService, // Inyectar el servicio Playlist
    private router: Router // Si deseas navegar a otra página después de la creación
  ) {}

  ngOnInit() {
    this.loadPlaylists(); // Cargar las playlists al inicio
  }

  // Método para cargar todas las playlists
  loadPlaylists() {
    this.playlistService.getAllPlaylists().subscribe(
      (data) => {
        this.playlists = data; // Asignar las playlists al array
      },
      (error) => {
        console.error('Error al cargar las playlists:', error);
      }
    );
  }

  // Método para crear una nueva playlist
  createPlaylist() {
    if (this.newPlaylistName.trim() === '') {
      alert('Por favor, ingresa un nombre para la playlist');
      return;
    }

    const userId = 1; // Este debe ser el ID del usuario logueado, adaptado a tu lógica de autenticación
    this.playlistService.createPlaylist(this.newPlaylistName, userId).subscribe(
      (response) => {
        this.loadPlaylists(); // Recargar las playlists después de crear una nueva
        this.newPlaylistName = ''; // Limpiar el campo de texto
      },
      (error) => {
        console.error('Error al crear la playlist:', error);
      }
    );
  }

  // Método para eliminar una playlist
  deletePlaylist(id: number) {
    this.playlistService.deletePlaylist(id).subscribe(
      (response) => {
        this.loadPlaylists(); // Recargar las playlists después de eliminar una
      },
      (error) => {
        console.error('Error al eliminar la playlist:', error);
      }
    );
  }
}
