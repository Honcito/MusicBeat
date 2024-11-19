import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any[] = []; // Declare the users array

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // ionViewDidEnter() {
  //   this.loadUsers();}

  ionViewWillEnter() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers(); // Reload the list after deletion
    });
  }

  //photo
  addUser() {
    this.router.navigate(['/create-users']);
  }

}
