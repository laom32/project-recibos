import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { SharedDataService } from './services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'project-recibos';
  /**
   *
   */
  profile: boolean = false;
  constructor(
    private _auth: AuthService,
    public _shared: SharedDataService
  ) {

  }

  ngOnInit(): void {
    // this._auth.isAuthenticated().subscribe({
    //   next: data => {
    //     console.log(data);
    //     this.profile = data;
    //   }
    // });
    this._auth.loggedIn.subscribe((isAutenticated) => {
      //     ;
      this.profile = isAutenticated;
    });
  }

  cerrarSesion() {
    this._auth.signOut();
  }
}
