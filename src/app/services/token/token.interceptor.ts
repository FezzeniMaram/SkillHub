import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // 🔐 Récupère le token JWT

    if (token) {
      // ✅ Clone la requête et ajoute le token dans les headers
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(clonedReq);
    }

    // 🔄 Si pas de token, continuer avec la requête d'origine
    return next.handle(req);
  }
}
