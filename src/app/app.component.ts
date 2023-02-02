import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

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
    private _auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this._auth.isAuthenticated().subscribe({
      next: data => {
        console.log(data);
        this.profile = data;
      }
    });
  }

  cerrarSesion() {
    this._auth.signOut();
  }
}
