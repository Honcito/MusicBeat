import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../services/song.service';  // Asegúrate de tener este servicio para obtener las canciones
import { catchError } from 'rxjs/operators'; // Importar catchError para manejar errores
import { of } from 'rxjs'; // Importar of para manejar errores con un observable vacío
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.page.html',
  styleUrls: ['./playlist-songs.page.scss'],
})
export class PlaylistSongsPage implements OnInit {

  playlistId!: number;
  songs: any[] = [];  // Aquí almacenamos las canciones de la playlist
  currentSongIndex: number = 0;  // Índice de la canción que se está reproduciendo
  isPlaying: boolean = false;  // Para saber si la canción está sonando
  errorMessage: string = '';  // Mensaje de error si hay algún problema
  audio: HTMLAudioElement | null = null; // Instancia del audio actual
  apiUrl: string = 'http://localhost:8080/api'

  constructor(
    private activatedRoute: ActivatedRoute,
    private songService: SongService,  // Servicio para obtener canciones
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('playlistId');
      console.log('ID de Playlist recibido desde la URL:', idParam);  // Log para verificar el ID
  
      if (idParam) {
          this.playlistId = +idParam;  // Convierte el idParam en número
          console.log('Playlist ID como número:', this.playlistId);  // Verifica la conversión
  
          // Verifica que playlistId sea un número válido
          if (isNaN(this.playlistId)) {
              this.errorMessage = 'ID de playlist inválido.';
              console.error('ID de playlist no válido');
              return; // Detiene el proceso si el id no es válido
          }
  
          // Llama al servicio para obtener las canciones
          console.log('Llamando al servicio para obtener canciones de la playlist');
          this.songService.getSongsByPlaylist(this.playlistId).pipe(
            catchError(error => {
              this.errorMessage = 'Hubo un error al cargar las canciones.';
              console.error('Error fetching songs:', error);
              return of([]);  // Devuelve un observable vacío en caso de error
            })
          ).subscribe(response => {
              console.log('Respuesta recibida:', response);  // Log para ver la respuesta completa
              this.songs = response.map(item => item.song);  // Accede correctamente a las canciones
  
              // Si no hay canciones, mostramos un mensaje
              if (this.songs.length === 0) {
                console.log('No se encontraron canciones para esta playlist');
              }
          });
      } else {
          this.errorMessage = 'No se proporcionó un ID de playlist.';
          console.error('No se proporcionó un ID de playlist');
      }
    });
  }


  // Reproducir canción
  playSong(index: number) {
    console.log('Reproduciendo canción en el índice:', index);  // Log para ver qué canción se va a reproducir
    this.currentSongIndex = index;
    
    // Si hay una canción sonando, pausarla primero
    if (this.audio) {
      this.audio.pause(); // Detener la canción actual
    }

    const songUrl = this.songs[this.currentSongIndex].url; // Asumiendo que cada canción tiene una propiedad `url`
    console.log('URL de la canción que se va a reproducir:', songUrl);  // Log para verificar la URL de la canción
    this.audio = new Audio(songUrl);  // Crear una nueva instancia de audio
    this.audio.play();  // Reproducir la canción

    this.isPlaying = true;  // Marcar como que se está reproduciendo
    this.audio.onended = () => {  // Cuando termine la canción
      this.isPlaying = false;
    };
  }

  // Pausar canción
  pauseSong() {
    console.log('Pausando canción');  // Log para saber cuándo se pausa
    if (this.audio) {
      this.audio.pause();  // Detener la reproducción
      this.isPlaying = false;  // Cambiar el estado a pausado
    }
  }

   // Detener canción
   stopSong() {
    console.log('Deteniendo canción');  // Log para saber cuándo se detiene
    if (this.audio) {
      this.audio.pause();  // Detener la canción
      this.audio.currentTime = 0;  // Volver al inicio
      this.isPlaying = false;  // Cambiar el estado a detenido
    }
  }

  // Ir a la canción anterior
  prevSong() {
    console.log('Canción anterior');  // Log para indicar que vamos a la canción anterior
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
    } else {
      this.currentSongIndex = this.songs.length - 1;  // Volver a la última canción si estamos en la primera
    }
    this.playSong(this.currentSongIndex);  // Reproducir la canción seleccionada
  }

  // Ir a la siguiente canción
  nextSong() {
    console.log('Canción siguiente');  // Log para indicar que vamos a la siguiente canción
    if (this.currentSongIndex < this.songs.length - 1) {
      this.currentSongIndex++;
    } else {
      this.currentSongIndex = 0;  // Volver a la primera canción si estamos en la última
    }
    this.playSong(this.currentSongIndex);  // Reproducir la siguiente canción
  }

  // Mezclar las canciones
  shuffleSongs() {
    console.log('Mezclando canciones');  // Log para indicar que vamos a mezclar las canciones
    this.songs = this.songs.sort(() => Math.random() - 0.5);  // Método simple para mezclar el array
    this.currentSongIndex = 0;  // Empezar desde la primera canción después de mezclar
    this.playSong(this.currentSongIndex);  // Reproducir la primera canción del nuevo orden
  }

  removeSongFromPlaylist(playlistId: number, songId: number) {
    this.songService.removeSongFromPlaylist(playlistId, songId).subscribe(
      () => {
        alert('Song removed from playlist.');
        // Elimina la canción localmente para reflejar el cambio en la UI
        this.songs = this.songs.filter(song => song.id !== songId);
      },
      (error) => {
        console.error('Error deleting song from playlist:', error);
        alert('There was a problem removing the song.');
      }
    );
  }
  
}
