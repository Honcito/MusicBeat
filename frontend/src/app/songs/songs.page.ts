import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {
  songs: any[] = [];
  currentAudio: HTMLAudioElement | null = null;  // Propiedad para almacenar el audio actual
  currentSongUrl: string | null = null;          // Para la canción actual

  constructor(private songService: SongService) {}

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

  deleteSong(id: number) {
    this.songService.deleteSong(id).subscribe(() => {
      this.loadSongs(); // Reload the list after deletion
    }); 
  }
 
  // Reproducir canción
  playSong(songUrl: string) {
    if (this.currentAudio) {
      this.currentAudio.pause();  // Pausa la canción actual si se está reproduciendo
    }

    this.currentSongUrl = songUrl;  // Asigna la URL actual al reproductor

    // Asignar el nuevo audio
    const audio = new Audio(songUrl);
    this.currentAudio = audio;

    // Reproduce el nuevo audio
    this.currentAudio.play().catch(error => {
      console.error('Error al reproducir la canción', error);
      alert('No se pudo reproducir la canción. Verifica que el archivo esté disponible.');
    });
  }

   // Detener canción (pausar y reiniciar el tiempo a 0)
   stopSong() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0; // Reinicia la canción
    }
  }
  
  
}
