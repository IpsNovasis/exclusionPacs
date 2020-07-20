import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { ExclusionComponent } from './exclusion/exclusion.component';
import { InclusionComponent } from './inclusion/inclusion.component';


const routes: Routes = [ 
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
{ path: 'inicio', component: InicioComponent },
{ path: 'exclusion', component: ExclusionComponent },
{ path: 'inclusion', component: InclusionComponent },
{ path: 'exclusion/:elegibilidad', component: ExclusionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
