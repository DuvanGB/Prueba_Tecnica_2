import { Routes } from '@angular/router';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { ResumenComponent } from './components/resumen/resumen.component';

export const routes: Routes = [
  { path: '', redirectTo: '/consulta', pathMatch: 'full' },
  { path: 'consulta', component: ConsultaComponent },
  { path: 'resumen', component: ResumenComponent }
];