import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from 'src/environments/environment';
import localeEs from '@angular/common/locales/es';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return environment.baseUrl;
}