import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingreso',
    pathMatch: 'full',
  },
  {
    path: 'ingreso',
    loadChildren: () =>
      import('./pages/ingreso/ingreso.module').then((m) => m.IngresoPageModule),
  },
  {
    path: 'registrar',
    loadChildren: () =>
      import('./pages/registrar/registrar.module').then(
        (m) => m.RegistrarPageModule
      ),
  },
  {
    path: 'principal',
    loadChildren: () =>
      import('./pages/principal/principal.module').then(
        (m) => m.PrincipalPageModule
      ),
  },
  {
    path: 'editar',
    loadChildren: () =>
      import('./pages/editar/editar.module').then((m) => m.EditarPageModule),
  },
  {
    path: 'buscar',
    loadChildren: () =>
      import('./pages/buscar/buscar.module').then((m) => m.BuscarPageModule),
  },
  {
    path: 'configuracion',
    loadChildren: () =>
      import('./pages/configuracion/configuracion.module').then(
        (m) => m.ConfiguracionPageModule
      ),
  },
  {
    path: 'clases',
    loadChildren: () =>
      import('./pages/clases/clases.module').then((m) => m.ClasesPageModule),
  },
  {
    path: 'clases-detalle/:claseId',
    loadChildren: () =>
      import('./pages/clases-detalle/clases-detalle.module').then(
        (m) => m.ClasesDetallePageModule
      ),
  },
  {
    path: 'reservation-requests',
    loadChildren: () =>
      import('./pages/reservation-requests/reservation-requests.module').then(
        (m) => m.ReservationRequestsPageModule
      ),
  },
  {
    path: 'e404',
    loadChildren: () =>
      import('./pages/e404/e404.module').then((m) => m.E404PageModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/e404/e404.module').then((m) => m.E404PageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
