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
  capturedPhoto: string = ''; // Almacena la foto tomada o seleccionada
  isSubmitted: boolean = false; // Controla si el formulario se ha enviado

  // Modelo de usuario
  user = {
    username: '',
    email: '',
    password: '',
    role: 'user', // Valor predeterminado
    filename: ''
  };

  userImageUrl: string = ''; // URL de la imagen del usuario para visualizar

  constructor(private http: HttpClient, private router: Router) {}

  ionViewWillEnter() {
    this.isSubmitted = false;
    this.capturedPhoto = ''; // Reinicia la foto capturada al entrar en la vista
  }

  ngOnInit() {}

  // Método para tomar una foto con la cámara
  takePhoto() {
    Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, 
      quality: 100
    })
    .then(photo => this.capturedPhoto = photo.webPath || '')
    .catch(error => console.error('Error al tomar la foto:', error));
  }

  // Método para seleccionar una imagen de la galería
  pickImage() {
    Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    })
    .then(photo => this.capturedPhoto = photo.webPath || '')
    .catch(error => console.error('Error al seleccionar la imagen:', error));
  }

  // Método para descartar la imagen seleccionada o capturada
  discardImage() {
    this.capturedPhoto = ''; // Limpia la foto capturada
  }

  // Método para crear un nuevo usuario
  createUser() {
    if (this.user.username && this.user.email && this.user.password && this.user.role) {
      console.log('Usuario creado:', this.user);

      const formData = new FormData();
      formData.append('username', this.user.username);
      formData.append('email', this.user.email);
      formData.append('password', this.user.password);
      formData.append('role', this.user.role);

      // Verifica si se ha capturado o seleccionado una imagen
      if (this.capturedPhoto.startsWith('blob:')) {
        fetch(this.capturedPhoto)
          .then(res => res.blob())
          .then(blob => {
            formData.append('image', blob, 'profile-image.jpg'); // Agrega la imagen al FormData
            console.log('Imagen agregada al FormData:', blob);

            // Enviar los datos del usuario al backend
            this.sendUserData(formData);
          })
          .catch(error => console.error('Error al procesar la imagen:', error));
      } else {
        console.log('Por favor, capture o seleccione una imagen.');
      }
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }

  // Método auxiliar para enviar datos al backend y redirigir después de la creación
  private sendUserData(formData: FormData) {
    this.http.post<any>(`${environment.apiUrl}/api/users`, formData).subscribe({
      next: (response) => {
        console.log('Usuario creado con éxito:', response);
        
        // Asignar la URL de la imagen devuelta por el backend
        this.userImageUrl = `${environment.apiUrl}/${response.filename}`;
        console.log('URL de la imagen:', this.userImageUrl);

        // Redirigir a la lista de usuarios después de la creación
        this.router.navigate(['/tabs/users']).then(() => {
          window.location.reload();  // Fuerza una recarga completa para ver el nuevo usuario
        });
      },
      error: (err) => console.error('Error al crear el usuario:', err)
    });
  }
}
