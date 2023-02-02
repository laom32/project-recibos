import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, tap, catchError, filter, first } from 'rxjs/operators';
import { SweetAlertMsgService } from '../sweet-alert-msg.service';


@Injectable()
export class AuthService {
  public loggedIn!: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
    private _msg: SweetAlertMsgService
  ) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }
  public changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return from(Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      // .then(data => console.log(data))
      // .catch(err => console.log(err))
    ).pipe(
      tap((e) => {
        return of(e);
        //   debugger;
      }),
      catchError(error => {
        return of(this.parseError(error));
      })
    );
  }
  public getCurrentUser(): Observable<any> {
    return from(Auth.currentUserPoolUser());
  }
  public getAccessToken(): Observable<string> {
    let token: string;
    return from(
      Auth.currentSession()
    ).pipe(
      first(),
      filter(value => {
        // debugger;
        return value !== null && value !== undefined;
      }),

      map(
        (session) => {
          // debugger;
          return session.getIdToken().getJwtToken();
        }
      )

    );
  }
  public signIn(email: string, password: string): Observable<any> {
    return from(Auth.signIn(email, password))
      .pipe(
        tap((e) => {
          //   debugger;
          // console.log(e);
          this.loggedIn.next(true);
        }),
        catchError(error => {
          this.loggedIn.next(false);
          let text = `${error}`;
          let lstText = text.split(":");
          let objError = {
            code: lstText[0],
            msg: lstText[1].trim()
          };
          return of(objError);
        })
      );
  }
  public completeNewPassword(user: any, newPassword: string): Observable<any> {
    return from(Auth.completeNewPassword(
      user,               // the Cognito User Object
      newPassword,
      {
        name: "Hola"
      }
    ));
  }
  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser())
      .pipe(
        map(result => {

          this.loggedIn.next(true);
          return true;
        }),
        catchError(error => {
          //   ;
          this.loggedIn.next(false);
          return of(false);
        })
      );
  }
  public signOut() {
    from(Auth.signOut())
      .subscribe({
        next: result => {

          this.loggedIn.next(false);
          //   this._shared.datosUser = null;
          this.router.navigateByUrl('/sign-in');

          // location.href = "/login";
        },
        error: error => console.log(error)
      }
      );
  }
  evaluarMensajesCognito(obj: any, mail: string = "", pantalla: string = "") {
    if (obj.code === "UserNotConfirmedException") {
      this._msg.alertWarning("Atención", "El usuario no ha sido confirmado. Favor de confirmarlo.");
      this.router.navigateByUrl('/confirmation/confirm');
    }
    if (obj.code === "NotAuthorizedException") {
      let msg = "El usuario o contraseña son incorrectos.";
      if (pantalla === "changePassword") {
        msg = "La contraseña actual es incorrecta, favor de intentarlo de nuevo.";
      }
      if (pantalla === "confirm") {
        msg = "El correo electrónico ya está confirmado.";
      }
      this._msg.alertWarning("Atención", msg);
    }
    if (obj.code === "LimitExceededException") {
      this._msg.alertWarning("Atención", "Se han producido demasiado intentos fallidos. Intente después de 10 minutos.");
    }
    if (obj.code === 'UserNotFoundException') {
      this._msg.alertError("Error", "El usuario no fue encontrado.");
    }
    if (obj.code === 'CodeDeliveryDetails') {
      this._msg.alertError("Error", "Ha ocurrido un error con la sesión.");
    }
    if (obj.code == "CodeMismatchException") {
      this._msg.alertWarning("Error", "El código de verificación es inválido.");
    }
    // if (obj.code == "ExpiredCodeException") {
    //   this.resendCodeConfirmation(mail).subscribe(res => {
    //     this._msg.alertWarning("Atención", "El código ingresado ya expiro, se le ha enviado un código válido a su correo electrónico.");
    //   });
    // }
    if (obj.code == "UsernameExistsException") {
      this._msg.alertWarning("Atención", "El usuario capturado ya existe.");
    }
    if (obj.challengeName !== undefined) {
      if (obj.challengeName === "NEW_PASSWORD_REQUIRED") {
        // this.objUsuario = data;
        // this.cambiarPassword = true;
        this.completeNewPassword(obj, "Devtest0102").subscribe(x => {
          console.log(x);
        });
      }
    }

    /**
     * Códigos de respuesta de error de Cognito
     * https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-managing-errors.html
     */
  }
  private parseError(error: any): DataError {
    let text = `${error}`;
    let lstText = text.split(":");
    let objError = {
      code: lstText[0],
      msg: lstText[1].trim()
    };
    return objError;
  }
}
interface DataError {
  code: string;
  msg: string;
}