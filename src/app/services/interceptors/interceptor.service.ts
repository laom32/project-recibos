import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private _auth: AuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._auth.getCurrentUser().pipe(
      switchMap(jwtToken => {
        // clone the request to add the new header.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `${jwtToken.signInUserSession.idToken.jwtToken}`)
        });
        return next.handle(authReq);
      }));
  }
}
