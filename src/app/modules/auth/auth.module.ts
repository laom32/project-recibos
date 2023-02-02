import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Route, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

const auth: Route[] = [
  {
    path: '',
    component: SignInComponent
  }
];

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    RouterModule.forChild(auth),
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    
  ]
})
export class AuthModule { }
