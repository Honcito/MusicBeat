
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  constructor(private router: Router, private authService: AuthService) { }

  openExternalLink(url: string): void {
    window.open(url, '_blank'); // '_blank' abre el enlace en una nueva pestaña o ventana _self en la misma
  }
  
  logout() {
    this.authService.logout();  // Llamamos al método logout que ya existe en AuthService
    this.router.navigate(['/login']);
  }

}
