
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtén el token de sessionStorage
    const token = sessionStorage.getItem('token');

    // Si el token existe, agregamos la cabecera Authorization
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned);
    }

    // Si no hay token, la solicitud se maneja sin modificar
    return next.handle(req);
  }
}
