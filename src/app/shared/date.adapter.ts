import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
// import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MatDateFormats, MAT_DATE_LOCALE } from "@angular/material";
import * as moment from 'moment';

// @NgModule({
//   declarations: [

//   ],
//   imports: [

//   ],
//   providers: [
//     { provide: MAT_DATE_LOCALE, useValue: 'en-US' }
//   ],
//   exports: [

//   ],
//   entryComponents: [

//   ]
// })

export class AppDateAdapter extends NativeDateAdapter {
  private localeData = moment.localeData();
  // tipoSesion: any = JSON.parse(localStorage.getItem("UsuarioDatos"));
  // lang: any = this.tipoSesion === null ? 'mx' : localStorage.getItem("lang_" + this.tipoSesion["usuario"]["id"]);
  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
  format(date: Date, displayFormat: string): string {
    if (displayFormat == "input") {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      // if (this.lang === "en")
      //   return this._to2digit(month) + '/' + this._to2digit(day) + '/' + year;
      // else
        return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
    } else if (displayFormat == "inputMonth") {
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return this._to2digit(month) + '/' + year;
    } else {
      return date.toDateString();
    }
  }
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return this.localeData.months();
      case 'short':
        return this.monthsShortEs();
      case 'narrow':
        return this.localeData.monthsShort().map(month => month[0]);
    }
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return this.localeData.weekdays();
      case 'short':
        return this.weekdaysShortEs();
      case 'narrow':
        return this.weekdaysShortEs();
    }
  }

  monthsShortEs() {
    return ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  }
  weekdaysShortEs() {
    return ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  }
  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

export const APP_DATE_FORMATS =
{
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: 'input',
    // monthYearLabel: { month: 'short', year: 'numeric', day: 'numeric' },
    monthYearLabel: 'inputMonth',
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
}
