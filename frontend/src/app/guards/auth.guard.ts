import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token'); // Donde se guarda el token, no en localStorage

    if (token) {
      return true; // El usuario está autenticado
    } else {
      this.router.navigate(['/login']); // Si no está autenticado, redirigir al login
      return false;
    }
  }
}
