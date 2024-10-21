import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.page.html',
  styleUrls: ['./create-users.page.scss'],
})
export class CreateUsersPage {

  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  createUser() {
    // Llamada al servicio para crear el usuario
    this.userService.createUser(this.user).subscribe(
      (response) => {
        console.log('Usuario creado', response);
        // Restablece los campos del formulario después de crear el usuario
        this.resetForm();
        // Redirige a la página de usuarios después de crear el usuario
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error al crear el usuario', error);
      }
    );
  }

  resetForm() {
    // Restablece el objeto `user` a los valores iniciales
    this.user = {
      username: '',
      email: '',
      password: ''
    };
  }
}
