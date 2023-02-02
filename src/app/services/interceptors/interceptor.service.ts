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
        // if (req.url.includes("https://www.repobox.com.mx:8989") || req.url.includes("localhost:56486") || req.url.includes("54.187.107.30:9299")) {
        //   return next.handle(req);
        // } else {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `${jwtToken.signInUserSession.idToken.jwtToken}`)
        });
        return next.handle(authReq);
        // }
      })
    );
  }
}
