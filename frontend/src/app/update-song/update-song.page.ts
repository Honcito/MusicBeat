import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.page.html',
  styleUrls: ['./update-song.page.scss'],
})
export class UpdateSongPage implements OnInit {
  updateForm: FormGroup;
  songId: number | null = null;  // Inicializa como null

  constructor(
    private activatedRoute: ActivatedRoute,
    private songService: SongService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Agrega todos los campos que necesitas en el formulario
    this.updateForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      artist: ['', [Validators.required]],
      album: ['', [Validators.required]], // Nuevo campo
      length: ['', [Validators.required]], // Nuevo campo
      url: ['', [Validators.required]],
      cover: ['', [Validators.required]] // Nuevo campo
    });
  }

  ngOnInit() {
    const songIdFromUrl = this.activatedRoute.snapshot.paramMap.get('id');
    
    // Verifica si el id es válido y no es nulo
    if (songIdFromUrl && !isNaN(Number(songIdFromUrl))) {
      this.songId = +songIdFromUrl;  // Convierte el valor a número si es válido
      // Ahora puedes proceder a hacer la solicitud para obtener los datos del usuario
      this.songService.getSongById(this.songId).subscribe(
        (song) => {
          // Asigna los valores del formulario
          this.updateForm.patchValue({
            title: song.title,
            artist: song.artist,
            album: song.album, // Asegúrate de que el servicio devuelve este campo
            length: song.length, // Asegúrate de que el servicio devuelve este campo
            url: song.url,  
            cover: song.cover // Asegúrate de que el servicio devuelve este campo
          });
        },
        (error) => {
          console.error('Error fetching song data:', error);
        }
      );
    } else {
      console.error('Song ID is missing or invalid');
      // Redirige si no hay un id válido
      this.router.navigate(['/tabs/songs']);
    }
  }

  // Método para actualizar la canción
  updateSong() {
    if (this.updateForm.valid && this.songId != null) {
      const updatedSong = this.updateForm.value;
  
      // Creamos un objeto payload para enviar al backend
      const payload: any = {
        title: updatedSong.title,
        artist: updatedSong.artist,
        album: updatedSong.album,
        length: updatedSong.length, 
        url: updatedSong.url,
        cover: updatedSong.cover 
      };
  
      this.songService.updateSong(this.songId, payload).subscribe(
        (response) => {
          console.log('Song updated:', response);
          this.router.navigate(['/tabs/songs']);  // Redirige a la lista de canciones
        },
        (error) => {
          console.error('Error updating song:', error);
        }
      );
    } else {
      console.error('Form is not valid or song ID is missing');
    }
  }
}
