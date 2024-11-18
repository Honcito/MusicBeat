import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  constructor(private router: Router) {}

  openExternalLink(url: string): void {
    window.open(url, '_blank'); // '_blank' abre el enlace en una nueva pestaña o ventana _self en la misma
  }
  

}
