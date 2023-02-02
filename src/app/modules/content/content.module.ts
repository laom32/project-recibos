import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecibosComponent } from './recibos/recibo/recibos.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ListComponent } from './recibos/list/list.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/date.adapter';
import {MatPaginatorModule} from '@angular/material/paginator';

const content: Route[] = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'recibo',
    component: RecibosComponent
  },
  {
    path: 'recibo/:id',
    component: RecibosComponent
  },
];

@NgModule({
  declarations: [
    RecibosComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(content),
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    },
    // CurrencyPipe, DecimalPipe

  ]
})
export class ContentModule { }
