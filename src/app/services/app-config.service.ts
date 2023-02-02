import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(private injector: Injector) { }
  get reciboUrl(): string {
    return `${this.injector.get('BASE_URL')}Recibo`;
  }
}
