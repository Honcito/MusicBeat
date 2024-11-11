// Archivo: create-users.page.ts

import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.page.html',
  styleUrls: ['./create-users.page.scss'],
})
export class CreateUsersPage implements OnInit {
  capturedPhoto: string = ''; // Variable para almacenar la foto tomada o seleccionada
  isSubmitted: boolean = false;

  // Definir un objeto user para el modelo de datos
  user = {
    username: '',
    email: '',
    password: '',
    role: 'user', // Valor por defecto
    filename: ''
  };

  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    this.isSubmitted = false;
    this.capturedPhoto = '';
  }

  ngOnInit() {}

  // Método para tomar una foto con la cámara
  takePhoto() {
    Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, // Tomar foto desde la cámara
      quality: 100
    }).then(photo => {
      this.capturedPhoto = photo.webPath ? photo.webPath : ''; // Guardar la foto en la variable capturedPhoto
    }).catch(error => {
      console.error('Error al tomar la foto:', error);
    });
  }

  // Método para seleccionar una foto desde la galería
  pickImage() {
    Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // Seleccionar imagen desde la galería
      quality: 100
    }).then(photo => {
      this.capturedPhoto = photo.webPath ? photo.webPath : ''; // Guardar la foto en la variable capturedPhoto
    }).catch(error => {
      console.error('Error al seleccionar la imagen:', error);
    });
  }

  // Método para descartar la imagen
  discardImage() {
    this.capturedPhoto = ""; // Limpiar la imagen capturada
  }

  // Método para enviar el formulario
  createUser() {
    if (this.user.username && this.user.email && this.user.password && this.user.role) {
      console.log('Usuario creado:', this.user);

      const formData = new FormData();
      formData.append('username', this.user.username);
      formData.append('email', this.user.email);
      formData.append('password', this.user.password);
      formData.append('role', this.user.role);

      // Verificar si hay una imagen capturada y convertirla a Blob si es necesario
      if (this.capturedPhoto.startsWith('blob:')) {
        fetch(this.capturedPhoto)
          .then(res => res.blob())
          .then(blob => {
            formData.append('image', blob, 'profile-image.jpg'); // Añadir la imagen al FormData
            // Enviar al backend después de convertir la imagen a Blob
            this.http.post(`${environment.apiUrl}/api/users`, formData).subscribe(
              (response) => {
                console.log('Usuario creado con éxito:', response);
              },
              (error) => {
                console.error('Error al crear el usuario:', error);
              }
            );
          });
      } else {
        console.log('Por favor, capture o seleccione una imagen.');
      }
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }
}
