import { SongService } from './../services/song.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-songs',
  templateUrl: './create-songs.page.html',
  styleUrls: ['./create-songs.page.scss'],
})
export class CreateSongsPage {

  song = {
    title: '',
    artist: '',
    album: '',
    length: '',
    url: '',
    cover: ''
  };

  constructor(private songService: SongService, private router: Router) {}

  createSong() {
    console.log(this.song);
    // Llamada al servicio para crear una canción
    this.songService.createSong(this.song).subscribe(
      (response) => {
        console.log('Canción creada', response);
        // Restablece los campos del formulario después de crear la canción
        this.resetForm();
        // Redirige a la página de canciones después de crear la canción
        // this.router.navigate(['/tabs/songs']);
        // Redirige a una URL temporal y luego a la página de canciones
      this.router.navigateByUrl('/tabs/songs', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/tabs/songs']);
      });
    },
    (error) => {
      console.error('Error al crear la canción', error);
    }
  );
}

  resetForm() {
    // Restablece el objeto `song` a los valores iniciales
    this.song = {
      title: '',
      artist: '',
      album: '',
      length: '',
      url: '',
      cover: ''
    };
  }
}
