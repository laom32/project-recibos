import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { NoAuthGuard } from './services/auth/noAuth.guard';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  {
    path: '',
    // data: {
    //   layout: 'empty'
    // },
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children: [
      { path: 'sign-in', loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule) },
    ]
  },
  {
    path: '',
    // data: {
    //   layout: 'empty'
    // },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'recibos', loadChildren: () => import('src/app/modules/content/content.module').then(m => m.ContentModule) },
    ]
  },
  // { path: '**', redirectTo: 'recibos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
