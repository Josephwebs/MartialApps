import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesDetallePage } from './clases-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesDetallePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesDetallePageRoutingModule {}
