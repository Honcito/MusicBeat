import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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

  // Para almacenar la URL de la imagen
  userImageUrl: string = '';

  constructor(private http: HttpClient, private router: Router) {}

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
  
      // Verificar si hay una imagen capturada
      if (this.capturedPhoto && this.capturedPhoto.startsWith('blob:')) {
        fetch(this.capturedPhoto)
          .then(res => res.blob())
          .then(blob => {
            formData.append('image', blob, 'profile-image.jpg'); // Agregar la imagen al FormData
            console.log('Imagen agregada al FormData:', blob);  // Verifica que la imagen se haya agregado correctamente
  
            // Enviar el FormData al backend
            this.http.post<any>(`${environment.apiUrl}/api/users`, formData).subscribe(
              (response) => {
                console.log('Usuario creado con éxito:', response);
                
                // Suponiendo que el backend envía la ruta del archivo en "response.filename"
                this.userImageUrl = `${environment.apiUrl}/${response.filename}`;
                console.log('URL de la imagen:', this.userImageUrl);

                // Redirigir de nuevo a la lista de usuarios
                this.router.navigate(['/tabs/users'])
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
