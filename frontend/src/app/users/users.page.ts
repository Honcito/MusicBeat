import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any[] = []; // Declare the users array
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        console.log('Usuarios recibidos:', data);  // Verifica los datos en la consola
        this.users = data;  // Aquí asignas los datos a la variable 'users'
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);  // Aquí capturas los errores si ocurren
      }
    );
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();  // Reload the list after deletion
    });
  }
}
 
