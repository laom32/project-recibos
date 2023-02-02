import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertMsgService {

  constructor() { }
  alertWarning(title: string, text: string, footer: string = '') {
    return Swal.fire({
      icon: 'warning',
      title: title,
      // text: text,
      html: text,
      footer: footer,
      customClass: {
        popup: 'popup-class',
      },
    });
  }
  alertWarningConfirm(title: string, text: string, TituloMsjConfirmacion: string = 'Atención', textoMsjConfirmacion: string = 'se ha eliminado correctamente') {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        popup: 'popup-class',
      },
    }).then((result) => {
      return result;
    });
  }
  alertSuccess(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      // type: 'success',
      customClass: {
        popup: 'popup-class',
      },
    });
  }
  alertError(title: string, text: string, footer: string = '') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      footer: footer,
      customClass: {
        popup: 'popup-class',
      },
    })
  }
  alertInfo(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      //  type: 'info',
      customClass: {
        popup: 'popup-class',
      },
    });
  }
}
