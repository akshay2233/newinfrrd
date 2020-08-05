import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'taskmanagment',
    pathMatch: 'full',
  },

  {
    path: 'taskmanagment',
    loadChildren: () => import('../../src/app/Pages/transport/transport.module').then((m) => m.TransportModule),
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' } 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
