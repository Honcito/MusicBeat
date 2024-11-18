import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-songs-user',
  templateUrl: './songs-user.page.html',
  styleUrls: ['./songs-user.page.scss'],
})
export class SongsUserPage implements OnInit {
  songs: any[] = [];
  currentAudio: HTMLAudioElement | null = null;  // Propiedad para almacenar el audio actual
  isPlaying: boolean = false;  // Indica si la canción está siendo reproducida
  currentSongUrl: string | null = null;  // URL de la canción actual

  constructor(private songService: SongService, private router: Router) {}

  ngOnInit() {
    this.loadSongs();
  }

  ionViewWillEnter() {
    this.loadSongs();
  }

  loadSongs() {
    this.songService.getAllSongs().subscribe((data: any[]) => {
      this.songs = data;
    });
  }

  // Reproducir o pausar canción
  togglePlayPause(songUrl: string) {
    if (this.currentAudio && this.currentSongUrl !== songUrl) {
      // Si hay un audio reproducido y no es la misma canción, pausamos y cargamos la nueva
      this.currentAudio.pause();  // Pausar la canción actual
      this.currentAudio.currentTime = 0;  // Reiniciar la canción a 0 (opcional)
      this.isPlaying = false;
    }

    if (!this.currentAudio || this.currentSongUrl !== songUrl) {
      // Si no hay canción reproduciéndose o la canción es diferente
      this.currentSongUrl = songUrl;  // Actualizamos la URL de la canción actual
      this.currentAudio = new Audio(songUrl);  // Creamos un nuevo objeto Audio
      this.currentAudio.play().catch(error => {
        console.error('Error al reproducir la canción', error);
        alert('No se pudo reproducir la canción. Verifica que el archivo esté disponible.');
      });
      this.isPlaying = true;  // Cambiar estado a "reproduciendo"
    } else if (this.isPlaying) {
      // Si la canción es la misma y está reproduciéndose, pausar
      this.currentAudio.pause();
      this.isPlaying = false;
    } else {
      // Si la canción es la misma y está pausada, reanudar
      this.currentAudio.play().catch(error => {
        console.error('Error al reproducir la canción', error);
        alert('No se pudo reproducir la canción. Verifica que el archivo esté disponible.');
      });
      this.isPlaying = true;
    }
  }

  // Detener canción (pausar sin reiniciar)
  pauseSong() {
    if (this.currentAudio) {
      this.currentAudio.pause();  // Pausar la canción
      this.isPlaying = false;     // Cambiar estado a "no está reproduciendo"
    }
  }
}
