import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  cargando: boolean = false;
  constructor() { }
}
