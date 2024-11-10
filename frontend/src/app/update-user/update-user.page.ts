import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  updateForm: FormGroup;
  userId: number | null = null;  // Inicializa como null

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],  // La contraseña no es requerida inicialmente
      role: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const userIdFromUrl = this.activatedRoute.snapshot.paramMap.get('id');
    
    // Verifica si el id es válido y no es nulo
    if (userIdFromUrl && !isNaN(Number(userIdFromUrl))) {
      this.userId = +userIdFromUrl;  // Convierte el valor a número si es válido
      // Ahora puedes proceder a hacer la solicitud para obtener los datos del usuario
      this.userService.getUserById(this.userId).subscribe(
        (user) => {
          // Asigna los valores del formulario, dejando la contraseña vacía, pero el resto de campos con los datos actuales
          this.updateForm.patchValue({
            username: user.username,
            email: user.email,
            password: '',  // Deja el campo de la contraseña vacío
            role: user.role
          });
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('User ID is missing or invalid');
      // Redirige si no hay un id válido
      this.router.navigate(['/users']);
    }
  }

  // Método para manejar los cambios en el campo de la contraseña
  onPasswordInputChange() {
    const passwordControl = this.updateForm.get('password');

    // Verificamos que passwordControl no sea null antes de continuar
    if (passwordControl) {
      if (passwordControl.value) {
        // Si el campo tiene valor, la hacemos obligatoria
        passwordControl.setValidators([Validators.required, Validators.minLength(6)]);
      } else {
        // Si el campo está vacío, la validación es opcional
        passwordControl.clearValidators();
      }
      passwordControl.updateValueAndValidity();
    }
  }

  // Método para actualizar el usuario
  updateUser() {
    if (this.updateForm.valid && this.userId != null) {
      const updatedUser = this.updateForm.value;
  
      // Creamos un objeto payload para enviar al backend
      const payload: any = {
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role
      };
  
      // Solo incluimos la contraseña si tiene un valor
      if (updatedUser.password) {
        payload.password = updatedUser.password;
      }
  
      this.userService.updateUser(this.userId, payload).subscribe(
        (response) => {
          console.log('User updated:', response);
          this.router.navigate(['/users']);  // Redirige a la lista de usuarios
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.error('Form is not valid or user ID is missing');
    }
  }
}
