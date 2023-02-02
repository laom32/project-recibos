import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private auth: AuthService
    ) { }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
        //   return of(true);

        /* return this.auth.isAuthenticated()
           .pipe(
             tap(loggedIn => {
               //  ;
               //this.router.navigate(['/verify']);
               // console.log("dwa");
               if (!loggedIn) {
                 this.router.navigate(['/sign-in']);
               }
     
             })
           );*/

    }
    private _check(redirectURL: string): Observable<boolean> {
        // Check the authentication status
        return this.auth.isAuthenticated()
            .pipe(
                switchMap((authenticated) => {

                    // If the user is not authenticated...
                    if (!authenticated) {
                        // Redirect to the sign-in page
                        this.router.navigate(['sign-in'], { queryParams: { redirectURL } });

                        // Prevent the access
                        return of(false);
                    }

                    // Allow the access
                    return of(true);
                })
            );
    }
}