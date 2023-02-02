import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  _form!: FormGroup;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._form = new FormGroup({
      user: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(99)
      ]),
      password: new FormControl('', [
        Validators.required,
        withoutSpacesValidator
      ]),
    });
  }
  doLogin() {
    let info = this._form.value;
    this._auth.signIn(info.user, info.password).subscribe({
      next: data => {
        console.log(data);
        if (data.attributes === undefined) {
          this._auth.evaluarMensajesCognito(data);
        } else {
          // Set the redirect url.
          // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
          // to the correct page after a successful sign in. This way, that url can be set via
          // routing file and we don't have to touch here.
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

          // Navigate to the redirect url
          this._router.navigateByUrl(redirectURL);
        }
      }, error: data => {
        console.log(data);
      }
    });
    // this._router.navigate(["/home"]);
  }
}
export function withoutSpacesValidator(control: FormControl) {
  if (isNullOrUndefined(control.value) || control.value.includes(' ')) {
    return {
      'withoutSpaceError': { value: 'control has whitespace' }
    };
  }
  return null;
}